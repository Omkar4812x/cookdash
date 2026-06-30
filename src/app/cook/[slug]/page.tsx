"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, use, useMemo, useEffect } from "react";
import Link from "next/link";

// Dynamic profiles loaded via API route


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CookProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [cook, setCook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [partySize, setPartySize] = useState(4);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    }

    // Fetch cook details from backend
    fetch(`/api/cooks/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Cook not found");
        return res.json();
      })
      .then((data) => {
        setCook(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cook profile:", err);
        setIsLoading(false);
      });
  }, [slug]);

  const selectedMenu = useMemo(() => {
    if (!cook || !cook.menus || cook.menus.length === 0) return null;
    return cook.menus[selectedMenuIndex] || cook.menus[0];
  }, [cook, selectedMenuIndex]);

  const pricePerPerson = selectedMenu ? selectedMenu.price : 0;
  const subtotal = pricePerPerson * partySize;
  const serviceFee = parseFloat((subtotal * 0.06).toFixed(2));
  const tax = parseFloat((subtotal * 0.0825).toFixed(2));
  const total = subtotal + serviceFee + tax;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert("Please select a date and time!");
      return;
    }

    // Retrieve simulated customer ID
    let customerId = "anonymous-customer-id";
    if (typeof window !== "undefined") {
      const userStr = sessionStorage.getItem("currentUser");
      if (userStr) {
        const u = JSON.parse(userStr);
        customerId = u.id;
      }
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          cookSlug: slug,
          menuId: selectedMenu?.id,
          menuName: selectedMenu?.name,
          date: bookingDate,
          time: bookingTime,
          guests: partySize,
          specialInstructions,
          total: total,
        }),
      });

      if (response.ok) {
        setIsBooked(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to request booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      alert("Failed to submit booking. Check backend connection.");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 bg-bg min-h-screen flex items-center justify-center">
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-text-secondary">Loading cook profile from cloud database...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!cook) {
    return (
      <>
        <Navbar />
        <main className="pt-24 bg-bg min-h-screen flex items-center justify-center">
          <div className="text-center py-16">
            <span className="text-5xl block mb-2">🧑‍🍳❌</span>
            <h3 className="text-lg font-bold text-text-primary mb-1">Chef Not Found</h3>
            <p className="text-sm text-text-secondary">The requested cook profile does not exist.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-bg min-h-screen">
        {/* Banner with cover details */}
        <section className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-b border-border-light py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${cook.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0`}>
              {cook.avatar}
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                <span className="badge badge-success text-xs">🛡️ Background Checked</span>
                <span className="badge badge-primary text-xs">✅ Identity Verified</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-text-primary">{cook.name}</h1>
              <p className="text-sm text-text-secondary font-medium italic mt-1">&quot;{cook.tagline}&quot;</p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1 bg-accent-light rounded-lg px-2.5 py-0.5">
                  <span className="text-xs font-bold text-[#92400E]">⭐ {cook.rating}</span>
                </div>
                <span className="text-xs text-text-tertiary">({cook.reviewsCount} reviews)</span>
                <span className="text-xs text-text-tertiary">·</span>
                <span className="text-xs text-text-tertiary">📍 {cook.distance} miles away</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* About & Menu Tabs */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Profile */}
              <div className="bg-surface rounded-3xl border border-border-light p-8 shadow-xs">
                <h2 className="text-xl font-bold font-display mb-4">About the Cook</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{cook.bio}</p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cook.specialties.map((s: string) => (
                    <span key={s} className="badge badge-primary text-xs">{s}</span>
                  ))}
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Certifications</h3>
                <ul className="space-y-1.5 text-xs text-text-secondary">
                  {cook.certifications.map((c: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-secondary">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Menus display */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display">Menus & Pricing</h2>
                <div className="grid gap-6">
                  {cook.menus.map((menu: any, index: number) => (
                    <div
                      key={menu.id}
                      onClick={() => setSelectedMenuIndex(index)}
                      className={`card-flat bg-surface p-6 border transition-all cursor-pointer ${
                        selectedMenuIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border-light hover:border-text-tertiary"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-text-primary">{menu.name}</h3>
                          <p className="text-xs text-text-secondary mt-1">{menu.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-bold text-primary">₹{menu.price}</span>
                          <span className="text-[10px] text-text-tertiary block">per person</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border-light space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Included Dishes:</p>
                        <div className="grid gap-3">
                          {menu.dishes.map((dish: any, di: number) => (
                            <div key={di} className="text-xs">
                              <p className="font-semibold text-text-primary">{dish.name}</p>
                              <p className="text-text-secondary mt-0.5">{dish.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-surface rounded-3xl border border-border-light p-8 shadow-xs space-y-6">
                <h2 className="text-xl font-bold font-display">Reviews ({cook.reviewsCount})</h2>
                <div className="divide-y divide-border-light">
                  {cook.reviews.map((review: any, i: number) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-text-primary">{review.author}</span>
                          <span className="text-xs text-text-tertiary ml-2">{review.date}</span>
                        </div>
                        <span className="text-xs font-bold text-[#92400E]">⭐ {review.rating}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">&quot;{review.text}&quot;</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Booking Form Widget */}
            <div>
              <div className="sticky top-28 bg-surface border border-border-light rounded-3xl p-6 shadow-xl space-y-6">
                {!isLoggedIn ? (
                  <div className="text-center py-8 px-4 space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl shadow-sm animate-pulse">
                      🔒
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-text-primary">Authentication Required</h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        You must be signed in to request a booking with {cook.name}.
                      </p>
                    </div>
                    <div className="space-y-3 pt-2">
                      <Link href="/login" className="btn btn-primary w-full py-2.5 text-xs font-bold text-center block">
                        Log In
                      </Link>
                      <Link href="/signup" className="btn btn-outline w-full py-2.5 text-xs font-bold text-center block">
                        Sign Up Free
                      </Link>
                    </div>
                  </div>
                ) : !isBooked ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold font-display border-b border-border-light pb-3">Book this experience</h3>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Select Menu</label>
                      <select
                        value={selectedMenuIndex}
                        onChange={(e) => setSelectedMenuIndex(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm"
                      >
                        {cook.menus.map((m: any, idx: number) => (
                          <option key={m.id} value={idx}>{m.name} (₹{m.price}/pp)</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-border bg-surface outline-none text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Time</label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-border bg-surface outline-none text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Guests</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={partySize}
                        onChange={(e) => setPartySize(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Notes / Allergies</label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g. Nut allergy, parking instructions..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-xs h-20 resize-none"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-border-light pt-4 space-y-2 text-xs">
                      <div className="flex justify-between text-text-secondary">
                        <span>₹{pricePerPerson} x {partySize} guests</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-text-secondary">
                        <span>Service Fee (6%)</span>
                        <span>₹{serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-text-secondary">
                        <span>Taxes (8.25%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-text-primary font-bold text-sm pt-2 border-t border-dashed border-border-light">
                        <span>Total Due</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full py-3 mt-4 text-sm font-bold">
                      Request Booking
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <span className="text-5xl block">🎉</span>
                    <h3 className="text-xl font-bold font-display text-secondary">Booking Requested!</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      We have sent your booking request to {cook.name} for approval. You will receive a notification as soon as they accept.
                    </p>
                    <div className="bg-bg border border-border-light rounded-xl p-4 text-left text-xs space-y-2">
                      <p><strong>Menu:</strong> {selectedMenu.name}</p>
                      <p><strong>Date/Time:</strong> {bookingDate} at {bookingTime}</p>
                      <p><strong>Guests:</strong> {partySize}</p>
                      <p><strong>Total:</strong> ₹{total.toFixed(2)} (Held in escrow)</p>
                    </div>
                    <Link href="/dashboard" className="btn btn-primary w-full py-2.5 text-xs font-bold">
                      Go to Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
