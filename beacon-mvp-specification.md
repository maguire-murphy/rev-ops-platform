# Beacon: MVP Specification & AI Coding Assistant Prompt

## Document Purpose

This document serves two purposes:
1. **Complete business and technical context** for building Beacon, an SMB RevOps platform
2. **A ready-to-use prompt** for AI coding assistants (Claude Code, Cursor, Gemini, etc.) to understand the full scope and begin implementation

---

# PART 1: BUSINESS CONTEXT & MARKET OPPORTUNITY

## What is Beacon?

Beacon is a **Revenue Operations (RevOps) platform designed specifically for B2B SaaS startups in the $500K-$10M ARR range**. It unifies billing data, CRM activity, and pipeline analytics into a single source of truth, enabling founders and sales leaders to understand their revenue engine without enterprise-grade complexity or pricing.

## The Problem We're Solving

### The Market Gap

Enterprise RevOps platforms are economically prohibitive for SMB SaaS companies:

| Platform | Minimum Annual Cost | Target Segment |
|----------|---------------------|----------------|
| Clari | ~$100,000+ | 200+ employees |
| Gong | $21,000-$28,000 (10 users) | 25+ sales reps |
| Aviso | ~$165/user/month | Enterprise |

Meanwhile, free tools like ProfitWell or ChartMogul's free tier provide basic subscription metrics but lack:
- Pipeline intelligence and deal scoring
- Revenue forecasting
- CRM integration for full-funnel visibility
- Actionable recommendations

### Who We're Building For

**Primary ICP:** B2B SaaS founders and sales leaders at companies with:
- $500K - $10M ARR
- 5-50 employees
- Using Stripe for billing
- Using HubSpot or Pipedrive for CRM
- No dedicated RevOps headcount
- Making decisions from spreadsheets or fragmented tools

**Buyer Personas:**
1. **Founder/CEO** - Needs board-ready metrics, runway visibility, growth tracking
2. **VP/Head of Sales** - Needs pipeline visibility, forecasting, rep performance
3. **Head of Operations/Finance** - Needs accurate MRR, churn analysis, cohort tracking

### Why Now?

1. **RevOps market growing 15.4% CAGR** to $15.9B by 2033
2. **SME segment growing fastest** at 17% CAGR
3. **48% of companies now have RevOps function** (up 15% YoY)
4. **75% of highest-growth companies** will deploy RevOps by 2025 (Gartner)
5. Enterprise tools can't economically serve below $10M ARR

## Business Model

### Pricing Strategy (ARR-Based)

| Tier | Monthly Price | Target ARR | Features |
|------|---------------|------------|----------|
| **Free** | $0 | Up to $120K ARR | Core metrics, 1 integration, 3 users |
| **Starter** | $99/month | $120K - $1M ARR | 3 integrations, custom reports, API |
| **Growth** | $299/month | $1M - $5M ARR | 5+ integrations, forecasting, unlimited users |
| **Scale** | $599/month | $5M - $10M ARR | Advanced forecasting, data exports, priority support |

### Go-to-Market Strategy

1. **Product-Led Growth (PLG)** - Free tier as primary acquisition channel
2. **Content Marketing** - SaaS metrics education, original research
3. **Community Presence** - RevOps Co-op, RevGenius, Modern Sales Pros
4. **Integration Marketplaces** - HubSpot App Marketplace, Stripe App Marketplace
5. **Post-Funding Targeting** - Reach companies within 1-2 weeks of funding announcements

### Success Metrics

| Metric | Target |
|--------|--------|
| Free-to-Paid Conversion | >10% |
| Month 1 Retention | >40% |
| Net Revenue Retention | >110% |
| Time to "Aha Moment" | <5 minutes |
| Monthly Churn | <5% |

---

