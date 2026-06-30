"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Shalini Mishra",
    role: "Working Mother, Mumbai",
    avatar: "SM",
    gradient: "from-primary to-accent",
    rating: 5,
    text: "CookDash has completely changed our busy weeknight dinners. Chef Pooja comes every Tuesday and prepares the most incredible Punjabi food. My kids actually eat veggies now!",
    cook: "Chef Pooja Sharma",
  },
  {
    name: "Deepak Chawla",
    role: "Finance Director, Delhi NCR",
    avatar: "DC",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
    rating: 5,
    text: "Hosted a Sunday lunch for 10 with Chef Manish Patel. The Kathiyawadi Undhiyu and piping hot Rotlis were divine, and my guests couldn't stop raving. More personal than catering.",
    cook: "Chef Manish Patel",
  },
  {
    name: "Ananya Iyer",
    role: "Software Architect, Bangalore",
    avatar: "AI",
    gradient: "from-secondary to-[#52B788]",
    rating: 5,
    text: "Being away from Kerala, I missed traditional home cooking. Found Chef Neha Nair on CookDash who makes Avial and Malabar Biryani exactly like home. Truly nostalgic experience.",
    cook: "Chef Neha Nair",
  },
];

export default function TestimonialsSection() {
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
    <section id="testimonials" className="py-24 bg-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <span className="badge badge-accent mb-4 text-sm">💬 Real Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What Our Community Says
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from customers who&apos;ve experienced the CookDash difference.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`card-flat bg-surface p-8 relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-5xl text-primary/10 font-display leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F4A261" stroke="#F4A261" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-text-secondary leading-relaxed mb-6 relative z-10">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Cook reference */}
              <p className="text-xs text-primary font-medium mb-5">
                Booked: {testimonial.cook}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border-light">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-xs text-text-tertiary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
