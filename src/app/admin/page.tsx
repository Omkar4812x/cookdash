"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const pendingCooks = [
    {
      id: "cook-app-01",
      name: "Chef Neha Nair",
      cuisine: "Malabar & Kerala Coastal",
      appliedDate: "June 28, 2026",
      experience: "8 years",
      idStatus: "Uploaded (Ready)",
      backgroundCheck: "Passed",
    },
    {
      id: "cook-app-02",
      name: "Chef Jayesh Sharma",
      cuisine: "Awadhi & Mughlai",
      appliedDate: "June 29, 2026",
      experience: "15 years",
      idStatus: "Uploaded (Ready)",
      backgroundCheck: "Pending",
    }
  ];

  const flaggedReviews = [
    {
      id: "rev-flag-1",
      author: "Disgruntled Guest",
      cook: "Chef Pooja Sharma",
      rating: 1,
      reason: "Inappropriate language / spam content",
      text: "Pooja Sharma was terrible! Total waste of money and she used raw spices!!! I will sue!!!",
    }
  ];

  const supportTickets = [
    {
      id: "tkt-202",
      customer: "John Miller",
      subject: "Dispute about late cancellation fee",
      priority: "High",
      status: "Open",
      created: "2 hours ago",
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
              <h1 className="text-2xl md:text-3xl font-bold font-display text-text-primary">CookDash Control Center 🛠️</h1>
              <p className="text-sm text-text-secondary mt-1">Platform management, cook verifications, review moderation, and configuration.</p>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-primary font-bold text-xs py-1.5 px-3">System Online</span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-surface rounded-2xl border border-border-light p-4 shadow-sm h-fit space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                  activeTab === "overview" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span>📊</span> Platform KPIs
              </button>
              <button
                onClick={() => setActiveTab("verifications")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === "verifications" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>🪪</span> Verification Queue
                </span>
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</span>
              </button>
              <button
                onClick={() => setActiveTab("moderation")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === "moderation" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>⚠️</span> Review Moderation
                </span>
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
              </button>
              <button
                onClick={() => setActiveTab("tickets")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === "tickets" ? "bg-primary-50 text-primary" : "text-text-secondary hover:bg-surface-hover"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>🎫</span> Support Tickets
                </span>
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="lg:col-span-3">
              {/* PLATFORM KPIs TAB */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Total Users</span>
                      <span className="text-3xl font-bold text-text-primary mt-2 block">52,148</span>
                    </div>
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Active Cooks</span>
                      <span className="text-3xl font-bold text-text-primary mt-2 block">2,145</span>
                    </div>
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Total Bookings</span>
                      <span className="text-3xl font-bold text-text-primary mt-2 block">120,490</span>
                    </div>
                    <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                      <span className="text-xs text-text-tertiary font-bold uppercase tracking-wider block">Total Revenue</span>
                      <span className="text-3xl font-bold text-secondary mt-2 block">₹43,25,000</span>
                    </div>
                  </div>

                  {/* System Health / Analytics overview */}
                  <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm">
                    <h3 className="text-base font-bold text-text-primary mb-4">Escrow Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-bg rounded-xl p-4">
                        <span className="text-xs text-text-tertiary">Held in Escrow (Active Bookings)</span>
                        <p className="text-lg font-bold text-text-primary mt-1">₹11,80,450.00</p>
                      </div>
                      <div className="bg-bg rounded-xl p-4">
                        <span className="text-xs text-text-tertiary">Total Payouts Disbursed</span>
                        <p className="text-lg font-bold text-text-primary mt-1">₹3,58,20,500.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VERIFICATIONS TAB */}
              {activeTab === "verifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-display">Pending Cook Approvals</h2>
                  {pendingCooks.map((app) => (
                    <div key={app.id} className="bg-surface border border-border-light rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-text-primary">{app.name}</h3>
                          <p className="text-xs text-text-secondary mt-0.5">{app.cuisine} · {app.experience} experience</p>
                        </div>
                        <span className="badge badge-accent text-[10px]">Verification Review</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-bg rounded-xl p-4 text-xs">
                        <p><strong>Government ID:</strong> {app.idStatus}</p>
                        <p><strong>Background Check:</strong> {app.backgroundCheck}</p>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => alert(`Approved Chef ${app.name}!`)}
                          className="btn btn-primary btn-sm text-xs font-semibold py-1.5 px-3"
                        >
                          Approve Profile
                        </button>
                        <button
                          onClick={() => alert(`Requested more documents for ${app.name}`)}
                          className="btn btn-outline btn-sm text-xs py-1.5 px-3"
                        >
                          Reject / Ask Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODERATION TAB */}
              {activeTab === "moderation" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-display">Flagged Customer Reviews</h2>
                  {flaggedReviews.map((rev) => (
                    <div key={rev.id} className="bg-surface border border-border-light rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-bold text-text-primary">{rev.author}</span>
                          <span className="text-xs text-text-tertiary ml-2">Review on {rev.cook}</span>
                        </div>
                        <span className="text-xs text-error font-bold bg-error-light rounded-lg px-2.5 py-0.5">Flagged</span>
                      </div>

                      <div className="text-xs text-text-secondary bg-bg rounded-xl p-4 space-y-2">
                        <p><strong>Reviewer Text:</strong> &quot;{rev.text}&quot;</p>
                        <p className="text-error"><strong>Flag Reason:</strong> {rev.reason}</p>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => alert("Review has been dismissed from flags.")}
                          className="btn btn-outline btn-sm text-xs py-1.5 px-3"
                        >
                          Dismiss Flag (Keep Review)
                        </button>
                        <button
                          onClick={() => alert("Review has been deleted successfully.")}
                          className="btn btn-primary btn-sm text-xs font-semibold py-1.5 px-3"
                        >
                          Delete Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TICKETS TAB */}
              {activeTab === "tickets" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-display">Customer Support Tickets</h2>
                  {supportTickets.map((tkt) => (
                    <div key={tkt.id} className="bg-surface border border-border-light rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-bold text-text-primary">{tkt.subject}</h3>
                          <p className="text-xs text-text-secondary mt-0.5">Submitted by {tkt.customer} · {tkt.created}</p>
                        </div>
                        <span className="text-xs font-bold bg-error-light text-error rounded-lg px-2 py-0.5">{tkt.priority} Priority</span>
                      </div>

                      <div className="flex gap-2 justify-end pt-4 border-t border-border-light">
                        <button
                          onClick={() => alert("Ticket assigned to you!")}
                          className="btn btn-primary btn-sm text-xs font-semibold"
                        >
                          Reply / Resolve
                        </button>
                      </div>
                    </div>
                  ))}
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
