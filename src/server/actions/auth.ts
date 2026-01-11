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
