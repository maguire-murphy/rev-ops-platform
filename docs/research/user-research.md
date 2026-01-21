# User Research

## Research Approach

Informal conversations with SaaS founders and operators to understand current workflows and pain points around revenue tracking.

## Key Findings

### Current State

**How founders track revenue today:**
- 80% use spreadsheets as the primary system of record
- Most export data manually from Stripe dashboard
- CRM data (HubSpot) rarely connected to billing metrics
- Board prep typically takes 3-5 hours of manual work

**Common tools in use:**
- Stripe Dashboard (billing)
- HubSpot (CRM, pipeline)
- Google Sheets (reconciliation, reporting)
- Sometimes: ChartMogul or Baremetrics (if they've outgrown spreadsheets)

### Pain Points

**1. Data reconciliation**
> "My MRR in Stripe doesn't match what I calculate in my spreadsheet, and I never know which is right."

Stripe's built-in MRR doesn't handle all edge cases (trials, annual subscriptions, upgrades mid-cycle). Founders often maintain separate calculations.

**2. No unified customer view**
> "I can see a customer's subscription in Stripe, but to understand if they're engaged, I have to check HubSpot separately."

Billing data and customer engagement live in different systems. Understanding customer health requires manual correlation.

**3. Pipeline disconnected from revenue**
> "When a deal closes in HubSpot, it doesn't automatically appear in my revenue tracking."

Sales pipeline (HubSpot) and actual revenue (Stripe) are separate worlds. Forecasting requires manually connecting expected deals to subscription creation.

**4. Time-consuming board prep**
> "Every month I spend half a day pulling data together for the board deck."

Metrics that should be automated require manual export, calculation, and formatting.

**5. Churn surprises**
> "I don't know a customer is at risk until they've already canceled."

No early warning system connecting payment failures, support tickets, or usage decline to churn prediction.

### Workflows Observed

**Monthly reporting:**
1. Export subscription data from Stripe
2. Calculate MRR manually (handle annuals, trials, etc.)
3. Export deal data from HubSpot
4. Cross-reference which deals converted to subscriptions
5. Build charts in Google Sheets
6. Format for board presentation

**Customer health check:**
1. Look up customer in Stripe (payment status)
2. Look up company in HubSpot (recent activity)
3. Check email for any support conversations
4. Make subjective assessment of health

**Pipeline review:**
1. Open HubSpot pipeline view
2. Review deals by stage
3. Manually estimate conversion probability
4. Calculate weighted pipeline value in spreadsheet

### Desired Outcomes

What founders said they want:
- "One dashboard I can check daily"
- "Accurate MRR without manual calculation"
- "Early warning when a customer might churn"
- "See how my pipeline connects to expected revenue"
- "5-minute board prep instead of 5 hours"

### Implications for Design

Based on research:

1. **Dashboard-first** - Optimize for quick daily check-ins, not deep analysis
2. **Accurate MRR** - Handle edge cases properly (annuals, trials, prorations)
3. **Unified customer view** - Combine billing + CRM data on single screen
4. **Pipeline visibility** - Show deals alongside revenue metrics
5. **Simple setup** - OAuth connection, not CSV imports or complex configuration

### Limitations of Research

This research was informal and based on a small sample. Findings should be treated as directional rather than statistically significant. A production product would require more rigorous validation.
