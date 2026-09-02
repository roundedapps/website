import { AppStoreBadge } from "@/components/site/AppStoreBadge";

export function StoryCta() {
  return (
    <div className="not-prose mt-12 border-t border-border/30 pt-12 text-center">
      <p className="mb-8 text-lg italic text-muted-foreground">
        That&apos;s the story. Accessbox is on the App Store now — built around
        passwords a human can actually remember.
      </p>
      <AppStoreBadge variant="black" className="mx-auto" />
    </div>
  );
}
