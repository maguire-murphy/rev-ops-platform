/**
 * RevOps Analytics Demo Data Seeding Script
 * 
 * Creates comprehensive demo data for portfolio demonstrations:
 * - Demo organization and user
 * - 12 months of MRR history (Jan 2025 - Jan 2026)
 * - Customers with proper lifecycle events
 * - Subscriptions linked to MRR movements
 * - Pipeline deals matching HubSpot stage IDs
 * - Historical pipeline snapshots for forecast accuracy
 * 
 * Usage: npm run db:seed
 */

import { db } from "../src/server/db/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Demo constants
const DEMO_ORG_ID = "11111111-1111-1111-1111-111111111111";
const DEMO_USER_EMAIL = "demo@revops.app";
const DEMO_USER_PASSWORD = "demo1234";

// Realistic company names for demo
const COMPANY_NAMES = [
  { name: "TechFlow Solutions", email: "billing@techflow.io" },
  { name: "CloudNine Software", email: "finance@cloudnine.dev" },
  { name: "DataPulse Analytics", email: "accounts@datapulse.co" },
  { name: "DevStream Labs", email: "billing@devstream.io" },
  { name: "QuantumLeap Tech", email: "ap@quantumleap.ai" },
  { name: "NexGen Platforms", email: "finance@nexgen.app" },
  { name: "Innovate Systems", email: "billing@innovatesys.com" },
  { name: "AgileWorks Pro", email: "accounts@agileworks.io" },
  { name: "ScaleUp Ventures", email: "finance@scaleup.vc" },
  { name: "ByteForce Digital", email: "billing@byteforce.dev" },
  { name: "PivotPoint Software", email: "ap@pivotpoint.io" },
  { name: "LaunchPad SaaS", email: "finance@launchpad.app" },
  { name: "MetricMind AI", email: "billing@metricmind.ai" },
  { name: "GrowthStack Inc", email: "accounts@growthstack.co" },
  { name: "Elevate Digital", email: "finance@elevate.digital" },
  { name: "StreamLine Corp", email: "billing@streamline.io" },
  { name: "Pinnacle Tech", email: "accounts@pinnacle.dev" },
  { name: "Horizon SaaS", email: "finance@horizon.app" },
  { name: "Velocity Labs", email: "billing@velocity.io" },
  { name: "Summit Platforms", email: "accounts@summit.co" },
];

// Plan configurations (amounts in cents)
const PLANS = [
  { name: "Starter", amount: 9900, interval: "month" },
  { name: "Growth", amount: 29900, interval: "month" },
  { name: "Scale", amount: 59900, interval: "month" },
  { name: "Enterprise", amount: 99900, interval: "month" },
];

// HubSpot-compatible pipeline stages (must match pipeline-board.tsx)
const DEAL_STAGES = {
  APPOINTMENT_SCHEDULED: "appointmentscheduled",
  QUALIFIED_TO_BUY: "qualifiedtobuy",
  PRESENTATION_SCHEDULED: "presentationscheduled",
  DECISION_MAKER_BOUGHT_IN: "decisionmakerboughtin",
  CONTRACT_SENT: "contractsent",
  CLOSED_WON: "closedwon",
  CLOSED_LOST: "closedlost",
};

// Helper to get date relative to Jan 2025 baseline
function getDateFromStart(monthsFromStart: number, dayOfMonth: number = 1): Date {
  // Start from January 1, 2025
  const baseDate = new Date(2025, 0, dayOfMonth);
  baseDate.setMonth(baseDate.getMonth() + monthsFromStart);
  return baseDate;
}

async function clearExistingData() {
  console.log("🧹 Clearing existing demo data...");
  
  // Delete in order to respect foreign keys
  await db.activity.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.dealStageHistory.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.deal.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.mrrMovement.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.mrrSnapshot.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.pipelineSnapshot.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.subscription.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.customer.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.integration.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.user.deleteMany({ where: { organizationId: DEMO_ORG_ID } });
  await db.organization.deleteMany({ where: { id: DEMO_ORG_ID } });
  
  console.log("✅ Cleared existing demo data");
}

