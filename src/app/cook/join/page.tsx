"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Link from "next/link";

export default function BecomeCookPage() {
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [ratePerPerson, setRatePerPerson] = useState(1200);
  const avgGuests = 4; // average party size

  const calculatedEarnings = weeklyHours * ratePerPerson * avgGuests;

  const faqs = [
    {
      q: "What are the requirements to cook on CookDash?",
      a: "You need to be at least 18 years old, pass a background check and identity verification, hold a valid food handler certification (or obtain one during onboarding), and have access to clean cooking attire and basic transport.",
    },
    {
      q: "Do I need professional culinary experience?",
      a: "No! While we love professional chefs, many of our most successful cooks are passionate home cooks, culinary students, or cultural cuisine experts who learned through generations of home cooking.",
    },
    {
      q: "How do I get paid, and who buys the ingredients?",
      a: "Customers pay securely through the platform. For ingredients, you can either coordinate with the customer to buy them beforehand or use our grocery integration (where the customer pays for the cart you build). Payouts are deposited directly to your bank account 24 hours after a completed session.",
    },
    {
      q: "What fees does CookDash charge?",
      a: "CookDash takes a 10% to 18% commission on your cooking service fees depending on your volume tier. This fee covers insurance, background checks, secure payment handling, and marketing.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-bg">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#FFF8F5] via-bg to-[#F0FDF4] relative overflow-hidden">
          <div className="absolute top-10 right-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge badge-primary mb-5 text-sm">Join the Community</span>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                  Share Your Culinary Passion and <span className="text-gradient">Earn on Your Terms</span>
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
                  CookDash empowers home cooks to build a local business preparing meals in customer kitchens. Set your menus, choose your pricing, and choose your schedule.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#apply-now" className="btn btn-primary btn-lg">
                    Apply Now
                  </a>
                  <a href="#calculator" className="btn btn-ghost btn-lg">
                    Estimate Earnings
                  </a>
                </div>
              </div>

              {/* Graphic / Image */}
              <div className="relative">
                <div className="bg-gradient-to-tr from-primary/10 to-accent/10 rounded-3xl p-8 min-h-[350px] flex items-center justify-center border border-primary-100 shadow-xl">
                  <div className="text-center">
                    <span className="text-6xl block mb-4">🧑‍🍳🍳✨</span>
                    <h3 className="text-xl font-bold mb-2">Liability Insurance Included</h3>
                    <p className="text-sm text-text-secondary max-w-xs mx-auto">
                      Every booking is covered by our ₹50 Lakhs property damage and personal liability insurance policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings Calculator */}
        <section id="calculator" className="py-20 bg-surface border-y border-border-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="badge badge-secondary mb-4 text-sm">Calculator</span>
              <h2 className="text-3xl font-bold font-display mb-4">Estimate Your Weekly Earnings</h2>
              <p className="text-text-secondary">Slide the values below to see how much you could earn on CookDash.</p>
            </div>

            <div className="bg-bg rounded-3xl p-8 border border-border-light shadow-md">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Controls */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Weekly cooking sessions</span>
                      <span className="text-primary">{weeklyHours} sessions</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Rate per guest</span>
                      <span className="text-primary">₹{ratePerPerson} / person</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="3000"
                      step="50"
                      value={ratePerPerson}
                      onChange={(e) => setRatePerPerson(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-[11px] text-text-tertiary mt-1.5">*Assuming an average booking size of 4 guests</p>
                  </div>
                </div>

                {/* Calculation Screen */}
                <div className="bg-surface border border-border-light rounded-2xl p-6 text-center">
                  <span className="text-xs uppercase tracking-wider text-text-tertiary font-bold">Estimated Earnings</span>
                  <div className="text-5xl font-bold text-gradient font-display my-3">
                    ₹{calculatedEarnings.toLocaleString()}
                  </div>
                  <span className="text-sm font-medium text-text-secondary">per week</span>
                  <div className="mt-6 pt-6 border-t border-border-light grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-xs text-text-tertiary">Platform Commission</p>
                      <p className="text-sm font-bold text-text-primary">15%</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary">Take-home pay</p>
                      <p className="text-sm font-bold text-secondary">₹{(calculatedEarnings * 0.85).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="badge badge-accent mb-4 text-sm">Perks</span>
              <h2 className="text-3xl font-bold font-display mb-4">Why Cook with CookDash?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-surface rounded-2xl p-6 border border-border-light">
                <span className="text-4xl block mb-4">💰</span>
                <h3 className="text-lg font-bold mb-2">Great Income Potential</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Unlike food delivery services, our cooks keep up to 90% of their rates. Set your own prices based on skill and menu complexity.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-6 border border-border-light">
                <span className="text-4xl block mb-4">📅</span>
                <h3 className="text-lg font-bold mb-2">100% Flexible Hours</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Cook part-time around your main job or family commitments, or cook full-time. Choose your own hours and block dates off easily.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-6 border border-border-light">
                <span className="text-4xl block mb-4">🎨</span>
                <h3 className="text-lg font-bold mb-2">Design Your Menus</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Showcase your cultural cuisine or healthy cooking specialties. You determine what dishes you prepare and customize items.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cook Registration Form - Simulating Onboarding */}
        <section id="apply-now" className="py-20 bg-surface border-t border-border-light">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-bg rounded-3xl p-8 border border-border-light shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-display">Apply to Become a Cook</h2>
                <p className="text-sm text-text-secondary mt-1">Start your journey today. Verification takes 48-72 hours.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Application Submitted! CookDash team will contact you shortly."); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">First Name</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Last Name</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" placeholder="(555) 555-5555" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">City / Location</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" placeholder="e.g. Austin, TX" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Primary Specialties / Cuisines</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm" placeholder="e.g. Italian, Vegan Meal Prep, Baking" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Years of Cooking Experience</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm">
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                    <option>Professional Chef (10+ years)</option>
                  </select>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" className="mt-1 accent-primary" required />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    I consent to identity verification and a basic background check. I hold or am willing to obtain a Food Handler license before onboarding.
                  </span>
                </div>

                <button type="submit" className="btn btn-primary w-full py-3 mt-4 text-sm font-bold">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-bg">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-display text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface rounded-2xl p-6 border border-border-light shadow-sm">
                  <h4 className="text-base font-bold mb-2 flex gap-2">
                    <span className="text-primary">Q:</span> {faq.q}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
