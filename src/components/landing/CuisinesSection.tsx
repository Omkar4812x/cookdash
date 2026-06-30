"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cuisines = [
  { name: "Italian", emoji: "🍝", count: 145, color: "from-[#E85D26]/10 to-[#F4A261]/10", border: "hover:border-primary/30" },
  { name: "Mexican", emoji: "🌮", count: 98, color: "from-[#10B981]/10 to-[#34D399]/10", border: "hover:border-secondary/30" },
  { name: "Indian", emoji: "🍛", count: 132, color: "from-[#F59E0B]/10 to-[#FBBF24]/10", border: "hover:border-accent/30" },
  { name: "Japanese", emoji: "🍣", count: 87, color: "from-[#3B82F6]/10 to-[#60A5FA]/10", border: "hover:border-info/30" },
  { name: "Thai", emoji: "🥘", count: 76, color: "from-[#8B5CF6]/10 to-[#A78BFA]/10", border: "hover:border-[#8B5CF6]/30" },
  { name: "Mediterranean", emoji: "🫒", count: 112, color: "from-[#2D6A4F]/10 to-[#52B788]/10", border: "hover:border-secondary/30" },
  { name: "Chinese", emoji: "🥡", count: 156, color: "from-[#DC2626]/10 to-[#EF4444]/10", border: "hover:border-error/30" },
  { name: "French", emoji: "🥐", count: 64, color: "from-[#E85D26]/10 to-[#D14D1A]/10", border: "hover:border-primary/30" },
];

export default function CuisinesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cuisines" className="py-24 bg-surface relative" ref={ref}>
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="badge badge-accent mb-4 text-sm">🌍 World Flavors</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Explore Cuisines You Love
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From comforting Italian pastas to fiery Thai curries — discover home cooks who specialize in your favorite flavors.
          </p>
        </div>

        {/* Cuisine Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cuisines.map((cuisine, index) => (
            <Link
              key={cuisine.name}
              href={`/explore?cuisine=${cuisine.name.toLowerCase()}`}
              className={`group relative bg-gradient-to-br ${cuisine.color} rounded-2xl p-6 border border-transparent ${cuisine.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cuisine.emoji}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">{cuisine.name}</h3>
              <p className="text-sm text-text-tertiary">{cuisine.count} cooks</p>

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}>
          <Link href="/explore" className="btn btn-outline">
            View All Cuisines
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