async function createDemoOrganization() {
  console.log("🏢 Creating demo organization...");
  
  const org = await db.organization.create({
    data: {
      id: DEMO_ORG_ID,
      name: "Acme SaaS Inc",
      slug: "acme-demo",
      stripeConnected: true,
      hubspotConnected: true,
    },
  });
  
  console.log(`✅ Created organization: ${org.name}`);
  return org;
}

async function createDemoUser() {
  console.log("👤 Creating demo user...");
  
  const hashedPassword = await bcrypt.hash(DEMO_USER_PASSWORD, 10);
  
  const user = await db.user.create({
    data: {
      organizationId: DEMO_ORG_ID,
      email: DEMO_USER_EMAIL,
      name: "Demo User",
      password: hashedPassword,
      role: "owner",
      emailVerified: new Date(),
    },
  });
  
  console.log(`✅ Created demo user: ${user.email} (password: ${DEMO_USER_PASSWORD})`);
  return user;
}

async function createDemoIntegrations() {
  console.log("🔗 Creating demo integrations...");
  
  await db.integration.createMany({
    data: [
      {
        organizationId: DEMO_ORG_ID,
        provider: "stripe",
        stripeAccountId: "acct_demo_stripe",
        status: "active",
        lastSyncAt: new Date(),
        metadata: { demo: true, locked: true },
      },
      {
        organizationId: DEMO_ORG_ID,
        provider: "hubspot",
        status: "active",
        lastSyncAt: new Date(),
        metadata: { demo: true, locked: true },
      },
    ],
  });
  
  console.log("✅ Created demo integrations (locked for demo mode)");
}

interface CustomerData {
  id: string;
  stripeCustomerId: string;
  startMonth: number; // Months from Jan 2025
  plan: typeof PLANS[number];
  churnMonth?: number; // If churned, when
  expansionMonth?: number; // If expanded, when
  contractionMonth?: number; // If contracted, when
  expansionPlan?: typeof PLANS[number];
  contractionPlan?: typeof PLANS[number];
}

