import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/10">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold tracking-tight">{siteConfig.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground/70">
              Made with care in {siteConfig.location}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-start sm:gap-20">
            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-medium tracking-tight">Support</h4>
              <Link
                href={`mailto:${siteConfig.supportEmail}`}
                className="mt-3 block text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {siteConfig.supportEmail}
              </Link>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-medium tracking-tight">Legal</h4>
              <ul className="mt-3 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
