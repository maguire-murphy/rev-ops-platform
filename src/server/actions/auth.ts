"use server";

import { db } from "@/server/db/client";
import bcrypt from "bcryptjs";

export async function signupUser(data: {
    email: string;
    password: string;
    name: string;
}) {
    // Validate input
    if (!data.email || !data.password || !data.name) {
        throw new Error("All fields are required");
    }

    if (data.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await db.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashedPassword,
        },
    });

    return { success: true, userId: user.id };
}

export async function requestPasswordReset(email: string) {
    const user = await db.user.findUnique({
        where: { email },
    });

    // For security, we don't reveal if the user exists
    if (!user) {
        return { success: true };
    }

    // Generate reset token (valid for 1 hour)
    // In a real app, store this in a VerificationToken table
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

    await db.verificationToken.create({
        data: {
            identifier: email,
            token,
            expires,
        },
    });

    // Send email
    const { sendEmail } = await import("@/server/utils/email");
    await sendEmail({
        to: email,
        subject: "Reset your password",
        text: `Click here to reset your password: http://localhost:3000/reset-password?token=${token}`,
    });

    return { success: true };
}

export async function resetPassword(token: string, newPassword: string) {
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            token,
            expires: { gt: new Date() },
        },
    });

    if (!verificationToken) {
        throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where: { email: verificationToken.identifier },
        data: { password: hashedPassword },
    });

    // Delete used token
    await db.verificationToken.delete({
        where: {
            identifier_token: {
                identifier: verificationToken.identifier,
                token: verificationToken.token,
            },
        },
    });

    return { success: true };
}

export async function verifyEmail(token: string) {
    const verificationToken = await db.verificationToken.findUnique({
        where: { token },
    });

    if (!verificationToken) {
        throw new Error("Invalid or expired verification token");
    }

    if (verificationToken.expires < new Date()) {
        throw new Error("Verification token has expired");
    }

    const user = await db.user.findUnique({
        where: { email: verificationToken.identifier },
    });

    if (!user) {
        throw new Error("User not found");
    }

    await db.user.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: new Date() },
    });

    await db.verificationToken.delete({
        where: { identifier_token: { identifier: verificationToken.identifier, token: verificationToken.token } },
    });

    return { success: true };
}

export async function createOrganization(userId: string, companyName: string) {
    // Check if user already has an org
    const user = await db.user.findUnique({
        where: { id: userId },
        select: { organizationId: true },
    });

    if (user?.organizationId) {
        return { success: true, organizationId: user.organizationId };
    }

    // Create organization
    // Generate a simple slug from company name
    const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

    const organization = await db.organization.create({
        data: {
            name: companyName,
            slug: slug,
        },
    });

    // Update user with organizationId and role
    await db.user.update({
        where: { id: userId },
        data: {
            organizationId: organization.id,
            role: "owner",
        },
    });

    return { success: true, organizationId: organization.id };
}
