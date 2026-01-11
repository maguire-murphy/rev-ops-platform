import { db } from "../src/server/db/client";
import { encrypt, decrypt } from "../src/server/utils/encryption";

async function main() {
    console.log("Testing Encryption Utility...");
    const secret = "my-super-secret-token";
    const encrypted = encrypt(secret);
    const decrypted = decrypt(encrypted);

    if (secret !== decrypted) {
        console.error("Encryption/Decryption failed!");
        process.exit(1);
    }
    console.log("Encryption/Decryption successful.");

    console.log("Testing Database Integration Storage...");
    const orgId = "00000000-0000-0000-0000-000000000000"; // Default org
    const provider = "hubspot_test"; // Use a test provider to avoid conflict

    // Clean up previous test
    await db.integration.deleteMany({
        where: {
            organizationId: orgId,
            provider: provider,
        }
    });

    // Create integration
    const accessToken = "access-token-123";
    const refreshToken = "refresh-token-123";

    await db.integration.create({
        data: {
            organizationId: orgId,
            provider: provider,
            accessTokenEncrypted: encrypt(accessToken),
            refreshTokenEncrypted: encrypt(refreshToken),
            status: "active",
            lastSyncAt: new Date(),
        }
    });

    // Retrieve and verify
    const integration = await db.integration.findFirst({
        where: {
            organizationId: orgId,
            provider: provider,
        }
    });

    if (!integration) {
        console.error("Integration not found in DB!");
        process.exit(1);
    }

    if (decrypt(integration.accessTokenEncrypted!) !== accessToken) {
        console.error("Access token mismatch!");
        process.exit(1);
    }

    if (decrypt(integration.refreshTokenEncrypted!) !== refreshToken) {
        console.error("Refresh token mismatch!");
        process.exit(1);
    }

    console.log("Database storage verification successful.");

    // Clean up
    await db.integration.deleteMany({
        where: {
            organizationId: orgId,
            provider: provider,
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
