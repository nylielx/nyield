/**
 * =============================================================================
 * FOOTER — Site-wide footer with links and branding
 * =============================================================================
 *
 * ROLE:
 * Provides navigation, legal links, and brand reinforcement at the bottom
 * of every page. Footers are expected by users and important for SEO
 * (search engines use footer links to understand site structure).
 *
 * ARCHITECTURE NOTE:
 * In a multi-page app, the footer would live in a Layout component that
 * wraps all pages. For a single-page landing, it's placed directly on Index.
 * =============================================================================
 */

import { Link } from "react-router-dom";
const footerLinks = {
  Services: [
    { label: "Competitive OS", href: "/services" },
    { label: "Balanced OS", href: "/services" },
    { label: "Education OS", href: "/services" },
    { label: "Gaming PCs", href: "/builds" },
    { label: "Marketplace", href: "/marketplace" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Gift nYield", href: "/gift" },
    { label: "Affiliate", href: "/earn" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Support Hub", href: "/support" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const SiteFooter = () => {
  return (
    <footer className="py-16 border-t border-border/30 glass-base">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              n<span className="text-primary">Yield</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlocking PC performance for gamers and students.
              Custom OS. Pre-built PCs. Verified marketplace.
            </p>
          </div>

          {/* Link columns — dynamically rendered from the footerLinks object */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") || link.href.startsWith("/#") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} nYield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
