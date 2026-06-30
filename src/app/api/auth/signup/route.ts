import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);
    const selectedRole = role || "customer";

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: selectedRole,
      },
    });

    // If the role is cook, auto-generate a corresponding placeholder CookProfile
    if (selectedRole === "cook") {
      const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      await db.cookProfile.create({
        data: {
          userId: user.id,
          slug,
          tagline: "Authentic homemade meals crafted with passion",
          bio: `Hello! I'm Chef ${firstName} ${lastName}. I love cooking delicious, traditional food in your kitchen.`,
          cuisines: "Punjabi, North Indian",
          dietary: "Vegetarian Options, Vegan Options",
          price: 1200,
          distance: 3.5,
          avatar: firstName.substring(0, 2).toUpperCase(),
          gradient: "from-primary to-accent",
          specialties: "Paneer Butter Masala, Dal Makhani",
        },
      });
    }

    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