# PART 2: TECHNICAL SPECIFICATION

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           BEACON ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   Stripe    │  │   HubSpot   │  │  Pipedrive  │   Data Sources   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                  │
│         │                │                │                          │
│         ▼                ▼                ▼                          │
│  ┌─────────────────────────────────────────────────┐                │
│  │              INGESTION LAYER                     │                │
│  │  • Webhooks (real-time events)                  │                │
│  │  • API Polling (backfill & sync)                │                │
│  │  • Rate limit handling                          │                │
│  │  • Event queue (Redis/BullMQ)                   │                │
│  └──────────────────────┬──────────────────────────┘                │
│                         │                                            │
│                         ▼                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │              DATA LAYER                          │                │
│  │  • PostgreSQL (transactional data)              │                │
│  │  • Normalized schema (star schema)              │                │
│  │  • TimescaleDB extension (time-series)          │                │
│  └──────────────────────┬──────────────────────────┘                │
│                         │                                            │
│                         ▼                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │              COMPUTATION LAYER                   │                │
│  │  • MRR/ARR calculations                         │                │
│  │  • Churn & retention metrics                    │                │
│  │  • Cohort analysis                              │                │
│  │  • Pipeline analytics                           │                │
│  │  • Forecasting engine                           │                │
│  └──────────────────────┬──────────────────────────┘                │
│                         │                                            │
│                         ▼                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │              API LAYER                           │                │
│  │  • Next.js API routes                           │                │
│  │  • tRPC for type-safe APIs                      │                │
│  │  • Authentication (NextAuth.js)                 │                │
│  │  • Multi-tenant data isolation                  │                │
│  └──────────────────────┬──────────────────────────┘                │
│                         │                                            │
│                         ▼                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │              FRONTEND                            │                │
│  │  • Next.js 14 (App Router)                      │                │
│  │  • React + TypeScript                           │                │
│  │  • Tailwind CSS                                 │                │
│  │  • Recharts for visualizations                  │                │
│  │  • Real-time updates (WebSockets)               │                │
│  └─────────────────────────────────────────────────┘                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Core Framework
- **Next.js 14** (App Router) - Full-stack React framework
- **TypeScript** - Type safety throughout
- **tRPC** - End-to-end type-safe APIs
- **Prisma** - Database ORM with type generation

### Database
- **PostgreSQL** - Primary database
- **TimescaleDB** - Time-series extension for metrics history
- **Redis** - Caching, job queues, real-time

### Authentication & Authorization
- **NextAuth.js v5** - Authentication
- **Row-level security** - Multi-tenant data isolation

### Integrations
- **Stripe API** - Billing data ingestion
- **HubSpot API** - CRM data ingestion
- **Pipedrive API** (Phase 2) - Alternative CRM

### Frontend
- **Tailwind CSS** - Styling
- **Recharts** - Charts and visualizations
- **Radix UI** - Accessible component primitives
- **React Query** - Server state management

### Infrastructure
- **Vercel** - Hosting and deployment
- **Neon** or **Supabase** - Managed PostgreSQL
- **Upstash** - Managed Redis
- **Inngest** or **BullMQ** - Background job processing

## Database Schema

### Core Tables

