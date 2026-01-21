# Project Overview

## Problem Space

Early-stage SaaS companies typically use Stripe for payments and HubSpot for CRM, but lack integrated visibility into how these systems connect. Revenue data lives in Stripe, customer context in HubSpot, and founders piece together insights manually—often spending hours each week on spreadsheet reconciliation.

Common pain points observed:
- MRR calculations that don't match between tools
- No unified view of customer health (billing + engagement)
- Manual effort to prepare board-ready metrics
- Difficulty identifying churn signals early
- Pipeline data disconnected from revenue outcomes

## Approach

Rather than build another complex enterprise tool, this platform focuses on the 80/20: connecting the two most common systems (Stripe + HubSpot) and surfacing the metrics that matter most to early-stage founders.

The target user is a SaaS founder or operator at a company with $500K-$10M ARR who needs accurate revenue metrics without dedicated RevOps headcount.

## Research Process

**Competitive analysis:**
- Evaluated existing solutions (ChartMogul, Baremetrics, ProfitWell, Clari)
- Mapped feature sets and pricing models
- Identified gaps for pre-seed/seed stage companies

**Problem validation:**
- Informal conversations with SaaS founders
- Documented common workflows and pain points
- Identified most frequent metrics requests

**Prioritization:**
- Used impact/effort analysis to scope MVP
- Focused on metrics founders check most frequently
- Deferred features that require complex infrastructure

## Design Decisions

### Stripe-first approach
Most early SaaS companies use Stripe. Rather than abstract across multiple payment processors, the platform goes deep on Stripe integration to provide accurate, real-time data.

**Trade-off:** Limited to Stripe users. **Rationale:** 70%+ of target market uses Stripe; depth over breadth.

### Dashboard-centric UX
Founders need at-a-glance health checks, not extensive report building. The interface prioritizes quick answers over configurability.

**Trade-off:** Less flexible than custom reporting. **Rationale:** Target users don't have time to build reports.

### Read-only integrations
The platform reads from Stripe and HubSpot but doesn't write back. This reduces complexity and security concerns.

**Trade-off:** Can't automate actions. **Rationale:** Analytics use case doesn't require write access.

### Pre-computed snapshots
Daily MRR snapshots are computed and stored rather than calculated on-demand. This enables fast historical queries.

**Trade-off:** Data is stale until next snapshot. **Rationale:** Daily granularity is sufficient for revenue metrics.

## Implementation Approach

Built using AI coding assistants (Claude, Cursor) to focus effort on product decisions rather than implementation details. This allowed rapid iteration on feature design and UX while maintaining code quality through generated tests and consistent patterns.

The AI-assisted approach proved effective for:
- Boilerplate reduction (auth, CRUD, styling)
- Consistent code patterns
- Rapid UI iteration
- Integration scaffolding

Human decisions remained critical for:
- Feature prioritization
- Data model design
- UX flow decisions
- Integration architecture

## Scope

**Included in prototype:**
- Core metrics dashboard
- Stripe revenue tracking with MRR calculations
- HubSpot customer and deal sync
- Basic forecasting (linear projections)
- Customer lifecycle tracking

**Considered but descoped:**
- Multi-payment processor support (Paddle, Chargebee)
- Advanced ML-based forecasting
- Mobile application
- White-label/multi-tenant hosting
- Automated alerting and notifications

**Descoping rationale:** Focused on demonstrating core value proposition. Additional features would add complexity without substantially improving the portfolio piece.

## Results

Working prototype demonstrating:
- OAuth integration flows with both Stripe and HubSpot
- Real-time webhook processing for subscription events
- MRR calculation engine with movement classification
- Unified customer data model
- Interactive dashboard with data visualization

Full feature audit available in [audit-report.md](./audit-report.md).
