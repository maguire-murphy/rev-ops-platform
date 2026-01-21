# Revenue Operations Analytics Platform

An integrated metrics dashboard connecting Stripe and HubSpot data for early-stage SaaS companies.

[**Try Demo**](https://rev-ops-platform.vercel.app) | [Documentation](#documentation)

---

## Overview

Early-stage SaaS founders typically manage revenue data across multiple systems—Stripe for payments, HubSpot for customer relationships, and spreadsheets for analysis. This fragmentation creates blind spots in understanding MRR, churn patterns, and customer lifetime value.

This platform integrates directly with Stripe and HubSpot APIs to provide unified visibility into key business metrics through a single dashboard.

## Background

After analyzing the RevOps tooling landscape (ChartMogul, Baremetrics, ProfitWell), I identified a gap for companies in the pre-seed to Series A stage. Existing solutions often provide enterprise-level complexity and pricing that doesn't match the needs of early-stage teams.

This project explores what a focused, integrated analytics platform could look like for that segment.

## Key Features

- **Revenue Tracking** - Real-time MRR, ARR, and revenue forecasting from Stripe data
- **Customer Metrics** - Lifecycle tracking, cohort analysis, and LTV calculations
- **Churn Analysis** - Cancellation patterns and retention metrics
- **Pipeline Visibility** - Sales pipeline health from HubSpot CRM data
- **Unified Dashboard** - Single-pane view of business health

## Project Components

This repository includes:

### Research & Analysis
- Competitive landscape analysis
- User problem validation
- Market positioning assessment

### Product Design
- Feature specifications for 6 core modules (1,000+ individual specs)
- Information architecture
- Integration strategy and API design decisions

### Implementation
- Working prototype with Stripe and HubSpot integrations
- Next.js 16 frontend with React 19 and TailwindCSS
- tRPC API layer with Prisma ORM
- PostgreSQL database
- Demo environment with sample data

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| API | tRPC, Zod validation |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth.js (OAuth + Credentials) |
| Integrations | Stripe API, HubSpot API |
| Visualization | Recharts |

## Documentation

- **[Project Overview](docs/project-overview.md)** - Problem space and approach
- **[Competitive Analysis](docs/research/competitive-analysis.md)** - Market landscape
- **[User Research](docs/research/user-research.md)** - Problem validation
- **[Technical Decisions](docs/technical-decisions.md)** - Architecture and integration choices

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation
```bash
# Clone the repository
git clone https://github.com/maguire-murphy/rev-ops-platform.git
cd rev-ops-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Setup database
npx prisma generate
npx prisma db push

# Seed demo data
npm run db:seed

# Run in development mode
npm run dev
```

### Demo Access

After running `npm run db:seed`, log in with:
- **Email:** `demo@revops.app`
- **Password:** `demo1234`

The demo includes 19 customers, 12 months of MRR history, pipeline deals, and realistic metrics.

## Key Decisions

### Why Stripe + HubSpot?
Market research showed 70%+ of early-stage B2B SaaS companies use this combination. Focusing on these two systems allowed for depth and data richness over breadth.

### Why dashboard-first?
Founders need at-a-glance health checks more than extensive custom reporting. The UI prioritizes quick insights over configurability.

### Why read-only integrations?
Reduced scope and complexity by displaying data rather than attempting to write back to source systems. This maintains system reliability and simplifies the integration model.

See [Technical Decisions](docs/technical-decisions.md) for complete rationale.

## Development Approach

This project was built using AI development tools (Claude, Cursor) to focus effort on product decisions, feature design, and UX rather than boilerplate implementation. This approach allowed for rapid prototyping and iteration on the product vision.

## License

MIT License - see [LICENSE](LICENSE) file for details.

This project is open source. If you use code or concepts from this work, please provide attribution.

## Attribution

Created by Maguire as a product management portfolio project exploring RevOps analytics challenges in the SaaS ecosystem.

## Contact

For questions about this project or collaboration opportunities:

- **Email:** [maguire.murphy@live.com](mailto:maguire.murphy@live.com)
- **LinkedIn:** [linkedin.com/in/maguire-murphy](https://linkedin.com/in/maguire-murphy)
- **GitHub:** [github.com/maguire-murphy](https://github.com/maguire-murphy)

---

**Note:** This is a portfolio demonstration project. While functional, it is not currently offered as a commercial product or service.