```sql
-- Organizations (tenants)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  stripe_connected BOOLEAN DEFAULT FALSE,
  hubspot_connected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'member', -- 'owner', 'admin', 'member'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Integration Credentials (encrypted)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  provider VARCHAR(50) NOT NULL, -- 'stripe', 'hubspot', 'pipedrive'
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  metadata JSONB,
  status VARCHAR(50) DEFAULT 'active',
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers (unified from billing + CRM)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  
  -- External IDs
  stripe_customer_id VARCHAR(255),
  hubspot_company_id VARCHAR(255),
  hubspot_contact_id VARCHAR(255),
  
  -- Core fields
  name VARCHAR(255),
  email VARCHAR(255),
  company_name VARCHAR(255),
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, stripe_customer_id),
  UNIQUE(organization_id, hubspot_company_id)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  customer_id UUID REFERENCES customers(id),
  
  -- Stripe fields
  stripe_subscription_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  
  -- Subscription details
  status VARCHAR(50), -- 'active', 'canceled', 'past_due', 'trialing'
  plan_name VARCHAR(255),
  billing_interval VARCHAR(20), -- 'month', 'year'
  billing_interval_count INTEGER DEFAULT 1,
  
  -- Amounts (in cents)
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'usd',
  
  -- Dates
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MRR Movements (fact table for MRR waterfall)
CREATE TABLE mrr_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  customer_id UUID REFERENCES customers(id),
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Movement details
  movement_type VARCHAR(50) NOT NULL, -- 'new', 'expansion', 'contraction', 'churn', 'reactivation'
  mrr_amount INTEGER NOT NULL, -- in cents
  previous_mrr INTEGER DEFAULT 0,
  new_mrr INTEGER NOT NULL,
  
  -- Date (for time-series queries)
  effective_date DATE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hypertable for time-series optimization (TimescaleDB)
SELECT create_hypertable('mrr_movements', 'effective_date');

-- Daily MRR Snapshots (materialized for fast queries)
CREATE TABLE mrr_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  
  snapshot_date DATE NOT NULL,
  
  -- MRR breakdown
  total_mrr INTEGER NOT NULL,
  new_mrr INTEGER DEFAULT 0,
  expansion_mrr INTEGER DEFAULT 0,
  contraction_mrr INTEGER DEFAULT 0,
  churn_mrr INTEGER DEFAULT 0,
  reactivation_mrr INTEGER DEFAULT 0,
  
  -- Customer counts
  total_customers INTEGER,
  new_customers INTEGER,
  churned_customers INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, snapshot_date)
);

-- Deals/Opportunities (from CRM)
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  customer_id UUID REFERENCES customers(id),
  
  -- External IDs
  hubspot_deal_id VARCHAR(255),
  
  -- Deal details
  name VARCHAR(255),
  amount INTEGER, -- in cents
  currency VARCHAR(3) DEFAULT 'usd',
  stage VARCHAR(100),
  pipeline VARCHAR(100),
  probability INTEGER, -- 0-100
  
  -- Dates
  close_date DATE,
  created_date DATE,
  
  -- Owner
  owner_id VARCHAR(255),
  owner_name VARCHAR(255),
  
  -- Status
  is_closed BOOLEAN DEFAULT FALSE,
  is_won BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deal Stage History (for velocity tracking)
CREATE TABLE deal_stage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  deal_id UUID REFERENCES deals(id),
  
  from_stage VARCHAR(100),
  to_stage VARCHAR(100),
  changed_at TIMESTAMPTZ NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities (emails, calls, meetings from CRM)
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  deal_id UUID REFERENCES deals(id),
  customer_id UUID REFERENCES customers(id),
  
  -- External IDs
  hubspot_engagement_id VARCHAR(255),
  
  -- Activity details
  activity_type VARCHAR(50), -- 'email', 'call', 'meeting', 'note', 'task'
  subject VARCHAR(500),
  direction VARCHAR(20), -- 'inbound', 'outbound'
  
  -- Timing
  activity_date TIMESTAMPTZ,
  duration_minutes INTEGER,
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_customers_org ON customers(organization_id);
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(organization_id, status);
CREATE INDEX idx_mrr_movements_org_date ON mrr_movements(organization_id, effective_date);
CREATE INDEX idx_deals_org ON deals(organization_id);
CREATE INDEX idx_deals_stage ON deals(organization_id, stage, is_closed);
CREATE INDEX idx_activities_deal ON activities(deal_id);
CREATE INDEX idx_activities_date ON activities(organization_id, activity_date);
```

## API Integration Specifications

### Stripe Integration

**Authentication:** API Key (Secret Key)

**Key Endpoints:**
- `GET /v1/customers` - List all customers
- `GET /v1/subscriptions` - List all subscriptions
- `GET /v1/invoices` - List invoices for MRR calculation
- `GET /v1/events` - Webhook events

**Webhook Events to Handle:**
```typescript
const STRIPE_EVENTS = [
  'customer.created',
  'customer.updated',
  'customer.deleted',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.finalized',
];
```

