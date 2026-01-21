# Technical Decisions

This document provides a comprehensive overview of the platform's technical architecture, design decisions, and implementation patterns.

## Table of Contents

- [System Overview](#system-overview)
- [Technology Choices](#technology-choices)
- [Database Design](#database-design)
- [API Architecture](#api-architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Integration Architecture](#integration-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Key Technical Decisions](#key-technical-decisions)
- [Scaling Considerations](#scaling-considerations)

---

## System Overview

This is a multi-tenant B2B SaaS application that aggregates revenue data from billing systems (Stripe) and CRM platforms (HubSpot) to provide unified revenue visibility.

```
┌─────────────────────────────────────────────────────────────────────┐
│                       SYSTEM ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Stripe    │  │   HubSpot   │  │  (Future)   │  Data Sources   │
│  │   Billing   │  │     CRM     │  │  Pipedrive  │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         │                │                │                         │
│         ▼                ▼                ▼                         │
│  ┌─────────────────────────────────────────────────┐               │
│  │            INTEGRATION LAYER                     │               │
│  │  • OAuth 2.0 token management                   │               │
│  │  • Webhook receivers (real-time)                │               │
│  │  • API sync jobs (batch/backfill)               │               │
│  │  • Encrypted credential storage                 │               │
│  └──────────────────────┬──────────────────────────┘               │
│                         │                                           │
│                         ▼                                           │
│  ┌─────────────────────────────────────────────────┐               │
│  │            POSTGRESQL DATABASE                   │               │
│  │  • Multi-tenant data isolation                  │               │
│  │  • Normalized star schema                       │               │
│  │  • Optimized indexes for analytics              │               │
│  │  • Daily snapshot tables                        │               │
│  └──────────────────────┬──────────────────────────┘               │
│                         │                                           │
│                         ▼                                           │
│  ┌─────────────────────────────────────────────────┐               │
│  │            tRPC API LAYER                        │               │
│  │  • Type-safe procedures                         │               │
│  │  • Zod schema validation                        │               │
│  │  • React Query integration                      │               │
│  │  • Automatic request batching                   │               │
│  └──────────────────────┬──────────────────────────┘               │
│                         │                                           │
│                         ▼                                           │
│  ┌─────────────────────────────────────────────────┐               │
│  │            NEXT.JS FRONTEND                      │               │
│  │  • Server Components (data fetching)            │               │
│  │  • Client Components (interactivity)            │               │
│  │  • Tailwind CSS styling                         │               │
│  │  • Recharts visualizations                      │               │
│  └─────────────────────────────────────────────────┘               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Choices

### Why Next.js 16 with App Router?

| Benefit | Implementation |
|---------|----------------|
| **Server Components** | Dashboard pages fetch data on server, reducing client JS bundle |
| **Streaming** | Loading UI displays immediately while data loads |
| **Layouts** | Shared dashboard layout with persistent sidebar |
| **API Routes** | Webhook handlers and OAuth callbacks in `/api/` |
| **Middleware** | Authentication checks before protected routes |

### Why tRPC?

Traditional REST APIs require manual type definitions, OpenAPI specs, and client generation. tRPC provides:

```typescript
// Server: Define procedure once
export const mrrRouter = router({
  getDashboardMetrics: protectedProcedure.query(async ({ ctx }) => {
    // TypeScript knows this returns MrrMetrics
    return await calculateMrrMetrics(ctx.organizationId);
  }),
});

// Client: Full type inference, no codegen
const { data } = api.mrr.getDashboardMetrics.useQuery();
// data is typed as MrrMetrics | undefined
```

Benefits:
- **Zero runtime overhead** - Types exist only at compile time
- **Automatic validation** - Zod schemas validate inputs
- **IDE autocomplete** - Full IntelliSense for all procedures
- **Refactoring safety** - Rename a field, see all usages

### Why Prisma?

```typescript
// Schema-first approach with automatic TypeScript generation
const customer = await db.customer.findUnique({
  where: { id: customerId },
  include: { subscriptions: true },
});
// customer.subscriptions is typed as Subscription[]
```

Benefits:
- Type-safe queries with zero SQL injection risk
- Automatic migrations from schema changes
- Visual schema documentation
- Raw SQL escape hatch when needed

### Why Tailwind CSS 4?

- **Utility-first** - Rapid UI iteration without context switching
- **Consistent design** - Constrained design tokens (spacing, colors)
- **Small bundles** - Only used classes shipped to production
- **New v4 features** - Container queries, improved color functions

---

## Database Design

### Multi-Tenant Architecture

Every table includes `organizationId` for tenant isolation:

```sql
-- All queries automatically scoped by organization
SELECT * FROM customers WHERE organization_id = $1;
SELECT * FROM subscriptions WHERE organization_id = $1;
```

This approach was chosen over:
- **Schema per tenant** - Complex migrations, connection overhead
- **Database per tenant** - Operational complexity, cost
- **Row-level security** - PostgreSQL-specific, harder to test

### Core Schema

```
┌────────────────────┐
│   Organization     │ ─────────────────────────────────┐
└────────────────────┘                                  │
        │ 1:N                                           │
        ▼                                               │
┌────────────────────┐      ┌────────────────────┐     │
│      User          │      │   Integration      │ ◄───┘
└────────────────────┘      └────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌────────────────────┐      ┌────────────────────┐     ┌────────────────────┐
│    Customer        │      │      Deal          │     │     Activity       │
└────────────────────┘      └────────────────────┘     └────────────────────┘
        │ 1:N                       │ 1:N
        ▼                           ▼
┌────────────────────┐      ┌────────────────────┐
│   Subscription     │      │  DealStageHistory  │
└────────────────────┘      └────────────────────┘
        │ 1:N
        ▼
┌────────────────────┐
│   MrrMovement      │
└────────────────────┘
```

### Key Tables

**Customer** - Unified view of customers across systems:
```prisma
model Customer {
  id               String @id @default(uuid())
  organizationId   String
  stripeCustomerId String? @unique  // From Stripe
  hubspotCompanyId String?          // From HubSpot
  name             String
  email            String
  // ...
}
```

**MrrMovement** - Event-sourced revenue changes:
```prisma
model MrrMovement {
  id             String @id
  customerId     String
  subscriptionId String
  movementType   String  // 'new', 'expansion', 'contraction', 'churn', 'reactivation'
  mrrAmount      Int     // Change amount (positive or negative)
  previousMrr    Int     // MRR before this movement
  newMrr         Int     // MRR after this movement
  effectiveDate  DateTime
}
```

**MrrSnapshot** - Materialized daily aggregates:
```prisma
model MrrSnapshot {
  id             String @id
  organizationId String
  snapshotDate   DateTime
  totalMrr       Int
  newMrr         Int
  expansionMrr   Int
  contractionMrr Int
  churnMrr       Int
  totalCustomers Int
  // Unique constraint: one snapshot per org per day
  @@unique([organizationId, snapshotDate])
}
```

### Why Snapshots?

Computing MRR from movements on every request is expensive:
```sql
-- Without snapshots: O(n) where n = all movements
SELECT SUM(mrr_amount) 
FROM mrr_movements 
WHERE effective_date <= $date AND organization_id = $org;

-- With snapshots: O(1)
SELECT total_mrr 
FROM mrr_snapshots 
WHERE snapshot_date = $date AND organization_id = $org;
```

A daily cron job (`/api/cron/daily-snapshot`) computes and stores snapshots.

---

## API Architecture

### tRPC Router Structure

```
src/server/api/
├── root.ts           # Combines all routers
├── trpc.ts           # tRPC initialization, context
└── routers/
    ├── mrr.ts        # MRR calculations, waterfall, history
    ├── customer.ts   # Customer CRUD, details
    ├── deals.ts      # Pipeline, deal stages
    ├── forecast.ts   # Revenue forecasting
    ├── integrations.ts # Connection status, sync triggers
    └── organization.ts # Org settings, team management
```

### Protected Procedures

All data-access procedures require authentication:

```typescript
// src/server/api/trpc.ts
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  
  // Fetch user's organization
  const user = await db.user.findUnique({
    where: { id: ctx.session.user.id },
    include: { organization: true },
  });
  
  return next({
    ctx: {
      ...ctx,
      user,
      organizationId: user.organizationId,
    },
  });
});
```

### API Routes for External Integrations

tRPC handles internal API calls. External integrations use Next.js API routes:

- `/api/webhooks/stripe` - Stripe webhook receiver
- `/api/integrations/stripe/callback` - OAuth callback
- `/api/integrations/hubspot/callback` - OAuth callback
- `/api/cron/daily-snapshot` - Scheduled job endpoint

---

## Authentication & Authorization

### NextAuth.js Configuration

```typescript
// src/server/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({ ... }),
    Credentials({ ... }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
  },
});
```

### Session Strategy: JWT

We use JWT sessions instead of database sessions because:
- **Stateless** - No database lookup per request
- **Edge-compatible** - Works in Vercel Edge Runtime
- **Scalable** - No session table to manage

Trade-off: Can't invalidate individual sessions (solved by short expiry + refresh).

### Route Protection

```typescript
// src/middleware.ts
export default auth((req) => {
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');
  
  if (isProtectedRoute && !req.auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});
```

---

## Integration Architecture

### OAuth 2.0 Flow

```
┌────────┐     ┌─────────┐     ┌─────────────┐     ┌────────────┐
│  User  │     │ Frontend│     │   Stripe/   │     │  Backend   │
│        │     │         │     │   HubSpot   │     │            │
└───┬────┘     └────┬────┘     └──────┬──────┘     └─────┬──────┘
    │               │                 │                  │
    │  Click        │                 │                  │
    │  "Connect"    │                 │                  │
    │──────────────>│                 │                  │
    │               │                 │                  │
    │               │  Redirect to    │                  │
    │               │  OAuth URL      │                  │
    │<──────────────│                 │                  │
    │               │                 │                  │
    │  Authorize app│                 │                  │
    │──────────────────────────────>  │                  │
    │               │                 │                  │
    │               │  Redirect with  │                  │
    │               │  auth code      │                  │
    │<──────────────────────────────  │                  │
    │               │                 │                  │
    │  Callback URL │                 │                  │
    │───────────────────────────────────────────────────>│
    │               │                 │                  │
    │               │                 │  Exchange code   │
    │               │                 │  for tokens      │
    │               │                 │<─────────────────│
    │               │                 │                  │
    │               │                 │  Access +        │
    │               │                 │  Refresh tokens  │
    │               │                 │─────────────────>│
    │               │                 │                  │
    │               │                 │                  │  Encrypt &
    │               │                 │                  │  store tokens
    │               │                 │                  │
    │  Redirect to  │                 │                  │
    │  dashboard    │                 │                  │
    │<───────────────────────────────────────────────────│
```

### Token Management

Tokens are encrypted at rest using AES-256-GCM:

```typescript
// src/server/utils/encryption.ts
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  // ... encryption logic
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}
```

### Webhook Processing

Stripe webhooks are verified and processed:

```typescript
// src/app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  switch (event.type) {
    case "customer.subscription.created":
      await handleSubscriptionCreated(event.data.object);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object);
      break;
    // ...
  }
}
```

---

## Frontend Architecture

### Component Structure

```
src/components/
├── dashboard/           # Dashboard-specific components
│   ├── metric-card.tsx     # KPI cards
│   ├── mrr-chart.tsx       # Revenue trend chart
│   └── mrr-movements-table.tsx
├── landing/             # Marketing site components
│   ├── hero-section.tsx
│   ├── pricing-section.tsx
│   └── ...
├── ui/                  # Shared primitives
│   ├── skeleton.tsx        # Loading states
│   ├── empty-state.tsx     # No data states
│   └── error-state.tsx     # Error boundaries
└── layout/              # Layout components
    ├── sidebar.tsx
    ├── header.tsx
    └── footer.tsx