async function createCustomersAndSubscriptions() {
  console.log("👥 Creating customers and subscriptions with realistic lifecycles...");
  
  // Define customer journeys across 12 months (Jan 2025 - Jan 2026)
  const customerJourneys: Omit<CustomerData, 'id' | 'stripeCustomerId'>[] = [
    // Active customers - started early, still active
    { startMonth: 0, plan: PLANS[1] }, // TechFlow - Growth since Jan
    { startMonth: 1, plan: PLANS[2] }, // CloudNine - Scale since Feb
    { startMonth: 0, plan: PLANS[0] }, // DataPulse - Starter since Jan
    { startMonth: 2, plan: PLANS[1], expansionMonth: 6, expansionPlan: PLANS[2] }, // DevStream - Growth->Scale
    { startMonth: 3, plan: PLANS[3] }, // QuantumLeap - Enterprise since Apr
    { startMonth: 1, plan: PLANS[1] }, // NexGen - Growth since Feb
    { startMonth: 4, plan: PLANS[0] }, // Innovate - Starter since May
    { startMonth: 2, plan: PLANS[2] }, // AgileWorks - Scale since Mar
    
    // Customers who churned
    { startMonth: 0, plan: PLANS[0], churnMonth: 5 }, // ScaleUp - Churned Jun
    { startMonth: 1, plan: PLANS[1], churnMonth: 7 }, // ByteForce - Churned Aug
    { startMonth: 3, plan: PLANS[0], churnMonth: 9 }, // PivotPoint - Churned Oct
    
    // Customers who contracted
    { startMonth: 0, plan: PLANS[2], contractionMonth: 4, contractionPlan: PLANS[1] }, // LaunchPad - Scale->Growth
    
    // Recent customers
    { startMonth: 6, plan: PLANS[1] }, // MetricMind - July
    { startMonth: 7, plan: PLANS[0] }, // GrowthStack - Aug
    { startMonth: 9, plan: PLANS[2] }, // Elevate - Oct
    { startMonth: 10, plan: PLANS[1] }, // StreamLine - Nov
    { startMonth: 11, plan: PLANS[0] }, // Pinnacle - Dec
    
    // At-risk / Past due customers
    { startMonth: 5, plan: PLANS[2] }, // Horizon - past due (we'll set status)
    { startMonth: 4, plan: PLANS[1] }, // Velocity - past due
  ];
  
  let customerCount = 0;
  
  for (let i = 0; i < customerJourneys.length; i++) {
    const journey = customerJourneys[i];
    const company = COMPANY_NAMES[i];
    const customerId = `cust_demo_${i.toString().padStart(4, "0")}`;
    
    // Create customer
    const customer = await db.customer.create({
      data: {
        organizationId: DEMO_ORG_ID,
        stripeCustomerId: `cus_${customerId}`,
        name: company.name,
        email: company.email,
        companyName: company.name,
      },
    });
    
    // Determine subscription status
    let status: "active" | "canceled" | "past_due" = "active";
    if (journey.churnMonth !== undefined) {
      status = "canceled";
    } else if (i >= customerJourneys.length - 2) {
      // Last 2 customers are past due
      status = "past_due";
    }
    
    // Get current plan (after any expansion/contraction)
    let currentPlan = journey.plan;
    if (journey.expansionPlan && journey.expansionMonth !== undefined) {
      currentPlan = journey.expansionPlan;
    }
    if (journey.contractionPlan && journey.contractionMonth !== undefined) {
      currentPlan = journey.contractionPlan;
    }
    
    const startDate = getDateFromStart(journey.startMonth);
    
    // Create subscription
    const subscription = await db.subscription.create({
      data: {
        organizationId: DEMO_ORG_ID,
        customerId: customer.id,
        stripeSubscriptionId: `sub_${customerId}`,
        status,
        planName: currentPlan.name,
        billingInterval: currentPlan.interval,
        amount: currentPlan.amount,
        currentPeriodStart: status === "canceled" ? undefined : new Date(),
        currentPeriodEnd: status === "canceled" ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        startedAt: startDate,
        canceledAt: journey.churnMonth !== undefined ? getDateFromStart(journey.churnMonth) : undefined,
      },
    });
    
    // Create MRR movements for this customer's lifecycle
    
    // 1. Initial "new" movement
    await db.mrrMovement.create({
      data: {
        organizationId: DEMO_ORG_ID,
        customerId: customer.id,
        subscriptionId: subscription.id,
        movementType: "new",
        mrrAmount: journey.plan.amount,
        previousMrr: 0,
        newMrr: journey.plan.amount,
        effectiveDate: startDate,
      },
    });
    
    // 2. Expansion movement
    if (journey.expansionMonth !== undefined && journey.expansionPlan) {
      const expansionDate = getDateFromStart(journey.expansionMonth);
      const expansionAmount = journey.expansionPlan.amount - journey.plan.amount;
      await db.mrrMovement.create({
        data: {
          organizationId: DEMO_ORG_ID,
          customerId: customer.id,
          subscriptionId: subscription.id,
          movementType: "expansion",
          mrrAmount: expansionAmount,
          previousMrr: journey.plan.amount,
          newMrr: journey.expansionPlan.amount,
          effectiveDate: expansionDate,
        },
      });
    }
    
    // 3. Contraction movement
    if (journey.contractionMonth !== undefined && journey.contractionPlan) {
      const contractionDate = getDateFromStart(journey.contractionMonth);
      const contractionAmount = journey.plan.amount - journey.contractionPlan.amount;
      await db.mrrMovement.create({
        data: {
          organizationId: DEMO_ORG_ID,
          customerId: customer.id,
          subscriptionId: subscription.id,
          movementType: "contraction",
          mrrAmount: -contractionAmount,
          previousMrr: journey.plan.amount,
          newMrr: journey.contractionPlan.amount,
          effectiveDate: contractionDate,
        },
      });
    }
    
    // 4. Churn movement
    if (journey.churnMonth !== undefined) {
      const churnDate = getDateFromStart(journey.churnMonth);
      const priorMrr = journey.expansionPlan?.amount || journey.contractionPlan?.amount || journey.plan.amount;
      await db.mrrMovement.create({
        data: {
          organizationId: DEMO_ORG_ID,
          customerId: customer.id,
          subscriptionId: subscription.id,
          movementType: "churn",
          mrrAmount: -priorMrr,
          previousMrr: priorMrr,
          newMrr: 0,
          effectiveDate: churnDate,
        },
      });
    }
    
    customerCount++;
  }
  
  console.log(`✅ Created ${customerCount} customers with subscriptions and MRR movements`);
}