**Rate Limits:**
- 100 read requests/second (parallel)
- 100 write requests/second
- Use webhooks for real-time, API for backfill

**MRR Calculation Logic:**
```typescript
function calculateMRR(subscription: StripeSubscription): number {
  // Skip non-active subscriptions
  if (!['active', 'trialing'].includes(subscription.status)) {
    return 0;
  }
  
  // Get the amount from subscription items
  const amount = subscription.items.data.reduce((sum, item) => {
    const unitAmount = item.price.unit_amount || 0;
    const quantity = item.quantity || 1;
    return sum + (unitAmount * quantity);
  }, 0);
  
  // Normalize to monthly
  const interval = subscription.items.data[0]?.price.recurring?.interval;
  const intervalCount = subscription.items.data[0]?.price.recurring?.interval_count || 1;
  
  if (interval === 'year') {
    return Math.round(amount / (12 * intervalCount));
  } else if (interval === 'month') {
    return Math.round(amount / intervalCount);
  } else if (interval === 'week') {
    return Math.round((amount * 52) / (12 * intervalCount));
  } else if (interval === 'day') {
    return Math.round((amount * 365) / (12 * intervalCount));
  }
  
  return amount; // Default to monthly
}
```

### HubSpot Integration

**Authentication:** OAuth 2.0

**OAuth Flow:**
1. Redirect to HubSpot authorization URL
2. User authorizes access
3. Exchange code for access_token + refresh_token
4. Store tokens (encrypted) in database
5. Refresh token before expiry (tokens expire in 6 hours)

**Key Endpoints:**
- `GET /crm/v3/objects/contacts` - List contacts
- `GET /crm/v3/objects/companies` - List companies
- `GET /crm/v3/objects/deals` - List deals
- `GET /crm/v3/objects/deals/{dealId}/associations` - Deal associations
- `GET /engagements/v1/engagements/paged` - Activities (v1 API only)

**Rate Limits:**
- 110 requests per 10 seconds (per account)
- Search API: 4 requests per second
- Burst limit: 100 requests per 10 seconds

**Deal Pipeline Mapping:**
```typescript
interface HubSpotDeal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: string;
    pipeline: string;
    closedate: string;
    createdate: string;
    hubspot_owner_id: string;
    hs_is_closed_won: string;
    hs_is_closed: string;
  };
}

function mapHubSpotDeal(hubspotDeal: HubSpotDeal): Deal {
  return {
    hubspot_deal_id: hubspotDeal.id,
    name: hubspotDeal.properties.dealname,
    amount: Math.round(parseFloat(hubspotDeal.properties.amount || '0') * 100),
    stage: hubspotDeal.properties.dealstage,
    pipeline: hubspotDeal.properties.pipeline,
    close_date: hubspotDeal.properties.closedate,
    created_date: hubspotDeal.properties.createdate,
    is_closed: hubspotDeal.properties.hs_is_closed === 'true',
    is_won: hubspotDeal.properties.hs_is_closed_won === 'true',
  };
}
```

## MVP Feature Set

### Phase 1: Core Metrics (Weeks 1-4)

**1.1 Authentication & Onboarding**
- [ ] User signup/login (email + password, Google OAuth)
- [ ] Organization creation
- [ ] Team invitations
- [ ] Onboarding wizard

**1.2 Stripe Integration**
- [ ] OAuth connection flow
- [ ] Webhook endpoint setup
- [ ] Historical data backfill
- [ ] Real-time subscription sync
- [ ] MRR calculation engine

**1.3 Core Dashboard**
- [ ] MRR card with trend
- [ ] ARR card
- [ ] Active customers count
- [ ] MRR growth rate (MoM)
- [ ] Quick date range selector (7d, 30d, 90d, 12m)

**1.4 MRR Analytics**
- [ ] MRR over time chart
- [ ] MRR waterfall (new, expansion, contraction, churn, reactivation)
- [ ] MRR breakdown by plan
- [ ] Customer count over time

