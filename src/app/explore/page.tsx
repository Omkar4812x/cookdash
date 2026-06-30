"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// Dynamic database loaded via API route


export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState("recommended");
  const [showMap, setShowMap] = useState(false);
  const [cooks, setCooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cooks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCooks(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cooks:", err);
        setIsLoading(false);
      });
  }, []);

  const cuisinesList = ["All", "Mexican", "Italian", "Indian", "Vietnamese", "Japanese", "Thai"];
  const dietaryList = ["All", "Vegetarian", "Vegan", "Gluten-Free", "Halal"];

  // Filtering Logic
  const filteredCooks = useMemo(() => {
    return cooks.filter((cook) => {
      // Search Query filter
      const matchesSearch =
        cook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cook.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cook.specialties.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Cuisine filter
      const matchesCuisine =
        selectedCuisine === "All" ||
        cook.cuisines.some((c: string) => c.toLowerCase() === selectedCuisine.toLowerCase());

      // Dietary filter
      const matchesDietary =
        selectedDietary === "All" ||
        cook.dietary.some((d: string) => d.toLowerCase().includes(selectedDietary.toLowerCase()));

      // Price filter
      const matchesPrice = cook.price <= maxPrice;

      return matchesSearch && matchesCuisine && matchesDietary && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "distance") return a.distance - b.distance;
      return 0; // Default: database order (recommended)
    });
  }, [cooks, searchQuery, selectedCuisine, selectedDietary, maxPrice, sortBy]);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        {/* Page Header & Search */}
        <section className="bg-surface border-b border-border-light py-8 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">Find Nearby Home Cooks</h1>
                <p className="text-sm text-text-secondary mt-1">Book home-cooked meals tailored to your taste buds.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="btn btn-outline py-2 px-4 text-xs font-semibold shrink-0"
                >
                  {showMap ? "Hide Map 📍" : "Show Map 📍"}
                </button>
              </div>
            </div>

            {/* Quick search input */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
              <div className="md:col-span-2 bg-bg border border-border rounded-xl px-4 py-2.5 flex items-center gap-3">
                <span className="text-text-tertiary">🔍</span>
                <input
                  type="text"
                  placeholder="Search cook name, specialty dish, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm placeholder:text-text-tertiary"
                />
              </div>
              <div>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full h-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm"
                >
                  <option disabled value="">Select Cuisine</option>
                  {cuisinesList.map((c) => (
                    <option key={c} value={c}>{c === "All" ? "All Cuisines" : c}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-full px-4 py-2.5 rounded-xl border border-border bg-surface outline-none text-sm"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="bg-surface rounded-2xl border border-border-light p-6 shadow-sm h-fit space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">Dietary Preference</h4>
                <div className="space-y-2">
                  {dietaryList.map((d) => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dietary"
                        checked={selectedDietary === d}
                        onChange={() => setSelectedDietary(d)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium text-text-secondary">{d === "All" ? "Any Diet" : d}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-3">Max Price Per Person</h4>
                <div className="flex justify-between text-xs font-semibold text-text-secondary mb-2">
                  <span>₹499</span>
                  <span className="text-primary font-bold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="499"
                  max="3000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="pt-4 border-t border-border-light">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCuisine("All");
                    setSelectedDietary("All");
                    setMaxPrice(2500);
                    setSortBy("recommended");
                  }}
                  className="btn btn-outline w-full btn-sm"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Main Listings */}
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                <p className="text-sm font-medium text-text-secondary">
                  Showing <span className="text-text-primary font-bold">{filteredCooks.length}</span> verified home cooks
                </p>
              </div>

              {/* Grid View */}
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-text-secondary">Connecting to live cloud database...</p>
                </div>
              ) : filteredCooks.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCooks.map((cook) => (
                    <Link
                      key={cook.id}
                      href={`/cook/${cook.id}`}
                      className="card flex flex-col justify-between"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cook.gradient} flex items-center justify-center text-white text-base font-bold shadow-sm shrink-0`}>
                            {cook.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="badge badge-success text-[10px]">Available {cook.available}</span>
                              {cook.rating >= 4.9 && (
                                <span className="badge badge-accent text-[10px] py-0.5 px-2">🏆 Top Rated</span>
                              )}
                            </div>
                            <h3 className="text-base font-bold text-text-primary mt-1.5">{cook.name}</h3>
                            <p className="text-xs text-text-tertiary font-medium">{cook.cuisines.join(" • ")}</p>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0 bg-accent-light rounded-lg px-2 py-0.5">
                            <span className="text-xs font-bold text-[#92400E]">⭐ {cook.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-text-secondary italic mt-3">&quot;{cook.tagline}&quot;</p>

                        <div className="mt-4 flex flex-wrap gap-1">
                          {cook.specialties.map((s: string) => (
                            <span key={s} className="text-[10px] bg-bg text-text-secondary px-2 py-0.5 rounded-md">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-border-light bg-surface-hover flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-primary">₹{cook.price}</span>
                          <span className="text-xs text-text-tertiary"> / person</span>
                        </div>
                        <span className="text-xs font-medium text-text-secondary">📍 {cook.distance} miles away</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-surface rounded-2xl border border-dashed border-border-light p-12 text-center">
                  <span className="text-4xl block mb-2">🥗</span>
                  <h3 className="text-lg font-bold text-text-primary mb-1">No Cooks Found</h3>
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    Try relaxing your filters or searching for something else to discover cooks nearby.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
