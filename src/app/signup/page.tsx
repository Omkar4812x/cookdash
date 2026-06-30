"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F5] via-bg to-[#F0FDF4] pt-20 pb-12 px-4">
        {/* Decorative blobs */}
        <div className="fixed top-20 right-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 left-[10%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
                  <path d="M15 2.5c1.5 2.5 2 5.5 1.5 8.5"/>
                  <path d="M9 12c0-3 1.5-6 3-8"/>
                  <path d="M2 12h10"/>
                  <circle cx="18" cy="5" r="3"/>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">Cook</span>Dash
              </span>
            </Link>
            <h1 className="text-2xl font-bold font-display mb-1">Create your account</h1>
            <p className="text-text-secondary text-sm">
              Join thousands who&apos;ve discovered home-cooked meals by local cooks.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-surface rounded-3xl shadow-xl border border-border-light p-8">
            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button onClick={() => { sessionStorage.setItem("isLoggedIn", "true"); router.push("/dashboard"); }} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors font-medium text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button onClick={() => { sessionStorage.setItem("isLoggedIn", "true"); router.push("/dashboard"); }} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors font-medium text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-tertiary font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-first-name" className="block text-sm font-medium text-text-primary mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="signup-first-name"
                    placeholder="Sarah"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-last-name" className="block text-sm font-medium text-text-primary mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="signup-last-name"
                    placeholder="Mitchell"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-text-primary mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="sarah@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-text-primary mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-text-tertiary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  required
                />
                <p className="text-xs text-text-tertiary mt-1.5">At least 8 characters with a number and symbol</p>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" id="signup-terms" className="mt-0.5 rounded accent-primary" required />
                <label htmlFor="signup-terms" className="text-xs text-text-secondary leading-relaxed">
                  I agree to the <Link href="/about" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                  <Link href="/about" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full py-3 text-sm mt-2 text-center">
                Create Account
              </button>
            </form>
          </div>

          {/* Switch to login */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>

          {/* Cook Sign-up */}
          <div className="mt-6 p-4 rounded-2xl border border-dashed border-border bg-surface/50 text-center">
            <p className="text-sm text-text-secondary">
              Want to cook instead?{" "}
              <Link href="/cook/join" className="text-primary font-semibold hover:underline">
                Apply as a Cook →
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
