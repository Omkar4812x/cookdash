import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — CookDash",
  description:
    "Learn about CookDash's mission to connect customers with talented local home cooks for personalized in-home cooking experiences.",
};

const values = [
  {
    icon: "🤝",
    title: "Trust First",
    description:
      "Every cook is identity-verified and background-checked. We build trust into every interaction so you can open your door with confidence.",
  },
  {
    icon: "🌍",
    title: "Celebrate Diversity",
    description:
      "Food is culture. We empower cooks from every background to share their heritage through authentic home-cooked meals.",
  },
  {
    icon: "💪",
    title: "Empower Cooks",
    description:
      "Cooks set their own prices, menus, and schedules. We provide the platform — they build the business.",
  },
  {
    icon: "✨",
    title: "Delight in Details",
    description:
      "From the first search to the last bite, every touchpoint is designed to feel effortless, personal, and premium.",
  },
];

const stats = [
  { value: "2,000+", label: "Verified Cooks" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "35", label: "Cities Served" },
  { value: "4.9★", label: "Average Rating" },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Co-Founder & CEO",
    initials: "AR",
    gradient: "from-primary to-accent",
    bio: "Former product lead at a major food-tech company. Passionate about making great food accessible.",
  },
  {
    name: "Jordan Park",
    role: "Co-Founder & CTO",
    initials: "JP",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
    bio: "Full-stack engineer with 12 years building marketplace platforms at scale.",
  },
  {
    name: "Maya Chen",
    role: "Head of Design",
    initials: "MC",
    gradient: "from-secondary to-[#52B788]",
    bio: "UX leader who believes great design builds trust. Previously designed for leading travel platforms.",
  },
  {
    name: "Sam Okonkwo",
    role: "Head of Operations",
    initials: "SO",
    gradient: "from-accent to-[#F59E0B]",
    bio: "Operations expert with deep experience in on-demand services and cook community management.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-[#FFF8F5] via-bg to-[#F0FDF4] relative overflow-hidden">
          <div className="absolute top-10 right-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="badge badge-primary mb-5 text-sm">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
              We Believe the Best Meals<br />
              Are Made <span className="text-gradient">With Love</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              CookDash was born from a simple idea: everyone deserves access to fresh,
              authentic, home-cooked food — and every talented cook deserves a way to
              share their gift with the world.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="badge badge-secondary mb-4 text-sm">Our Mission</span>
                <h2 className="text-3xl font-bold font-display mb-6">
                  Connecting Kitchens,<br />Building Community
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    In every neighborhood, there are incredibly talented cooks — parents, retirees,
                    culinary students, cultural food artisans — whose skills go unrecognized and
                    unmonetized. Meanwhile, millions of families struggle to find the time to cook
                    nutritious, flavorful meals.
                  </p>
                  <p>
                    CookDash bridges that gap. We&apos;ve built a marketplace where customers can discover
                    verified local cooks who come to their home and prepare fresh, personalized meals
                    in their own kitchen. It&apos;s not delivery. It&apos;s not catering. It&apos;s something far
                    more personal.
                  </p>
                  <p>
                    For cooks, we provide a platform to build a sustainable business on their own
                    terms — setting their prices, designing their menus, and choosing when and where
                    they work.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-3xl p-10 flex items-center justify-center min-h-[380px]">
                <div className="text-center">
                  <div className="text-7xl mb-4">👨‍🍳❤️🏠</div>
                  <p className="text-lg font-display text-text-secondary italic">
                    &quot;Great food brings people together.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-4 text-sm">What Drives Us</span>
              <h2 className="text-3xl font-bold font-display mb-4">Our Core Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-white font-display mb-1">{s.value}</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="badge badge-primary mb-4 text-sm">The People</span>
              <h2 className="text-3xl font-bold font-display mb-4">Meet the Team</h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                A small, passionate team on a mission to reimagine how the world eats at home.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="card-flat bg-bg p-6 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-base font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-text-tertiary leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#FFF8F5] to-[#F0FDF4]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-display mb-4">
              Ready to Join the Table?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Whether you&apos;re craving a home-cooked meal or ready to share your culinary talent,
              CookDash is waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn btn-primary btn-lg">
                Find a Cook
              </Link>
              <Link href="/cook/join" className="btn btn-outline btn-lg">
                Start Cooking
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
