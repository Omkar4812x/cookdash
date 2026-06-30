"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-primary transition-shadow duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
                <path d="M15 2.5c1.5 2.5 2 5.5 1.5 8.5"/>
                <path d="M9 12c0-3 1.5-6 3-8"/>
                <path d="M2 12h10"/>
                <circle cx="18" cy="5" r="3"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary">Cook</span>
              <span className={scrolled ? "text-text-primary" : "text-text-primary"}>Dash</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#cuisines">Cuisines</NavLink>
            <NavLink href="#featured">Featured Cooks</NavLink>
            <NavLink href="#testimonials">Reviews</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="btn btn-ghost text-sm"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="btn btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-hover transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-surface shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-xl hover:bg-surface-hover flex items-center justify-center transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <MobileNavLink href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</MobileNavLink>
            <MobileNavLink href="#cuisines" onClick={() => setMobileOpen(false)}>Cuisines</MobileNavLink>
            <MobileNavLink href="#featured" onClick={() => setMobileOpen(false)}>Featured Cooks</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setMobileOpen(false)}>Reviews</MobileNavLink>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Link href="/cook/join" className="btn btn-outline w-full" onClick={() => setMobileOpen(false)}>
              Become a Cook
            </Link>
            <Link href="/login" className="btn btn-ghost w-full" onClick={() => setMobileOpen(false)}>
              Log In
            </Link>
            <Link href="/signup" className="btn btn-primary w-full" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary rounded-lg hover:bg-primary-50 transition-all duration-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 text-base font-medium text-text-primary hover:text-primary rounded-xl hover:bg-primary-50 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