### Phase 2: Churn & Retention (Weeks 5-6)

**2.1 Churn Metrics**
- [ ] Gross MRR churn rate
- [ ] Net MRR churn rate
- [ ] Logo churn rate
- [ ] Churn trend over time

**2.2 Cohort Analysis**
- [ ] Revenue retention cohorts
- [ ] Customer retention cohorts
- [ ] Cohort visualization (heatmap)

**2.3 Customer Health**
- [ ] Customer list with MRR
- [ ] Customer detail page
- [ ] Subscription history timeline
- [ ] At-risk customer identification (basic rules)

### Phase 3: CRM Integration (Weeks 7-8)

**3.1 HubSpot Integration**
- [ ] OAuth connection flow
- [ ] Company/Contact sync
- [ ] Deal sync
- [ ] Activity sync
- [ ] Customer matching (Stripe ↔ HubSpot)

**3.2 Pipeline Dashboard**
- [ ] Pipeline value by stage
- [ ] Deal count by stage
- [ ] Pipeline velocity metrics
- [ ] Weighted pipeline value

**3.3 Deal Analytics**
- [ ] Win rate by stage
- [ ] Average deal size
- [ ] Sales cycle length
- [ ] Stage conversion rates

### Phase 4: Forecasting (Weeks 9-10)

**4.1 Revenue Forecasting**
- [ ] MRR forecast (next 3/6/12 months)
- [ ] Forecast methodology selector (conservative, moderate, aggressive)
- [ ] Scenario comparison

**4.2 Pipeline Forecasting**
- [ ] Weighted pipeline forecast
- [ ] Historical accuracy tracking
- [ ] Forecast vs. actual comparison

**4.3 Basic Deal Scoring**
- [ ] Rule-based deal scoring (activity levels, stage velocity)
- [ ] Deal health indicators
- [ ] Stalled deal alerts

### Phase 5: Polish & Launch (Weeks 11-12)

**5.1 Reporting**
- [ ] Executive summary dashboard
- [ ] Export to PDF/CSV
- [ ] Scheduled email reports

**5.2 Settings & Admin**
- [ ] Billing & subscription management
- [ ] Team management
- [ ] Integration settings
- [ ] Data export

**5.3 Performance & Polish**
- [ ] Performance optimization
- [ ] Error handling & logging
- [ ] Help documentation
- [ ] Onboarding improvements

## Key Calculations & Formulas

### MRR Calculations

```typescript
// Net New MRR
const netNewMRR = newMRR + expansionMRR + reactivationMRR - contractionMRR - churnMRR;

// MRR Growth Rate (Month over Month)
const mrrGrowthRate = ((currentMRR - previousMRR) / previousMRR) * 100;

// Quick Ratio (measures growth efficiency)
const quickRatio = (newMRR + expansionMRR + reactivationMRR) / (contractionMRR + churnMRR);
// Good: > 4, Healthy: 2-4, Concerning: < 2

// ARR
const arr = mrr * 12;
```

### Churn Calculations

```typescript
// Gross MRR Churn Rate
const grossMRRChurnRate = ((churnMRR + contractionMRR) / startingMRR) * 100;

// Net MRR Churn Rate (can be negative = net expansion)
const netMRRChurnRate = ((churnMRR + contractionMRR - expansionMRR - reactivationMRR) / startingMRR) * 100;

// Logo Churn Rate
const logoChurnRate = (churnedCustomers / startingCustomers) * 100;

// Revenue Retention Rate
const grossRevenueRetention = ((startingMRR - churnMRR - contractionMRR) / startingMRR) * 100;
const netRevenueRetention = ((startingMRR - churnMRR - contractionMRR + expansionMRR) / startingMRR) * 100;
// NRR > 100% = expansion exceeds churn (the goal)
```

### Customer Metrics