async function createMrrSnapshots() {
  console.log("📊 Creating 12 months of MRR snapshots (Jan 2025 - Jan 2026)...");
  
  // Calculate MRR for each month based on actual movements
  // For simplicity, we'll use realistic growing numbers
  const monthlyData = [
    // Jan 2025
    { month: 0, totalMrr: 9900 + 29900 + 59900, new: 99700, exp: 0, cont: 0, churn: 0, customers: 4, newCust: 4, churnedCust: 0 },
    // Feb 2025
    { month: 1, totalMrr: 99700 + 59900 + 29900, new: 89800, exp: 0, cont: 0, churn: 0, customers: 6, newCust: 2, churnedCust: 0 },
    // Mar 2025
    { month: 2, totalMrr: 279400, new: 59900, exp: 0, cont: 0, churn: 0, customers: 8, newCust: 2, churnedCust: 0 },
    // Apr 2025
    { month: 3, totalMrr: 339300 + 99900, new: 99900, exp: 0, cont: 0, churn: 0, customers: 9, newCust: 1, churnedCust: 0 },
    // May 2025 - contraction
    { month: 4, totalMrr: 439200 - 30000 + 9900 + 29900, new: 39800, exp: 0, cont: 30000, churn: 0, customers: 11, newCust: 2, churnedCust: 0 },
    // Jun 2025 - first churn
    { month: 5, totalMrr: 458900 + 59900, new: 59900, exp: 0, cont: 0, churn: 9900, customers: 12, newCust: 1, churnedCust: 1 },
    // Jul 2025 - expansion
    { month: 6, totalMrr: 508900 + 30000 + 29900, new: 29900, exp: 30000, cont: 0, churn: 0, customers: 13, newCust: 1, churnedCust: 0 },
    // Aug 2025 - churn
    { month: 7, totalMrr: 568800 + 9900, new: 9900, exp: 0, cont: 0, churn: 29900, customers: 13, newCust: 1, churnedCust: 1 },
    // Sep 2025
    { month: 8, totalMrr: 548800, new: 0, exp: 0, cont: 0, churn: 0, customers: 13, newCust: 0, churnedCust: 0 },
    // Oct 2025 - new + churn
    { month: 9, totalMrr: 548800 + 59900, new: 59900, exp: 0, cont: 0, churn: 9900, customers: 13, newCust: 1, churnedCust: 1 },
    // Nov 2025
    { month: 10, totalMrr: 598800 + 29900, new: 29900, exp: 0, cont: 0, churn: 0, customers: 14, newCust: 1, churnedCust: 0 },
    // Dec 2025
    { month: 11, totalMrr: 628700 + 9900, new: 9900, exp: 0, cont: 0, churn: 0, customers: 15, newCust: 1, churnedCust: 0 },
    // Jan 2026 (current)
    { month: 12, totalMrr: 638600, new: 0, exp: 0, cont: 0, churn: 0, customers: 15, newCust: 0, churnedCust: 0 },
  ];
  
  for (const data of monthlyData) {
    const snapshotDate = getDateFromStart(data.month);
    
    await db.mrrSnapshot.create({
      data: {
        organizationId: DEMO_ORG_ID,
        snapshotDate,
        totalMrr: data.totalMrr,
        newMrr: data.new,
        expansionMrr: data.exp,
        contractionMrr: data.cont,
        churnMrr: data.churn,
        reactivationMrr: 0,
        totalCustomers: data.customers,
        newCustomers: data.newCust,
        churnedCustomers: data.churnedCust,
      },
    });
  }
  
  console.log(`✅ Created ${monthlyData.length} monthly MRR snapshots`);
}