```

### State Management

**Server State**: React Query (via tRPC) handles all server data:
```typescript
const { data, isLoading, error } = api.mrr.getDashboardMetrics.useQuery();
```

**Client State**: React's built-in `useState` for UI state:
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

No global state management (Redux, Zustand) needed because:
- Server state is the source of truth
- UI state is component-local
- URL state handles navigation

### Loading & Error States

Every data-fetching component handles three states:

```typescript
if (isLoading) {
  return <SkeletonCard />;
}

if (error) {
  return <ErrorState onRetry={refetch} />;
}

if (!data || data.length === 0) {
  return <EmptyState />;
}

return <ActualContent data={data} />;
```

---

## Key Technical Decisions

### 1. Monorepo vs Separate Frontend/Backend

**Decision**: Monorepo (single Next.js project)

**Rationale**:
- Shared types between frontend and backend
- Simpler deployment (single Vercel project)
- Faster development iteration
- tRPC requires shared types

**Trade-off**: Harder to scale backend independently (solved by serverless).

### 2. PostgreSQL vs Time-Series Database

**Decision**: PostgreSQL with snapshot tables

**Rationale**:
- Simpler ops (one database)
- Good enough for target scale (< $10M ARR = < 10K customers)
- Prisma doesn't support TimescaleDB well

**Trade-off**: Less efficient for heavy time-series queries (solved by materialized snapshots).

### 3. Webhook-First vs Polling-First

**Decision**: Webhooks as primary, polling as backup

**Rationale**:
- Real-time updates without delay
- Lower API usage (no constant polling)
- Polling handles missed webhooks

**Trade-off**: More complex error handling (webhooks can fail).

### 4. Multi-Tenant Column vs Schema Isolation

**Decision**: Shared tables with organization_id column

**Rationale**:
- Simpler migrations
- Lower operational overhead
- Sufficient isolation for B2B SaaS

**Trade-off**: Must remember to filter by org (solved by Prisma middleware).

---

## Scaling Considerations

### Current Limits

The architecture supports companies up to ~$10M ARR with:
- ~10,000 customers
- ~20,000 subscriptions
- ~100,000 MRR movements

### Future Scaling Options

1. **Read Replicas**: Route dashboard queries to read-only replicas
2. **Caching**: Add Redis for frequently-accessed data (dashboard metrics)
3. **Queue Jobs**: Move webhook processing to background jobs (BullMQ)
4. **Partitioning**: Partition MRR movements by date

### Performance Optimizations Implemented

- **Database indexes**: On frequently-filtered columns
- **Query optimization**: Aggregations in SQL, not JavaScript
- **Materialized views**: Daily snapshots for historical queries
- **Client caching**: React Query with 5-minute stale time
- **Code splitting**: Dynamic imports for large components

---

## Future Architecture Considerations

### Planned Improvements

1. **Event Sourcing**: Full event log for audit trail
2. **Real-Time Updates**: WebSocket subscriptions for live data
3. **Multi-Region**: Database replication for global users
4. **Background Jobs**: Dedicated queue for long-running tasks

### Not Implemented (and Why)

- **GraphQL**: tRPC provides similar benefits with less complexity
- **Microservices**: Unnecessary for current scale
- **NoSQL**: Relational model fits revenue data well
- **Edge Computing**: Not needed for dashboard latency
