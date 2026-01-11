require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ Error: STRIPE_SECRET_KEY is not set in .env');
  process.exit(1);
}

async function seedTestData() {
  console.log('🚀 Starting Stripe Test Data Seed');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // ============================================
  // STEP 1: CREATE PRODUCTS
  // ============================================
  console.log('📦 Creating products...\n');

  const starterProduct = await stripe.products.create({
    name: 'Starter Plan',
    description: 'For small teams getting started',
    metadata: { tier: 'starter' },
  });
  console.log(`   ✅ Created: ${starterProduct.name} (${starterProduct.id})`);

  const growthProduct = await stripe.products.create({
    name: 'Growth Plan',
    description: 'For growing businesses',
    metadata: { tier: 'growth' },
  });
  console.log(`   ✅ Created: ${growthProduct.name} (${growthProduct.id})`);

  const scaleProduct = await stripe.products.create({
    name: 'Scale Plan',
    description: 'For scaling enterprises',
    metadata: { tier: 'scale' },
  });
  console.log(`   ✅ Created: ${scaleProduct.name} (${scaleProduct.id})`);

  // ============================================
  // STEP 2: CREATE PRICES
  // ============================================
  console.log('\n💰 Creating prices...\n');

  // Monthly prices
  const starterMonthly = await stripe.prices.create({
    product: starterProduct.id,
    unit_amount: 4900, // $49.00
    currency: 'usd',
    recurring: { interval: 'month' },
    nickname: 'Starter Monthly',
  });
  console.log(`   ✅ Starter Monthly: $49/mo (${starterMonthly.id})`);

  const growthMonthly = await stripe.prices.create({
    product: growthProduct.id,
    unit_amount: 9900, // $99.00
    currency: 'usd',
    recurring: { interval: 'month' },
    nickname: 'Growth Monthly',
  });
  console.log(`   ✅ Growth Monthly: $99/mo (${growthMonthly.id})`);

  const scaleMonthly = await stripe.prices.create({
    product: scaleProduct.id,
    unit_amount: 29900, // $299.00
    currency: 'usd',
    recurring: { interval: 'month' },
    nickname: 'Scale Monthly',
  });
  console.log(`   ✅ Scale Monthly: $299/mo (${scaleMonthly.id})`);

  // Annual prices (for testing MRR normalization)
  const starterAnnual = await stripe.prices.create({
    product: starterProduct.id,
    unit_amount: 47000, // $470.00/year (~$39/mo, 20% discount)
    currency: 'usd',
    recurring: { interval: 'year' },
    nickname: 'Starter Annual',
  });
  console.log(`   ✅ Starter Annual: $470/yr (${starterAnnual.id})`);

  const growthAnnual = await stripe.prices.create({
    product: growthProduct.id,
    unit_amount: 95000, // $950.00/year (~$79/mo, 20% discount)
    currency: 'usd',
    recurring: { interval: 'year' },
    nickname: 'Growth Annual',
  });
  console.log(`   ✅ Growth Annual: $950/yr (${growthAnnual.id})`);

  // ============================================
  // STEP 3: CREATE CUSTOMERS WITH SUBSCRIPTIONS
  // ============================================
  console.log('\n👥 Creating customers with subscriptions...\n');

  // Define test companies with realistic data
  const companies = [
    // Starter Monthly customers (8)
    { name: 'Acme Corp', email: 'billing@acme.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Beta Industries', email: 'finance@beta.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Gamma LLC', email: 'admin@gamma.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Delta Technologies', email: 'accounts@delta.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Epsilon Software', email: 'billing@epsilon.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Zeta Analytics', email: 'finance@zeta.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Eta Labs', email: 'admin@eta.test', plan: 'starter_monthly', quantity: 1 },
    { name: 'Theta Systems', email: 'billing@theta.test', plan: 'starter_monthly', quantity: 1 },

    // Growth Monthly customers (4) - with varying seat counts
    { name: 'Iota Ventures', email: 'finance@iota.test', plan: 'growth_monthly', quantity: 3 },
    { name: 'Kappa Digital', email: 'billing@kappa.test', plan: 'growth_monthly', quantity: 5 },
    { name: 'Lambda AI', email: 'accounts@lambda.test', plan: 'growth_monthly', quantity: 2 },
    { name: 'Mu Platforms', email: 'admin@mu.test', plan: 'growth_monthly', quantity: 4 },

    // Scale Monthly customers (2)
    { name: 'Nu Enterprise', email: 'finance@nu.test', plan: 'scale_monthly', quantity: 1 },
    { name: 'Xi Corporation', email: 'billing@xi.test', plan: 'scale_monthly', quantity: 1 },

    // Annual customers (2) - tests MRR normalization
    { name: 'Omicron Holdings', email: 'accounts@omicron.test', plan: 'starter_annual', quantity: 1 },
    { name: 'Pi Global', email: 'finance@pi.test', plan: 'growth_annual', quantity: 1 },
  ];

  // Map plan names to price IDs
  const priceMap = {
    starter_monthly: starterMonthly.id,
    growth_monthly: growthMonthly.id,
    scale_monthly: scaleMonthly.id,
    starter_annual: starterAnnual.id,
    growth_annual: growthAnnual.id,
  };

  // Track created subscriptions for summary
  const createdSubs = [];

  for (const company of companies) {
    try {
      // Create customer
      const customer = await stripe.customers.create({
        name: company.name,
        email: company.email,
        metadata: {
          test_data: 'true',
          created_by: 'beacon-seed-script',
        },
      });

      // Create and attach a test payment method
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token: 'tok_visa' }, // Stripe's test Visa token
      });

      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customer.id,
      });

      // Set as default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethod.id },
      });

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: priceMap[company.plan],
          quantity: company.quantity,
        }],
      });

      createdSubs.push({
        company: company.name,
        plan: company.plan,
        quantity: company.quantity,
        status: subscription.status,
      });

      console.log(`   ✅ ${company.name} → ${company.plan} (qty: ${company.quantity})`);

    } catch (error) {
      console.log(`   ❌ ${company.name} → Error: ${error.message}`);
    }
  }

  // ============================================
  // STEP 4: CREATE EDGE CASE SCENARIOS
  // ============================================
  console.log('\n🧪 Creating edge case scenarios...\n');

  // CHURNED CUSTOMER
  try {
    const churnedCustomer = await stripe.customers.create({
      name: 'Churned Corp',
      email: 'former@churned.test',
      metadata: { test_data: 'true', scenario: 'churned' },
    });

    const churnedPM = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' },
    });

    await stripe.paymentMethods.attach(churnedPM.id, { customer: churnedCustomer.id });
    await stripe.customers.update(churnedCustomer.id, {
      invoice_settings: { default_payment_method: churnedPM.id },
    });

    const churnedSub = await stripe.subscriptions.create({
      customer: churnedCustomer.id,
      items: [{ price: starterMonthly.id }],
    });

    // Cancel immediately to simulate churn
    await stripe.subscriptions.cancel(churnedSub.id);
    console.log('   ✅ Churned Corp → Created and canceled (tests churn handling)');
  } catch (error) {
    console.log(`   ❌ Churned Corp → Error: ${error.message}`);
  }

  // TRIALING CUSTOMER
  try {
    const trialCustomer = await stripe.customers.create({
      name: 'Trial Company',
      email: 'trial@trying.test',
      metadata: { test_data: 'true', scenario: 'trialing' },
    });

    const trialPM = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' },
    });

    await stripe.paymentMethods.attach(trialPM.id, { customer: trialCustomer.id });
    await stripe.customers.update(trialCustomer.id, {
      invoice_settings: { default_payment_method: trialPM.id },
    });

    await stripe.subscriptions.create({
      customer: trialCustomer.id,
      items: [{ price: growthMonthly.id }],
      trial_period_days: 14,
    });
    console.log('   ✅ Trial Company → 14-day trial on Growth (tests trial handling)');
  } catch (error) {
    console.log(`   ❌ Trial Company → Error: ${error.message}`);
  }

  // PAST DUE CUSTOMER (failed payment)
  try {
    const pastDueCustomer = await stripe.customers.create({
      name: 'Past Due Inc',
      email: 'overdue@pastdue.test',
      metadata: { test_data: 'true', scenario: 'past_due' },
    });

    // Use a card that will decline
    const declinePM = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_chargeDeclined' },
    });

    await stripe.paymentMethods.attach(declinePM.id, { customer: pastDueCustomer.id });
    await stripe.customers.update(pastDueCustomer.id, {
      invoice_settings: { default_payment_method: declinePM.id },
    });

    // This might fail due to the declined card, which is expected
    try {
      await stripe.subscriptions.create({
        customer: pastDueCustomer.id,
        items: [{ price: starterMonthly.id }],
        payment_behavior: 'allow_incomplete',
      });
      console.log('   ✅ Past Due Inc → Created with declined card (tests past_due handling)');
    } catch (e) {
      console.log('   ⚠️  Past Due Inc → Card declined as expected');
    }
  } catch (error) {
    console.log(`   ❌ Past Due Inc → Error: ${error.message}`);
  }

  // ============================================
  // STEP 5: SUMMARY
  // ============================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 TEST DATA SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Products Created: 3');
  console.log('  • Starter Plan');
  console.log('  • Growth Plan');
  console.log('  • Scale Plan\n');

  console.log('Prices Created: 5');
  console.log('  • Starter Monthly: $49/mo');
  console.log('  • Growth Monthly: $99/mo');
  console.log('  • Scale Monthly: $299/mo');
  console.log('  • Starter Annual: $470/yr (~$39.17/mo)');
  console.log('  • Growth Annual: $950/yr (~$79.17/mo)\n');

  console.log('Subscriptions Created:');
  console.log('  • 8 × Starter Monthly @ $49 = $392');
  console.log('  • 4 × Growth Monthly (14 seats total) @ $99/seat = $1,386');
  console.log('  • 2 × Scale Monthly @ $299 = $598');
  console.log('  • 1 × Starter Annual @ $470/yr = $39.17/mo');
  console.log('  • 1 × Growth Annual @ $950/yr = $79.17/mo\n');

  console.log('Edge Cases:');
  console.log('  • 1 × Churned (canceled subscription)');
  console.log('  • 1 × Trialing (14-day trial)');
  console.log('  • 1 × Past Due (declined card)\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💵 EXPECTED MRR CALCULATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const expectedMRR = {
    starterMonthly: 8 * 49,
    growthMonthly: (3 + 5 + 2 + 4) * 99, // 14 seats
    scaleMonthly: 2 * 299,
    starterAnnual: Math.round(470 / 12 * 100) / 100,
    growthAnnual: Math.round(950 / 12 * 100) / 100,
  };

  console.log(`  Starter Monthly:  8 × $49.00      = $${expectedMRR.starterMonthly.toFixed(2)}`);
  console.log(`  Growth Monthly:  14 × $99.00      = $${expectedMRR.growthMonthly.toFixed(2)}`);
  console.log(`  Scale Monthly:    2 × $299.00     = $${expectedMRR.scaleMonthly.toFixed(2)}`);
  console.log(`  Starter Annual:   $470/12         = $${expectedMRR.starterAnnual.toFixed(2)}`);
  console.log(`  Growth Annual:    $950/12         = $${expectedMRR.growthAnnual.toFixed(2)}`);
  console.log('  ─────────────────────────────────────────');

  const totalMRR = expectedMRR.starterMonthly + expectedMRR.growthMonthly +
    expectedMRR.scaleMonthly + expectedMRR.starterAnnual + expectedMRR.growthAnnual;
  console.log(`  TOTAL EXPECTED MRR:              $${totalMRR.toFixed(2)}`);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ SEED COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Next steps:');
  console.log('1. Go to https://dashboard.stripe.com/test/customers');
  console.log('2. Verify the test customers were created');
  console.log('3. Connect this Stripe account to Beacon via OAuth');
  console.log('4. Verify Beacon shows MRR of ~$2,494.34\n');
}

// Run the seed
seedTestData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
