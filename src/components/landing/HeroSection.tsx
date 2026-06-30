"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F5] via-bg to-[#F0FDF4]" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float delay-200" />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-accent/8 rounded-full blur-2xl" />

      {/* Decorative dots pattern */}
      <div className="absolute top-32 left-16 opacity-[0.07]">
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div
            className={`max-w-xl transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary-light/70 border border-secondary/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-semibold text-secondary">100% Verified Home Cooks</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-tight mb-6">
              <span className="font-display block">Fresh, Authentic</span>
              <span className="font-display block">Meals Made</span>
              <span className="font-display text-gradient block">In Your Kitchen</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
              Discover talented local cooks who come to your home and prepare delicious,
              personalized meals — just for you and your loved ones.
            </p>

            {/* Search Bar */}
            <div className="bg-surface shadow-xl rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8 border border-border-light">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-hover rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-tertiary shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your address or zip code"
                  className="w-full bg-transparent border-none outline-none text-sm placeholder:text-text-tertiary"
                  id="hero-location-input"
                />
              </div>
              <Link
                href="/explore"
                className="btn btn-primary px-8 py-3.5 text-sm shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Find Cooks
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex -space-x-2">
                {[
                  "bg-gradient-to-br from-primary to-accent",
                  "bg-gradient-to-br from-secondary to-[#52B788]",
                  "bg-gradient-to-br from-accent to-primary",
                  "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${gradient} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["SM", "DK", "AR", "RJ"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F4A261" stroke="#F4A261" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                  <span className="text-text-secondary font-semibold ml-1">4.9</span>
                </div>
                <p className="text-text-tertiary">
                  Loved by <span className="text-text-secondary font-semibold">2,000+</span> happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Right — Visual Cards */}
          <div
            className={`relative hidden lg:block transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main Card */}
            <div className="relative z-10">
              <div className="bg-surface rounded-3xl shadow-2xl overflow-hidden border border-border-light">
                {/* Food Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
                        <span className="text-4xl">🍽️</span>
                      </div>
                      <p className="text-sm font-medium text-text-secondary">Chef Pooja&apos;s Kitchen</p>
                    </div>
                  </div>
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-semibold text-secondary">Available Today</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">Chef Pooja Sharma</h3>
                      <p className="text-sm text-text-secondary">Authentic Punjabi Cuisine</p>
                    </div>
                    <div className="flex items-center gap-1 bg-accent-light rounded-full px-2.5 py-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F4A261" stroke="#F4A261" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span className="text-sm font-bold text-[#92400E]">4.9</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge badge-primary">🍛 Punjabi</span>
                    <span className="badge badge-secondary">🌿 Vegetarian</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹1,499</span>
                      <span className="text-sm text-text-tertiary"> / person</span>
                    </div>
                    <Link href="/cook/chef-pooja-sharma" className="btn btn-primary btn-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-8 z-20 bg-surface rounded-2xl shadow-xl p-4 border border-border-light animate-float delay-400">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary-light flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Booking Confirmed!</p>
                  <p className="text-xs text-text-tertiary">Saturday at 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Floating Review Card */}
            <div className="absolute -top-4 -right-4 z-20 bg-surface rounded-2xl shadow-xl p-4 border border-border-light animate-float delay-600">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F4A261" stroke="#F4A261" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-text-secondary font-medium">&quot;Best meal we&apos;ve had!&quot;</p>
              <p className="text-[10px] text-text-tertiary mt-0.5">— Sarah M.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 72C96 64 192 48 288 42.7C384 37 480 43 576 48C672 53 768 59 864 56C960 53 1056 43 1152 40C1248 37 1344 43 1392 45.3L1440 48V80H0Z" fill="var(--color-bg)"/>
        </svg>
      </div>
    </section>
  );
}
