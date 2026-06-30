import Link from "next/link";

const footerLinks = {
  platform: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Browse Cooks", href: "/explore" },
    { label: "Cuisines", href: "/#cuisines" },
    { label: "Pricing", href: "/cook/join#calculator" },
  ],
  forCooks: [
    { label: "Become a Cook", href: "/cook/join" },
    { label: "Cook Resources", href: "/cook/join" },
    { label: "Success Stories", href: "/about" },
    { label: "Cook FAQ", href: "/about" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Contact", href: "/about" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/about" },
    { label: "Terms of Service", href: "/about" },
    { label: "Cookie Policy", href: "/about" },
    { label: "Safety", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-2">
                Ready to taste something amazing?
              </h3>
              <p className="text-white/80 text-lg">
                Join thousands who&apos;ve discovered the joy of home-cooked meals by talented local cooks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/signup"
                className="btn btn-lg bg-white text-primary hover:bg-gray-100 font-semibold shadow-lg"
              >
                Find a Cook
              </Link>
              <Link
                href="/cook/join"
                className="btn btn-lg bg-white/15 text-white hover:bg-white/25 border border-white/30"
              >
                Start Cooking
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
                  <path d="M15 2.5c1.5 2.5 2 5.5 1.5 8.5"/>
                  <path d="M9 12c0-3 1.5-6 3-8"/>
                  <path d="M2 12h10"/>
                  <circle cx="18" cy="5" r="3"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-primary">Cook</span>Dash
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Connecting you with talented local cooks who prepare fresh, authentic meals in your kitchen.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {["twitter", "instagram", "facebook", "linkedin"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/cookdash`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-200"
                  aria-label={`Follow us on ${social}`}
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <FooterLinkColumn title="Platform" links={footerLinks.platform} />
          <FooterLinkColumn title="For Cooks" links={footerLinks.forCooks} />
          <FooterLinkColumn title="Company" links={footerLinks.company} />
          <FooterLinkColumn title="Legal" links={footerLinks.legal} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} CookDash, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/50 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}