async function createDeals() {
  console.log("🎯 Creating pipeline deals with HubSpot-compatible stages...");
  
  const dealData = [
    // Open deals in various stages
    { name: "Enterprise Contract - Acme Corp", amount: 4500000, stage: DEAL_STAGES.CONTRACT_SENT, closeInDays: 15, probability: 90 },
    { name: "Platform Migration - TechStart", amount: 1800000, stage: DEAL_STAGES.DECISION_MAKER_BOUGHT_IN, closeInDays: 30, probability: 70 },
    { name: "Annual Upgrade - DataCo", amount: 3600000, stage: DEAL_STAGES.PRESENTATION_SCHEDULED, closeInDays: 45, probability: 50 },
    { name: "New Business - CloudFirst", amount: 2990000, stage: DEAL_STAGES.QUALIFIED_TO_BUY, closeInDays: 60, probability: 40 },
    { name: "Expansion - StartupXYZ", amount: 1200000, stage: DEAL_STAGES.APPOINTMENT_SCHEDULED, closeInDays: 75, probability: 20 },
    { name: "Pilot to Paid - InnovateTech", amount: 990000, stage: DEAL_STAGES.QUALIFIED_TO_BUY, closeInDays: 30, probability: 35 },
    { name: "Competitive Replacement - OldSchool Inc", amount: 5990000, stage: DEAL_STAGES.PRESENTATION_SCHEDULED, closeInDays: 50, probability: 45 },
    { name: "Referral Lead - GrowthCo", amount: 2990000, stage: DEAL_STAGES.APPOINTMENT_SCHEDULED, closeInDays: 90, probability: 15 },
    { name: "Inbound Demo - FastScale", amount: 990000, stage: DEAL_STAGES.QUALIFIED_TO_BUY, closeInDays: 40, probability: 30 },
    { name: "Partner Intro - AllianceTech", amount: 1500000, stage: DEAL_STAGES.DECISION_MAKER_BOUGHT_IN, closeInDays: 25, probability: 65 },
    
    // Historical closed won deals (for forecast accuracy)
    { name: "Q3 Win - BlueSky Corp", amount: 2990000, stage: DEAL_STAGES.CLOSED_WON, closedMonthsAgo: 4, probability: 100 },
    { name: "Q3 Win - RapidDev", amount: 1800000, stage: DEAL_STAGES.CLOSED_WON, closedMonthsAgo: 3, probability: 100 },
    { name: "Q4 Win - ScaleForce", amount: 5990000, stage: DEAL_STAGES.CLOSED_WON, closedMonthsAgo: 2, probability: 100 },
    { name: "Q4 Win - NextLevel", amount: 990000, stage: DEAL_STAGES.CLOSED_WON, closedMonthsAgo: 2, probability: 100 },
    { name: "Q4 Win - CloudPeak", amount: 2990000, stage: DEAL_STAGES.CLOSED_WON, closedMonthsAgo: 1, probability: 100 },
    
    // Historical closed lost deals
    { name: "Lost - BudgetCrunch", amount: 1200000, stage: DEAL_STAGES.CLOSED_LOST, closedMonthsAgo: 5, probability: 0 },
    { name: "Lost - WentCompetitor", amount: 3600000, stage: DEAL_STAGES.CLOSED_LOST, closedMonthsAgo: 3, probability: 0 },
  ];
  
  for (let i = 0; i < dealData.length; i++) {
    const deal = dealData[i];
    const isClosed = deal.stage === DEAL_STAGES.CLOSED_WON || deal.stage === DEAL_STAGES.CLOSED_LOST;
    const isWon = deal.stage === DEAL_STAGES.CLOSED_WON;
    
    let closeDate: Date;
    let createdDate: Date;
    
    if ('closedMonthsAgo' in deal && deal.closedMonthsAgo !== undefined) {
      // Historical deal
      closeDate = new Date();
      closeDate.setMonth(closeDate.getMonth() - deal.closedMonthsAgo);
      createdDate = new Date(closeDate);
      createdDate.setMonth(createdDate.getMonth() - 2); // Created 2 months before close
    } else {
      // Future close date
      closeDate = new Date();
      closeDate.setDate(closeDate.getDate() + (deal.closeInDays || 30));
      createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30)); // Created 0-30 days ago
    }
    
    await db.deal.create({
      data: {
        organizationId: DEMO_ORG_ID,
        hubspotDealId: `deal_demo_${i.toString().padStart(4, "0")}`,
        name: deal.name,
        amount: deal.amount,
        stage: deal.stage,
        pipeline: "default",
        probability: deal.probability,
        closeDate,
        createdDate,
        ownerName: "Demo Sales Rep",
        isClosed,
        isWon,
      },
    });
  }
  
  console.log(`✅ Created ${dealData.length} pipeline deals`);
}

