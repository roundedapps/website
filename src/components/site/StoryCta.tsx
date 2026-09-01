import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/site";

export function StoryCta() {
  return (
    <div className="not-prose mt-12 border-t border-border/30 pt-12 text-center">
      <p className="mb-8 text-lg italic text-muted-foreground">
        That&apos;s the story. Accessbox is on the App Store now — built around
        passwords a human can actually remember.
      </p>
      <Button asChild size="lg">
        <Link
          href={appConfig.accessbox.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Accessbox
        </Link>
      </Button>
    </div>
  );
}
