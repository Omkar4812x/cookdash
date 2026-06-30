"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<any>(null);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = (userId: string) => {
    fetch(`/api/bookings?cookUserId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Format earnings calculation
          const pending = data
            .filter((b) => b.status === "Pending Approval")
            .map((b) => ({
              ...b,
              earnings: parseFloat(b.price) * 0.85,
            }));
          const upcoming = data
            .filter((b) => b.status === "Confirmed")
            .map((b) => ({
              ...b,
              earnings: parseFloat(b.price) * 0.85,
              address: "Sector 62, Noida, UP", // Placeholder address
            }));
          setPendingRequests(pending);
          setUpcomingBookings(upcoming);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cook bookings:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = sessionStorage.getItem("currentUser");
      if (userStr) {
        const u = JSON.parse(userStr);
        setUser(u);
        fetchBookings(u.id);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const handleBookingAction = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        if (user) {
          fetchBookings(user.id);
        }
      } else {
        alert("Failed to update booking status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting server.");
    }
  };

  const menus = [
    { id: "m1", name: "Grand Punjabi Feast", price: 1499, active: true, orders: 18 },
    { id: "m2", name: "Satvik Thali Night", price: 1249, active: true, orders: 12 },
    { id: "m3", name: "Traditional Mughlai Feast (Private)", price: 1799, active: false, orders: 4 }
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
                Welcome Back, Chef {user ? user.firstName : "Pooja"}! 🍳
              </h1>
              <p className="text-sm text-text-secondary mt-1">Manage your service availability, menus, and payouts.</p>
            </div>
            <div className="flex gap-4 text-center shrink-0">
              <div className="bg-secondary-light rounded-2xl px-4 py-2 border border-secondary-100">
                <span className="text-xs text-text-tertiary block font-bold uppercase tracking-wider">Average Rating</span>
                <span className="text-lg font-bold text-secondary">4.9 ★</span>
              </div>
              <div className="bg-primary-50 rounded-2xl px-4 py-2 border border-primary-100">
                <span className="text-xs text-text-tertiary block font-bold uppercase tracking-wider">Active Tier</span>
                <span className="text-lg font-bold text-primary">Top Rated Pro</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-surface rounded-2xl border border-border-light p-4 shadow-sm h-fit space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "overview" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>📊</span> Overview
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === "bookings" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>📅</span> Bookings
                </span>
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</span>
              </button>
              <button
                onClick={() => setActiveTab("menus")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "menus" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>📋</span> Menu Manager
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "availability" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>⏰</span> Availability
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-3">
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Earnings dashboard */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">This Week</span>
                      <span className="text-3xl font-bold text-primary mt-2 block">₹8,500.00</span>
                      <span className="text-[10px] text-text-tertiary mt-1 block">3 sessions completed</span>
                    </div>
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Pending Balance</span>
                      <span className="text-3xl font-bold text-secondary mt-2 block">₹4,200.00</span>
                      <span className="text-[10px] text-text-tertiary mt-1 block">Payout scheduled: July 3</span>
                    </div>
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Total Earnings</span>
                      <span className="text-3xl font-bold text-text-primary mt-2 block">₹97,000.00</span>
                      <span className="text-[10px] text-text-tertiary mt-1 block">All-time takeaway</span>
                    </div>
                  </div>

                  {/* Pending Booking Requests */}
                  <div>
                    <h2 className="text-xl font-bold font-display mb-4">Pending Booking Requests</h2>
                    {pendingRequests.length > 0 ? (
                      <div className="grid gap-4">
                        {pendingRequests.map((req) => (
                          <div key={req.id} className="card-flat bg-surface p-6 border border-border-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <h3 className="text-base font-bold text-text-primary">{req.customer}</h3>
                              <p className="text-sm text-text-secondary mt-0.5">{req.menu}</p>
                              <p className="text-xs text-text-tertiary mt-1">📅 {req.date} at {req.time} · {req.guests} guests</p>
                            </div>
                            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-light">
                              <span className="text-base font-bold text-secondary">+₹{req.earnings}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleBookingAction(req.id, "Confirmed")}
                                  className="btn btn-primary btn-sm text-xs font-semibold py-1.5 px-3"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleBookingAction(req.id, "Declined")}
                                  className="btn btn-outline btn-sm text-xs py-1.5 px-3"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary">No pending requests at this moment.</p>
                    )}
                  </div>
                </div>
              )}

              {/* BOOKINGS TAB */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-display">Confirmed Upcoming Sessions</h2>
                  {upcomingBookings.length > 0 ? (
                    <div className="grid gap-4">
                      {upcomingBookings.map((b) => (
                        <div key={b.id} className="card-flat bg-surface p-6 border border-border-light space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-base font-bold text-text-primary">{b.customer}</h3>
                              <p className="text-sm text-text-secondary mt-0.5">{b.menu}</p>
                            </div>
                            <span className="text-lg font-bold text-secondary">₹{b.earnings}</span>
                          </div>
                          <div className="text-xs text-text-secondary space-y-1">
                            <p>📅 <strong>Scheduled:</strong> {b.date} at {b.time}</p>
                            <p>📍 <strong>Location:</strong> {b.address}</p>
                            <p>👥 <strong>Party Size:</strong> {b.guests} guests</p>
                          </div>
                          <div className="flex gap-2 border-t border-border-light pt-4">
                            <button className="btn btn-primary btn-sm text-xs">Directions</button>
                            <button className="btn btn-outline btn-sm text-xs">Chat</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary">No upcoming confirmed sessions.</p>
                  )}
                </div>
              )}

              {/* MENU MANAGER TAB */}
              {activeTab === "menus" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold font-display">Your Menus</h2>
                    <button className="btn btn-primary btn-sm" onClick={() => alert("Create Menu Flow")}>
                      + Create Menu
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {menus.map((m) => (
                      <div key={m.id} className="bg-surface rounded-2xl border border-border-light p-6 flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-bold text-text-primary">{m.name}</h3>
                          <p className="text-xs text-text-secondary mt-1">₹{m.price} / person · {m.orders} total orders</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`badge text-[10px] ${m.active ? "badge-success" : "badge-secondary"}`}>
                            {m.active ? "Active" : "Archived"}
                          </span>
                          <button className="btn btn-outline btn-sm text-xs font-semibold py-1.5 px-3">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AVAILABILITY TAB */}
              {activeTab === "availability" && (
                <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold font-display">Availability Calendar</h2>
                  <p className="text-sm text-text-secondary">Define the hours when customers can book your home cooking services.</p>

                  <div className="space-y-4">
                    {["Monday", "Wednesday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-border-light last:border-0">
                        <span className="text-sm font-semibold text-text-primary w-24">{day}</span>
                        <div className="flex items-center gap-2">
                          <input type="time" defaultValue="17:00" className="px-3 py-1.5 border border-border rounded-lg text-xs outline-none" />
                          <span className="text-xs text-text-tertiary">to</span>
                          <input type="time" defaultValue="21:00" className="px-3 py-1.5 border border-border rounded-lg text-xs outline-none" />
                        </div>
                        <span className="badge badge-success text-[10px]">Active Available</span>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-primary py-2.5 px-6 text-sm font-semibold">
                    Save Schedule
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
