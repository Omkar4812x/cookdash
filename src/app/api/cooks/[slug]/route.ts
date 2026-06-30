import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await props.params;
    const { slug } = params;
    if (!slug) {
      return NextResponse.json({ error: "Missing cook slug" }, { status: 400 });
    }

    const cook = await db.cookProfile.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        menus: true,
        reviews: {
          include: {
            customer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!cook) {
      return NextResponse.json({ error: "Cook not found" }, { status: 404 });
    }

    // Format response payload to match COOKS_DATA structure
    const responseData = {
      name: `Chef ${cook.user.firstName} ${cook.user.lastName}`,
      tagline: cook.tagline,
      cuisines: cook.cuisines.split(", ").map((x) => x.trim()),
      dietary: cook.dietary.split(", ").map((x) => x.trim()),
      rating: cook.rating,
      reviewsCount: cook.reviewsCount,
      price: cook.price,
      distance: cook.distance,
      avatar: cook.avatar,
      gradient: cook.gradient,
      bio: cook.bio,
      certifications: ["FSSAI Certified Food Handler", "Professional Kitchen Management"],
      specialties: cook.specialties.split(", ").map((x) => x.trim()),
      menus: cook.menus.map((m) => ({
        id: m.id,
        name: m.name,
        price: m.price,
        description: m.description,
        dishes: JSON.parse(m.dishes),
      })),
      reviews: cook.reviews.map((r) => ({
        author: `${r.customer.firstName} ${r.customer.lastName.substring(0, 1)}.`,
        rating: r.rating,
        date: r.date,
        text: r.text,
      })),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cook details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
