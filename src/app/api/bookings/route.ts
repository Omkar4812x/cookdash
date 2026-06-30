import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const cookUserId = searchParams.get("cookUserId");
    const cookProfileId = searchParams.get("cookProfileId");

    let whereClause: any = {};

    if (customerId) {
      whereClause.customerId = customerId;
    } else if (cookUserId) {
      const profile = await db.cookProfile.findUnique({
        where: { userId: cookUserId },
      });
      if (profile) {
        whereClause.cookProfileId = profile.id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    } else if (cookProfileId) {
      whereClause.cookProfileId = cookProfileId;
    }

    const bookings = await db.booking.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        cookProfile: {
          select: {
            avatar: true,
            gradient: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format list for dashboards
    const results = bookings.map((b) => ({
      id: b.id,
      cook: `Chef ${b.cookProfile.user.firstName} ${b.cookProfile.user.lastName}`,
      customer: `${b.customer.firstName} ${b.customer.lastName}`,
      menu: b.menuName,
      date: b.date,
      time: b.time,
      status: b.status,
      guests: b.guests,
      price: b.total.toFixed(2),
      avatar: b.cookProfile.avatar,
      gradient: b.cookProfile.gradient,
    }));

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const {
      customerId,
      cookSlug,
      menuId,
      menuName,
      date,
      time,
      guests,
      specialInstructions,
      total,
    } = await request.json();

    if (!customerId || !cookSlug || !menuName || !date || !time || !guests || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Resolve customer
    const user = await db.user.findUnique({
      where: { id: customerId },
    });
    if (!user) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // 2. Resolve cook profile
    const cook = await db.cookProfile.findUnique({
      where: { slug: cookSlug },
    });
    if (!cook) {
      return NextResponse.json({ error: "Cook not found" }, { status: 404 });
    }

    // 3. Create booking
    const booking = await db.booking.create({
      data: {
        customerId: user.id,
        cookProfileId: cook.id,
        menuId: menuId || "default-menu-id",
        menuName,
        date,
        time,
        guests: parseInt(guests),
        specialInstructions,
        total: parseFloat(total),
        status: "Pending Approval",
      },
    });

    return NextResponse.json(
      { message: "Booking requested successfully", bookingId: booking.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
