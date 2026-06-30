"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const benefits = [
  { icon: "💰", text: "Keep up to 90% of your earnings" },
  { icon: "📅", text: "Set your own schedule & availability" },
  { icon: "🍽️", text: "Create menus you're passionate about" },
  { icon: "📊", text: "Track earnings with a powerful dashboard" },
  { icon: "🛡️", text: "Liability insurance included" },
  { icon: "📱", text: "Manage everything from your phone" },
];

export default function CookCTASection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F5] via-[#FAFAF8] to-[#F0FDF4]" />

      {/* Decorative blobs */}
      <div className="absolute top-10 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[5%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="badge badge-primary mb-4 text-sm">👨‍🍳 For Cooks</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Turn Your Cooking Talent Into Income
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Join a growing community of home cooks earning on their own terms. Set your prices,
              design your menus, choose your hours — we handle the rest.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                >
                  <span className="text-lg shrink-0">{benefit.icon}</span>
                  <span className="text-sm text-text-secondary font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/cook/join" className="btn btn-primary btn-lg">
                Apply to Cook
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/how-it-works#cooks" className="btn btn-ghost btn-lg">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right — Earnings Preview Card */}
          <div className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="bg-surface rounded-3xl shadow-2xl p-8 border border-border-light max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Earnings Dashboard</h3>
                <span className="badge badge-success text-xs">Live Preview</span>
              </div>

              {/* Earnings Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-50 rounded-xl p-4">
                  <p className="text-xs text-text-tertiary font-medium mb-1">This Week</p>
                  <p className="text-2xl font-bold text-primary">₹8,500</p>
                </div>
                <div className="bg-secondary-light rounded-xl p-4">
                  <p className="text-xs text-text-tertiary font-medium mb-1">This Month</p>
                  <p className="text-2xl font-bold text-secondary">₹36,000</p>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="mb-6">
                <p className="text-xs text-text-tertiary font-medium mb-3">Weekly Earnings</p>
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-primary to-primary-400 transition-all duration-500"
                        style={{
                          height: `${height}%`,
                          transitionDelay: `${400 + i * 60}ms`,
                          opacity: visible ? 1 : 0,
                          transform: visible ? "scaleY(1)" : "scaleY(0)",
                          transformOrigin: "bottom",
                        }}
                      />
                      <span className="text-[9px] text-text-tertiary">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Booking */}
              <div className="bg-surface-hover rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-lg">
                  📅
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Next: Sarah M.</p>
                  <p className="text-xs text-text-tertiary">Sat 6 PM · Family Dinner · 4 guests</p>
                </div>
                <span className="badge badge-success text-[10px]">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
