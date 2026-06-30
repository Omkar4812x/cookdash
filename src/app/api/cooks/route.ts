import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function seedDatabaseIfEmpty() {
  try {
    const cooksCount = await db.cookProfile.count();
    if (cooksCount > 0) return;

    console.log("Seeding database with initial Indian Chef profiles...");

    // 1. Create seed users
    const seedUsersData = [
      { email: "pooja@cookdash.in", firstName: "Pooja", lastName: "Sharma", password: hashPassword("pooja123"), role: "cook" },
      { email: "kabir@cookdash.in", firstName: "Kabir", lastName: "Mehta", password: hashPassword("kabir123"), role: "cook" },
      { email: "manish@cookdash.in", firstName: "Manish", lastName: "Patel", password: hashPassword("manish123"), role: "cook" },
      { email: "priya@cookdash.in", firstName: "Priya", lastName: "Sharma", password: hashPassword("priya123"), role: "cook" },
      { email: "sneha@cookdash.in", firstName: "Sneha", lastName: "Rao", password: hashPassword("sneha123"), role: "cook" },
      { email: "vikram@cookdash.in", firstName: "Vikram", lastName: "Singh", password: hashPassword("vikram123"), role: "cook" },
      { email: "customer@cookdash.in", firstName: "Shalini", lastName: "Mishra", password: hashPassword("shalini123"), role: "customer" },
    ];

    const users = [];
    for (const u of seedUsersData) {
      const createdUser = await db.user.create({
        data: u,
      });
      users.push(createdUser);
    }

    // 2. Map cooks profiles
    const cooksProfiles = [
      {
        userId: users[0].id,
        slug: "chef-pooja-sharma",
        tagline: "Traditional Punjabi flavors, made with love",
        bio: "Namaste, I'm Pooja! I grew up in Amritsar, learning authentic family recipes from my grandmother. I bring the rich spices, aroma of pure ghee, and soul-satisfying taste of traditional North Indian cooking directly to your dining table.",
        cuisines: "Punjabi, North Indian",
        dietary: "Vegetarian Options, Vegan Options",
        rating: 4.9,
        reviewsCount: 47,
        price: 1499,
        distance: 2.4,
        avatar: "PS",
        gradient: "from-primary to-accent",
        specialties: "Chole Bhature, Paneer Butter Masala, Dal Makhani",
      },
      {
        userId: users[1].id,
        slug: "kabir-mehta",
        tagline: "Indochinese & Thai street comfort food",
        bio: "Hi, I'm Kabir! I specialize in Indochinese street food fusion and vibrant Thai dishes. Fresh, fast, aromatic cooking is my specialty.",
        cuisines: "Indochinese, Thai",
        dietary: "Gluten-Free Options, Nut-Free",
        rating: 4.8,
        reviewsCount: 32,
        price: 1249,
        distance: 4.1,
        avatar: "KM",
        gradient: "from-secondary to-[#52B788]",
        specialties: "Momos, Hakka Noodles, Manchurian",
      },
      {
        userId: users[2].id,
        slug: "manish-patel",
        tagline: "Organic traditional Gujarati home recipes",
        bio: "Traditional home recipes passed down through generations. I bring pure vegetarian Kathiyawadi and Gujarati flavors straight to your kitchen.",
        cuisines: "Gujarati, Rajasthani",
        dietary: "Vegetarian",
        rating: 5.0,
        reviewsCount: 61,
        price: 1799,
        distance: 1.8,
        avatar: "MP",
        gradient: "from-[#3B82F6] to-[#8B5CF6]",
        specialties: "Undhiyu, Dhokla, Puran Poli",
      },
      {
        userId: users[3].id,
        slug: "priya-sharma",
        tagline: "Aroma of fresh curry leaves & coconut ghee",
        bio: "Vibrant spices and comforting aromas. I craft traditional South Indian and spicy Chettinad dishes with fresh coconut, mustard seeds, and homemade curry pastes.",
        cuisines: "South Indian, Chettinad",
        dietary: "Vegetarian, Halal, Vegan Options",
        rating: 4.9,
        reviewsCount: 38,
        price: 1399,
        distance: 5.3,
        avatar: "PS",
        gradient: "from-accent to-[#F59E0B]",
        specialties: "Idli, Dosa, Sambar",
      },
      {
        userId: users[4].id,
        slug: "sneha-rao",
        tagline: "Healthy plant-based modern Indian nutrition",
        bio: "Healthy eating shouldn't be boring. I create plant-based high-protein modern Indian wellness bowls, salads, and light dynamic meals for fitness enthusiasts.",
        cuisines: "Healthy, Modern Indian",
        dietary: "Vegan, Gluten-Free, Vegetarian",
        rating: 4.7,
        reviewsCount: 19,
        price: 999,
        distance: 3.5,
        avatar: "SR",
        gradient: "from-primary to-accent",
        specialties: "Millet Bowls, Keto Salads, Vegan Khichdi",
      },
      {
        userId: users[5].id,
        slug: "vikram-singh",
        tagline: "Royal Awadhi & Mughlai feast",
        bio: "Awadhi and Mughlai cooking is about slow-cooking and patience. I prepare rich kebabs, aromatic dum biryanis, and rich saffron-infused curries that carry the lineage of royal court kitchens.",
        cuisines: "Awadhi, Mughlai",
        dietary: "Halal",
        rating: 4.95,
        reviewsCount: 28,
        price: 1999,
        distance: 6.2,
        avatar: "VS",
        gradient: "from-[#1F2937] to-[#4B5563]",
        specialties: "Biryani, Kabab Platter, Shahi Tukda",
      },
    ];

    const profiles = [];
    for (const p of cooksProfiles) {
      const createdProfile = await db.cookProfile.create({
        data: p,
      });
      profiles.push(createdProfile);
    }

    // 3. Create default Menu sets
    const menuFeastData = [
      {
        cookProfileId: profiles[0].id,
        name: "Grand Punjabi Feast",
        price: 1499,
        description: "A three-course shared meal featuring starters, rich curries, and desserts.",
        dishes: JSON.stringify([
          { name: "Paneer Tikka & Samosas", desc: "Charcoal-style paneer cubes and crispy vegetable samosas." },
          { name: "Paneer Butter Masala & Dal Makhani", desc: "Rich cashewnut tomato gravy paneer and overnight slow-cooked black lentils served with garlic naan." },
          { name: "Gajar Ka Halwa", desc: "Grated carrot pudding cooked with milk, khoya, and cardamoms." }
        ])
      },
      {
        cookProfileId: profiles[0].id,
        name: "Satvik Thali Night",
        price: 1249,
        description: "100% onion-and-garlic-free wholesome vegetarian spread.",
        dishes: JSON.stringify([
          { name: "Alu Jeera & Dal Tadka", desc: "Tempered cumin potatoes and yellow lentils." },
          { name: "Basmati Pulao & Roti", desc: "Aromatic steam rice and warm wheat flatbreads." },
          { name: "Kheer", desc: "Sweet rice milk pudding topped with almonds." }
        ])
      },
      {
        cookProfileId: profiles[1].id,
        name: "Indochinese Street Feast",
        price: 1249,
        description: "Vibrant garlic, soy, and chili fusion spread.",
        dishes: JSON.stringify([
          { name: "Chili Paneer Dry", desc: "Crispy paneer tossed with capsicum, onion, and dark soy sauce." },
          { name: "Veg Hakka Noodles & Manchurian", desc: "Classic street-style stir-fried noodles with vegetable dumplings in spicy gravy." },
          { name: "Darsaan", desc: "Honey-glazed crispy noodles served with vanilla ice cream." }
        ])
      },
      {
        cookProfileId: profiles[2].id,
        name: "Grand Kathiyawadi Dinner",
        price: 1799,
        description: "Interactive home dining displaying the richness of traditional Gujarati cooking.",
        dishes: JSON.stringify([
          { name: "Khaman Dhokla & Fafda", desc: "Steamed chickpea cakes and crispy fried gram flour snacks with mint chutney." },
          { name: "Surti Undhiyu & Rotli", desc: "Mixed winter vegetable casserole slow-cooked with fenugreek dumplings and hot flatbreads." },
          { name: "Shrikhand", desc: "Sweet, cardamom-flavored strained yogurt pudding." }
        ])
      },
      {
        cookProfileId: profiles[3].id,
        name: "Grand South Indian Spread",
        price: 1399,
        description: "Feast of steaming hot idlis, crispy dosas, and aromatic curries.",
        dishes: JSON.stringify([
          { name: "Medhu Vada & Mini Idlis", desc: "Crispy fried lentil donuts and tiny steamed rice cakes served with sambar." },
          { name: "Mysore Masala Dosa", desc: "Thin rice crepe smeared with red chili chutney and stuffed with spiced potato mash." },
          { name: "Payasam", desc: "Sweet vermicelli milk pudding cooked with cashews and raisins." }
        ])
      }
    ];

    for (const m of menuFeastData) {
      await db.menu.create({
        data: m,
      });
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
}

export async function GET(request: Request) {
  try {
    // Auto-seed database if it has no cooks (Neon cloud setup resilient check)
    await seedDatabaseIfEmpty();

    const { searchParams } = new URL(request.url);
    const cuisine = searchParams.get("cuisine");

    let whereClause = {};

    if (cuisine) {
      whereClause = {
        cuisines: {
          contains: cuisine,
          mode: "insensitive",
        },
      };
    }

    const cooks = await db.cookProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
    });

    // Structure list response to match frontend view needs
    const results = cooks.map((c) => ({
      id: c.slug,
      name: `Chef ${c.user.firstName} ${c.user.lastName}`,
      tagline: c.tagline,
      cuisines: c.cuisines.split(", ").map((x) => x.trim()),
      dietary: c.dietary.split(", ").map((x) => x.trim()),
      rating: c.rating,
      reviews: c.reviewsCount,
      price: c.price,
      distance: c.distance,
      avatar: c.avatar,
      gradient: c.gradient,
      available: "Today",
      specialties: c.specialties.split(", ").map((x) => x.trim()),
    }));

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cooks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
