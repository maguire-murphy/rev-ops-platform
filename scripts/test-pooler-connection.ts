import { PrismaClient } from "@prisma/client";

const poolerUrl = "postgresql://postgres.azcyibouknvdgpfqrazs:6U4Itlgq3CYFh2MJ@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: poolerUrl,
        },
    },
});

async function testConnection() {
    console.log("Testing pooler connection...\n");

    try {
        // Test basic connection
        await prisma.$connect();
        console.log("✅ Connected to database via pooler");

        // Count users
        const userCount = await prisma.user.count();
        console.log(`Found ${userCount} users in database`);

        // Look for demo user
        const demoUser = await prisma.user.findUnique({
            where: { email: "demo@revops.app" },
            select: {
                id: true,
                email: true,
                name: true,
                organizationId: true,
            }
        });

        if (demoUser) {
            console.log("✅ Demo user found:", demoUser);
        } else {
            console.log("❌ Demo user NOT found");
        }

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
