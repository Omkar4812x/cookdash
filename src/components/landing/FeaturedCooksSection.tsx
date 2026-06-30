"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cooks = [
  {
    name: "Chef Pooja Sharma",
    specialty: "Authentic Punjabi Cuisine",
    cuisines: ["Punjabi", "North Indian"],
    rating: 4.9,
    reviews: 47,
    price: 1499,
    avatar: "PS",
    gradient: "from-primary to-accent",
    available: true,
    badges: ["Top Rated", "Verified"],
    tagline: "Traditional Punjabi flavors, made with love",
  },
  {
    name: "Chef Kabir Mehta",
    specialty: "Indochinese & Thai Street Food",
    cuisines: ["Indochinese", "Thai"],
    rating: 4.8,
    reviews: 32,
    price: 1249,
    avatar: "KM",
    gradient: "from-secondary to-[#52B788]",
    available: true,
    badges: ["Verified"],
    tagline: "Indochinese fusion street food comfort",
  },
  {
    name: "Chef Manish Patel",
    specialty: "Gujarati & Rajasthani Thali",
    cuisines: ["Gujarati", "Rajasthani"],
    rating: 5.0,
    reviews: 61,
    price: 1799,
    avatar: "MP",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
    available: false,
    badges: ["Top Rated", "Elite", "Verified"],
    tagline: "Organic traditional Gujarati home recipes",
  },
  {
    name: "Chef Priya Sharma",
    specialty: "South Indian & Chettinad",
    cuisines: ["South Indian", "Chettinad"],
    rating: 4.9,
    reviews: 38,
    price: 1399,
    avatar: "PS",
    gradient: "from-accent to-[#F59E0B]",
    available: true,
    badges: ["Verified"],
    tagline: "Aroma of fresh curry leaves & coconut ghee",
  },
];

export default function FeaturedCooksSection() {
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
    <section id="featured" className="py-24 bg-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <div>
            <span className="badge badge-secondary mb-4 text-sm">⭐ Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Featured Home Cooks
            </h2>
            <p className="text-text-secondary text-lg max-w-xl">
              Hand-picked cooks with exceptional ratings, verified identities, and rave reviews from the community.
            </p>
          </div>
          <Link href="/explore" className="btn btn-outline shrink-0">
            Browse All Cooks
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Cook Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooks.map((cook, index) => (
            <Link
              key={cook.name}
              href={`/cook/${cook.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`card group cursor-pointer transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Header with Avatar */}
              <div className="relative p-6 pb-4">
                {/* Availability Badge */}
                {cook.available && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-success-light rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[11px] font-semibold text-[#065F46]">Available</span>
                  </div>
                )}

                {/* Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cook.gradient} flex items-center justify-center text-white text-lg font-bold mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {cook.avatar}
                </div>

                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                  {cook.name}
                </h3>
                <p className="text-sm text-text-tertiary mt-0.5 italic">&quot;{cook.tagline}&quot;</p>
              </div>

              {/* Cuisines */}
              <div className="px-6 pb-3 flex flex-wrap gap-1.5">
                {cook.cuisines.map((c) => (
                  <span key={c} className="text-xs font-medium bg-surface-hover text-text-secondary rounded-full px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>

              {/* Rating & Badges */}
              <div className="px-6 pb-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F4A261" stroke="#F4A261" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span className="text-sm font-bold">{cook.rating}</span>
                  <span className="text-xs text-text-tertiary">({cook.reviews})</span>
                </div>
                {cook.badges.includes("Top Rated") && (
                  <span className="badge badge-accent text-[10px] py-0.5 px-2">🏆 Top Rated</span>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-primary">₹{cook.price}</span>
                  <span className="text-xs text-text-tertiary"> / person</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