```typescript
// Average Revenue Per Account (ARPA)
const arpa = totalMRR / activeCustomers;

// Customer Lifetime Value (simplified)
const ltv = arpa / (monthlyChurnRate / 100);

// LTV:CAC Ratio (if CAC is known)
const ltvCacRatio = ltv / cac;
// Healthy: > 3:1
```

### Pipeline Metrics

```typescript
// Win Rate
const winRate = (wonDeals / closedDeals) * 100;

// Weighted Pipeline Value
const weightedPipeline = deals.reduce((sum, deal) => {
  return sum + (deal.amount * (deal.probability / 100));
}, 0);

// Average Sales Cycle (days)
const avgSalesCycle = wonDeals.reduce((sum, deal) => {
  const days = daysBetween(deal.created_date, deal.close_date);
  return sum + days;
}, 0) / wonDeals.length;

// Pipeline Velocity
const pipelineVelocity = (numberOfOpportunities * avgDealSize * winRate) / avgSalesCycle;

// Pipeline Coverage Ratio
const pipelineCoverage = weightedPipeline / targetRevenue;
// Healthy: 3x-4x coverage
```

### Forecasting (Simple Linear)

```typescript
// Simple MRR Forecast (assumes constant growth rate)
function forecastMRR(currentMRR: number, monthlyGrowthRate: number, months: number): number[] {
  const forecast = [currentMRR];
  for (let i = 1; i <= months; i++) {
    const previousMRR = forecast[i - 1];
    const projectedMRR = previousMRR * (1 + monthlyGrowthRate / 100);
    forecast.push(Math.round(projectedMRR));
  }
  return forecast;
}

// Forecast with churn consideration
function forecastMRRWithChurn(
  currentMRR: number,
  monthlyGrowthRate: number,
  monthlyChurnRate: number,
  months: number
): number[] {
  const forecast = [currentMRR];
  for (let i = 1; i <= months; i++) {
    const previousMRR = forecast[i - 1];
    const retained = previousMRR * (1 - monthlyChurnRate / 100);
    const growth = previousMRR * (monthlyGrowthRate / 100);
    forecast.push(Math.round(retained + growth));
  }
  return forecast;
}
```

## File Structure

```
beacon/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes (login, signup)
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Main app routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Main dashboard
│   │   │   ├── metrics/
│   │   │   │   ├── mrr/
│   │   │   │   ├── churn/
│   │   │   │   └── cohorts/
│   │   │   ├── customers/
│   │   │   │   ├── page.tsx          # Customer list
│   │   │   │   └── [id]/
│   │   │   ├── pipeline/
│   │   │   │   ├── page.tsx          # Pipeline dashboard
│   │   │   │   └── deals/
│   │   │   ├── forecast/
│   │   │   ├── settings/
│   │   │   │   ├── integrations/
│   │   │   │   ├── team/
│   │   │   │   └── billing/
│   │   │   └── layout.tsx            # Dashboard layout with sidebar
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   └── hubspot/
│   │   │   └── trpc/
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Landing page
│   │
│   ├── components/
│   │   ├── ui/                       # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── charts/                   # Chart components
│   │   │   ├── area-chart.tsx
│   │   │   ├── bar-chart.tsx
│   │   │   ├── line-chart.tsx
│   │   │   └── cohort-heatmap.tsx
│   │   ├── dashboard/                # Dashboard-specific components
│   │   │   ├── metric-card.tsx
│   │   │   ├── mrr-waterfall.tsx
│   │   │   ├── pipeline-funnel.tsx
│   │   │   └── date-range-picker.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── nav.tsx
│   │   └── integrations/             # Integration-specific components
│   │       ├── stripe-connect.tsx
│   │       └── hubspot-connect.tsx
│   │
│   ├── server/                       # Server-side code
│   │   ├── api/
│   │   │   ├── routers/              # tRPC routers
│   │   │   │   ├── metrics.ts
│   │   │   │   ├── customers.ts
│   │   │   │   ├── deals.ts
│   │   │   │   ├── integrations.ts
│   │   │   │   └── index.ts
│   │   │   └── trpc.ts               # tRPC setup
│   │   ├── db/
│   │   │   ├── schema.ts             # Prisma/Drizzle schema
│   │   │   └── client.ts             # Database client
│   │   ├── integrations/             # Integration logic
│   │   │   ├── stripe/
│   │   │   │   ├── client.ts
│   │   │   │   ├── sync.ts
│   │   │   │   ├── webhooks.ts
│   │   │   │   └── mrr.ts            # MRR calculation
│   │   │   └── hubspot/
│   │   │       ├── client.ts
│   │   │       ├── oauth.ts
│   │   │       ├── sync.ts
│   │   │       └── webhooks.ts
│   │   ├── services/                 # Business logic
│   │   │   ├── metrics/
│   │   │   │   ├── mrr.ts
│   │   │   │   ├── churn.ts
│   │   │   │   ├── cohorts.ts
│   │   │   │   └── forecasting.ts
│   │   │   ├── customers/
│   │   │   └── pipeline/
│   │   └── jobs/                     # Background jobs
│   │       ├── sync-stripe.ts
│   │       ├── sync-hubspot.ts
│   │       ├── calculate-mrr.ts
│   │       └── generate-snapshots.ts
│   │
│   ├── lib/                          # Shared utilities
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── validations.ts
│   │   └── hooks/
│   │
│   └── types/                        # TypeScript types
│       ├── metrics.ts
│       ├── integrations.ts
│       └── index.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# HubSpot
HUBSPOT_CLIENT_ID=""
HUBSPOT_CLIENT_SECRET=""
HUBSPOT_REDIRECT_URI="http://localhost:3000/api/integrations/hubspot/callback"

# Redis (for job queues)
REDIS_URL="redis://..."

# Encryption key for storing tokens
ENCRYPTION_KEY="32-byte-hex-string"
```

