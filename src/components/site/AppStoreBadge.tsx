import Link from "next/link";
import { appConfig } from "@/lib/site";

// Apple's official "Download on the App Store" badge, served live from
// Apple's own badge generator (Apple Media Services). We reference it
// directly rather than hosting a copy so the artwork always matches
// Apple's current guidelines: https://developer.apple.com/app-store/marketing/guidelines/
const BADGE_SRC = {
  black:
    "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-us",
  white:
    "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/white/en-us",
} as const;

export function AppStoreBadge({
  variant = "black",
  className = "",
}: {
  variant?: "black" | "white";
  className?: string;
}) {
  return (
    <Link
      href={appConfig.accessbox.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BADGE_SRC[variant]}
        alt="Download on the App Store"
        className="h-12 w-auto"
      />
    </Link>
  );
}
