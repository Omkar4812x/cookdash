"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [user, setUser] = useState<any>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = sessionStorage.getItem("currentUser");
      if (userStr) {
        const u = JSON.parse(userStr);
        setUser(u);

        // Fetch bookings
        fetch(`/api/bookings?customerId=${u.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              const upcoming = data.filter(
                (b) => b.status === "Pending Approval" || b.status === "Confirmed"
              );
              const past = data.filter(
                (b) => b.status === "Completed" || b.status === "Cancelled" || b.status === "Declined"
              );
              setUpcomingBookings(upcoming);
              setPastBookings(past);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error loading customer dashboard bookings:", err);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const conversations = [
    {
      id: "c-1",
      name: "Chef Pooja Sharma",
      avatar: "PS",
      lastMessage: "I will arrive 15 minutes early to prep. Looking forward!",
      time: "10:15 AM",
      unread: true,
    },
    {
      id: "c-2",
      name: "Chef Kabir Mehta",
      avatar: "KM",
      lastMessage: "Do you have any specific allergies to spices or oils?",
      time: "Yesterday",
      unread: false,
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="bg-surface rounded-3xl border border-border-light p-8 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display text-text-primary">
                Welcome, {user ? user.firstName : "Guest"}! 👋
              </h1>
              <p className="text-sm text-text-secondary mt-1">Manage your bookings, messages, and dietary settings.</p>
            </div>
            <div className="flex gap-4 text-center shrink-0">
              <div className="bg-primary-50 rounded-2xl px-4 py-2 border border-primary-100">
                <span className="text-xs text-text-tertiary block font-bold uppercase tracking-wider">Wallet Balance</span>
                <span className="text-lg font-bold text-primary">₹2,500.00</span>
              </div>
              <div className="bg-secondary-light rounded-2xl px-4 py-2 border border-secondary-100">
                <span className="text-xs text-text-tertiary block font-bold uppercase tracking-wider">Membership</span>
                <span className="text-lg font-bold text-secondary">CookDash+</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-surface rounded-2xl border border-border-light p-4 shadow-sm h-fit space-y-1">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "bookings" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>📅</span> Bookings
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === "messages" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>💬</span> Messages
                </span>
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "favorites" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>❤️</span> Favorites
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "settings" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>👤</span> Profile Settings
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-3">
              {/* BOOKINGS TAB */}
              {activeTab === "bookings" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold font-display mb-4">Upcoming Booking Sessions</h2>
                    {upcomingBookings.length > 0 ? (
                      <div className="grid gap-4">
                        {upcomingBookings.map((b) => (
                          <div key={b.id} className="card-flat bg-surface p-6 border border-border-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex gap-4 items-center">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                                {b.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-bold text-text-primary">{b.cook}</h3>
                                  <span className={`badge text-[10px] ${b.status === "Confirmed" ? "badge-success" : "badge-accent"}`}>
                                    {b.status}
                                  </span>
                                </div>
                                <p className="text-sm text-text-secondary mt-0.5">{b.menu}</p>
                                <p className="text-xs text-text-tertiary mt-1">📅 {b.date} at {b.time} · {b.guests} guests</p>
                              </div>
                            </div>
                            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-light">
                              <span className="text-base font-bold text-text-primary">₹{b.price}</span>
                              <div className="flex gap-2">
                                <Link href={`/cook/${b.cook.toLowerCase().replace(/\s+/g, "-")}`} className="btn btn-ghost btn-sm text-xs">
                                  Message
                                </Link>
                                <button className="btn btn-outline btn-sm text-xs py-1.5 px-3">
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary">No upcoming sessions. Find a cook to start eating fresh!</p>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold font-display mb-4">Past Sessions</h2>
                    <div className="grid gap-4">
                      {pastBookings.map((b) => (
                        <div key={b.id} className="card-flat bg-surface p-6 border border-border-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-80">
                          <div className="flex gap-4 items-center">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                              {b.avatar}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-text-primary">{b.cook}</h3>
                              <p className="text-sm text-text-secondary mt-0.5">{b.menu}</p>
                              <p className="text-xs text-text-tertiary mt-1">📅 {b.date} · {b.guests} guests</p>
                            </div>
                          </div>
                          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-light">
                            <span className="text-base font-bold text-text-primary">₹{b.price}</span>
                            <button className="btn btn-primary btn-sm text-xs">
                              Rebook Chef
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === "messages" && (
                <div className="bg-surface rounded-2xl border border-border-light overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-border-light bg-surface-hover">
                    <h2 className="text-base font-bold text-text-primary">Conversations</h2>
                  </div>
                  <div className="divide-y divide-border-light">
                    {conversations.map((c) => (
                      <div key={c.id} className="p-4 flex items-center justify-between hover:bg-surface-hover cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center font-bold text-xs shrink-0">
                            {c.avatar}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                              {c.name}
                              {c.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                            </h4>
                            <p className="text-xs text-text-secondary truncate max-w-[280px] md:max-w-[450px] mt-0.5">{c.lastMessage}</p>
                          </div>
                        </div>
                        <span className="text-xs text-text-tertiary font-medium">{c.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAVORITES TAB */}
              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-xl font-bold font-display mb-6">Your Favorite Home Cooks</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="card bg-surface p-6 flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0">
                          PS
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-text-primary">Chef Pooja Sharma</h3>
                          <p className="text-xs text-text-secondary">Punjabi · 4.9★</p>
                        </div>
                      </div>
                      <Link href="/cook/chef-pooja-sharma" className="btn btn-outline btn-sm text-xs font-semibold py-1.5 px-3">
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold font-display">Profile Settings</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">First Name</label>
                      <input type="text" defaultValue="Sarah" className="w-full px-4 py-2 rounded-xl border border-border bg-surface outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Last Name</label>
                      <input type="text" defaultValue="Mitchell" className="w-full px-4 py-2 rounded-xl border border-border bg-surface outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Email Address</label>
                      <input type="email" defaultValue="sarah.m@example.com" className="w-full px-4 py-2 rounded-xl border border-border bg-surface outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Phone Number</label>
                      <input type="tel" defaultValue="(512) 555-0199" className="w-full px-4 py-2 rounded-xl border border-border bg-surface outline-none text-sm" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Dietary Settings</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Vegetarian Options", "Gluten-Free Options", "Nut-Free"].map((tag) => (
                        <span key={tag} className="badge badge-primary flex items-center gap-1.5 py-1 px-3">
                          {tag} <span className="cursor-pointer text-[10px] text-primary">✕</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-primary py-2.5 px-6 text-sm font-semibold">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
