# Competitive Analysis

## Market Overview

The RevOps software market was valued at $5.7B in 2023, growing at 15.4% CAGR. The SME segment is growing fastest at 17% CAGR, driven by increasing adoption of subscription business models.

## Existing Solutions

### ChartMogul
**Positioning:** Subscription analytics for SaaS  
**Pricing:** Free tier, then $100-$750+/mo based on MRR  
**Strengths:**
- Clean UI and good data visualization
- Supports multiple payment processors
- Solid MRR/churn calculations

**Gaps:**
- No CRM integration
- No pipeline visibility
- Limited customer context beyond billing

### Baremetrics
**Positioning:** Subscription analytics and dunning  
**Pricing:** $129-$499+/mo based on MRR  
**Strengths:**
- Good Stripe integration
- Dunning/recovery features
- Forecasting tools

**Gaps:**
- Stripe-only (no CRM data)
- No pipeline tracking
- Higher pricing for early stage

### ProfitWell (Paddle)
**Positioning:** Free subscription metrics  
**Pricing:** Free (monetizes through other products)  
**Strengths:**
- Completely free tier
- Good basic metrics
- Benchmarking data

**Gaps:**
- Limited feature set
- No CRM integration
- Part of Paddle ecosystem now

### Clari
**Positioning:** Revenue operations platform  
**Pricing:** $100K+/year enterprise  
**Strengths:**
- Full RevOps suite
- Advanced forecasting
- Enterprise integrations

**Gaps:**
- Priced for enterprise only
- Complex implementation
- Overkill for early stage

### Gong
**Positioning:** Revenue intelligence  
**Pricing:** $21K-$28K/year (10 users)  
**Strengths:**
- Call recording and analysis
- Deal intelligence
- Coaching tools

**Gaps:**
- Focused on sales calls, not metrics
- Expensive for small teams
- Not a metrics dashboard

## Feature Comparison Matrix

| Feature | ChartMogul | Baremetrics | ProfitWell | This Platform |
|---------|------------|-------------|------------|---------------|
| MRR Tracking | ✓ | ✓ | ✓ | ✓ |
| Churn Analysis | ✓ | ✓ | ✓ | ✓ |
| Cohort Analysis | ✓ | ✓ | Limited | ✓ |
| Stripe Integration | ✓ | ✓ | ✓ | ✓ |
| HubSpot Integration | ✗ | ✗ | ✗ | ✓ |
| Pipeline Tracking | ✗ | ✗ | ✗ | ✓ |
| Customer Context | Limited | Limited | Limited | ✓ |
| Forecasting | Basic | ✓ | ✗ | Basic |
| Free Tier | ✓ | ✗ | ✓ | ✓ |
| < $100/mo Option | ✓ | ✗ | ✓ | ✓ |

## Opportunity Gap

The gap exists at the intersection of:
1. **Integrated data** - Billing + CRM in one view
2. **Early-stage pricing** - Free or <$100/mo for small companies
3. **Simple UX** - Dashboard-first, not report-builder

Existing tools either:
- Focus only on billing metrics (no CRM context)
- Are priced for larger companies ($200+/mo minimum)
- Require complex setup and configuration

## Target Positioning

A platform that provides:
- Stripe + HubSpot in a single dashboard
- Free tier for companies under $120K ARR
- Simple, opinionated metrics (not a report builder)
- Quick setup (OAuth, not CSV imports)

This positions between the free-but-limited tools (ProfitWell) and the expensive-but-comprehensive platforms (Clari), specifically targeting the underserved $500K-$10M ARR segment.