---

# PART 3: AI CODING ASSISTANT PROMPT

Use the following prompt when starting a new conversation with an AI coding assistant to build Beacon:

---

## PROMPT START

```
# Context: Building Beacon - SMB RevOps Platform

I'm building Beacon, a Revenue Operations (RevOps) platform for B2B SaaS startups in the $500K-$10M ARR range. This fills a major market gap - enterprise tools like Clari ($100K+/year) and Gong ($21K+/year) are too expensive for smaller companies, while free tools lack pipeline intelligence and forecasting.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- tRPC for type-safe APIs
- Prisma with PostgreSQL
- NextAuth.js v5 for authentication
- Tailwind CSS + Radix UI
- Recharts for visualizations
- Redis + BullMQ for background jobs

## Core Integrations
1. **Stripe** - Billing data for MRR/ARR calculations
2. **HubSpot** - CRM data for pipeline analytics

## What Beacon Does
1. **Subscription Metrics**: MRR, ARR, growth rates, calculated from Stripe data
2. **Churn Analytics**: Gross/net churn rates, retention cohorts
3. **Pipeline Intelligence**: Deal tracking, win rates, sales velocity from HubSpot
4. **Revenue Forecasting**: Projected MRR based on historical trends and pipeline

## Key Technical Challenges
1. **MRR Calculation Accuracy**: Must handle prorations, annual contracts (divide by 12), refunds (don't subtract from MRR), usage-based billing
2. **Multi-tenant Architecture**: Row-level security, data isolation by organization
3. **API Rate Limits**: Stripe (100/sec), HubSpot (110/10sec, Search: 4/sec)
4. **Real-time Updates**: Webhooks for live data, API polling for backfill
5. **Customer Matching**: Link Stripe customers to HubSpot companies/contacts

## MRR Waterfall Components
- **New MRR**: First-time subscription revenue
- **Expansion MRR**: Upgrades, additional seats
- **Contraction MRR**: Downgrades
- **Churn MRR**: Canceled subscriptions
- **Reactivation MRR**: Returning customers

The formula: `End MRR = Start MRR + New + Expansion + Reactivation - Contraction - Churn`

## Database Design Principles
- Star schema with fact tables (mrr_movements) and dimension tables (customers, subscriptions)
- TimescaleDB for time-series optimization
- Daily MRR snapshots for fast dashboard queries
- Deal stage history for velocity tracking

## Current Task
[DESCRIBE WHAT YOU WANT TO BUILD NEXT]

## Files to Reference
[PASTE RELEVANT CODE FILES OR SCHEMAS]

Please help me build this following best practices for:
- Type safety (strict TypeScript)
- Error handling (graceful degradation)
- Performance (efficient queries, caching)
- Security (input validation, encrypted tokens)
- Code organization (clear separation of concerns)
```

