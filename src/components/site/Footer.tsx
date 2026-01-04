import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Made with care in {siteConfig.location}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-16">
            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-medium">Support</h4>
              <Link
                href={`mailto:${siteConfig.supportEmail}`}
                className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {siteConfig.supportEmail}
              </Link>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="mt-2 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}




