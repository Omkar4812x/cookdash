"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Discover Local Cooks",
    description: "Browse verified home cooks in your area. Filter by cuisine, dietary needs, price, and availability to find your perfect match.",
    color: "from-primary/10 to-accent/10",
    borderColor: "border-primary/20",
    iconBg: "bg-primary-50",
  },
  {
    number: "02",
    icon: "📅",
    title: "Book Your Session",
    description: "Choose a menu, pick your date and time, and book instantly. Add special instructions or dietary requirements — it's that easy.",
    color: "from-secondary/10 to-[#BBF7D0]/30",
    borderColor: "border-secondary/20",
    iconBg: "bg-secondary-50",
  },
  {
    number: "03",
    icon: "👨‍🍳",
    title: "Enjoy at Home",
    description: "Your cook arrives, prepares everything in your kitchen, and cleans up. Sit back, relax, and enjoy a restaurant-quality meal at home.",
    color: "from-accent/10 to-primary/10",
    borderColor: "border-accent/20",
    iconBg: "bg-accent-light",
  },
];

export default function HowItWorksSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="badge badge-primary mb-4 text-sm">Simple & Easy</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How CookDash Works
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Getting a delicious home-cooked meal has never been easier. Three simple steps to culinary bliss.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`card-flat bg-gradient-to-br ${step.color} border ${step.borderColor} p-8 text-center h-full`}>
                {/* Step Number */}
                <div className="relative z-10 w-14 h-14 mx-auto mb-6 rounded-2xl bg-surface shadow-md flex items-center justify-center text-2xl">
                  {step.icon}
                </div>

                {/* Number badge */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-text-primary/[0.04] font-display">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