async function createPipelineSnapshots() {
  console.log("📈 Creating 6 months of pipeline snapshots for forecast accuracy...");
  
  // Create monthly snapshots going back 6 months
  const snapshotsData = [
    { monthsAgo: 6, totalValue: 15000000, weightedValue: 4500000, dealCount: 8 },
    { monthsAgo: 5, totalValue: 18000000, weightedValue: 5400000, dealCount: 10 },
    { monthsAgo: 4, totalValue: 20000000, weightedValue: 6800000, dealCount: 12 },
    { monthsAgo: 3, totalValue: 22000000, weightedValue: 7700000, dealCount: 11 },
    { monthsAgo: 2, totalValue: 25000000, weightedValue: 9500000, dealCount: 13 },
    { monthsAgo: 1, totalValue: 24000000, weightedValue: 9200000, dealCount: 12 },
  ];
  
  for (const snap of snapshotsData) {
    const snapshotDate = new Date();
    snapshotDate.setMonth(snapshotDate.getMonth() - snap.monthsAgo);
    snapshotDate.setDate(1); // First of the month
    
    await db.pipelineSnapshot.create({
      data: {
        organizationId: DEMO_ORG_ID,
        snapshotDate,
        totalValue: snap.totalValue,
        weightedValue: snap.weightedValue,
        dealCount: snap.dealCount,
      },
    });
  }
  
  // Also create daily snapshots for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const totalValue = 24000000 + Math.floor(Math.random() * 3000000);
    const weightedValue = Math.floor(totalValue * 0.38);
    const dealCount = 10 + Math.floor(Math.random() * 4);
    
    await db.pipelineSnapshot.create({
      data: {
        organizationId: DEMO_ORG_ID,
        snapshotDate: date,
        totalValue,
        weightedValue,
        dealCount,
      },
    });
  }
  
  console.log(`✅ Created 6 months of pipeline snapshots + 30 daily snapshots`);
}

async function createActivities() {
  console.log("📝 Creating deal activities...");
  
  // Get all deals
  const deals = await db.deal.findMany({
    where: { organizationId: DEMO_ORG_ID },
  });
  
  const activityTypes = ["email", "call", "meeting", "note"];
  let activityCount = 0;
  
  for (const deal of deals) {
    // Create 2-5 activities per deal
    const numActivities = 2 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numActivities; i++) {
      const activityDate = new Date();
      activityDate.setDate(activityDate.getDate() - Math.floor(Math.random() * 30)); // Last 30 days
      
      await db.activity.create({
        data: {
          organizationId: DEMO_ORG_ID,
          dealId: deal.id,
          activityType: activityTypes[Math.floor(Math.random() * activityTypes.length)],
          subject: `Activity for ${deal.name}`,
          direction: Math.random() > 0.5 ? "outbound" : "inbound",
          activityDate,
          durationMinutes: Math.floor(Math.random() * 60) + 5,
        },
      });
      
      activityCount++;
    }
  }
  
  console.log(`✅ Created ${activityCount} deal activities`);
}

async function main() {
  console.log("🚀 Starting RevOps Analytics Demo Data Seeding...\n");
  
  try {
    await clearExistingData();
    await createDemoOrganization();
    await createDemoUser();
    await createDemoIntegrations();
    await createCustomersAndSubscriptions();
    await createMrrSnapshots();
    await createDeals();
    await createPipelineSnapshots();
    await createActivities();
    
    console.log("\n✨ Demo data seeding complete!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Demo Login Credentials:");
    console.log(`   Email: ${DEMO_USER_EMAIL}`);
    console.log(`   Password: ${DEMO_USER_PASSWORD}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n🌐 Start the app with: npm run dev");
    console.log("🔗 Then visit: http://localhost:3000/login\n");
    
  } catch (error) {
    console.error("❌ Error seeding demo data:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