## PROMPT END

---

# PART 4: IMPLEMENTATION PRIORITIES

## Critical Path to MVP

```
Week 1-2: Foundation
├── Project setup (Next.js, database, auth)
├── Basic UI shell (layout, navigation)
├── Stripe OAuth connection
└── Stripe webhook handling

Week 3-4: Core Metrics
├── MRR calculation engine
├── Subscription sync from Stripe
├── Main dashboard with key metrics
└── MRR over time chart

Week 5-6: Churn & Retention
├── Churn rate calculations
├── Cohort analysis
├── Customer list & detail pages
└── At-risk customer identification

Week 7-8: CRM Integration
├── HubSpot OAuth connection
├── Deal sync
├── Customer matching (Stripe ↔ HubSpot)
└── Pipeline dashboard

Week 9-10: Forecasting
├── MRR forecasting (linear projection)
├── Pipeline forecasting (weighted)
├── Scenario comparison
└── Basic deal scoring

Week 11-12: Polish
├── Performance optimization
├── Error handling & logging
├── Documentation
└── Beta launch preparation
```

## What Makes Beacon Win

1. **5-Minute Time to Value**: Connect Stripe → See accurate MRR immediately
2. **SMB-Appropriate Pricing**: Free tier up to $120K ARR, $99-599/month paid tiers
3. **No Implementation Required**: Self-serve setup, no professional services needed
4. **Unified View**: Billing + CRM in one place (competitors do one or the other)
5. **Actionable Insights**: Not just dashboards - recommendations and alerts

## Success Criteria for MVP

- [ ] User can connect Stripe in <2 minutes
- [ ] MRR displayed accurately within 5 minutes of connection
- [ ] MRR waterfall shows correct breakdown
- [ ] Churn rate matches manual calculation
- [ ] HubSpot deals sync and display correctly
- [ ] Dashboard loads in <2 seconds
- [ ] Works correctly with 10,000+ subscriptions

---

# APPENDIX: REFERENCE MATERIALS

## Competitive Pricing Reference

| Tool | Free Tier | Paid Starting | Target |
|------|-----------|---------------|--------|
| ChartMogul | Up to $120K ARR | $99/month | SaaS metrics |
| Baremetrics | None | $108/month | SaaS metrics |
| ProfitWell | Unlimited | Add-ons only | SaaS metrics |
| HubSpot CRM | Unlimited | $45/user/month | CRM |
| Gong | None | ~$1,400/user/year | Revenue intelligence |

## Key Benchmarks

| Metric | Good | Great | Elite |
|--------|------|-------|-------|
| Net Revenue Retention | >100% | >110% | >130% |
| Gross MRR Churn | <3% | <2% | <1% |
| Logo Churn | <5% | <3% | <2% |
| Quick Ratio | >2 | >4 | >6 |
| LTV:CAC | >3:1 | >5:1 | >7:1 |

## Useful Resources

- [ChartMogul MRR Documentation](https://chartmogul.com/mrr/)
- [Stripe Billing Best Practices](https://stripe.com/docs/billing)
- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [SaaS Metrics 2.0 by David Skok](https://www.forentrepreneurs.com/saas-metrics-2/)

---

*This document was generated as a comprehensive specification for building Beacon. It should be updated as the product evolves and new decisions are made.*
