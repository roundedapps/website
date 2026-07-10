"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const ease = [0.25, 0.1, 0.25, 1];

export function ReturningUserSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-40 px-6 border-t border-border/30"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center gap-6">
            <Image
              src="/accessbox-original-icon.png"
              alt="Original Accessbox icon (2013)"
              width={72}
              height={72}
              className="rounded-[16px] shadow-md flex-shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              <span className="block">Used the original Accessbox?</span>
              <span className="text-muted-foreground">Welcome back.</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            If you wrote to me last year when the old Accessbox stopped working,
            this is what I built next. It&apos;s a new app — new App Store
            listing, new download — not an update to the original. I made that
            choice on purpose: many of you are still running the 2013 version on
            older phones where it works, and I wasn&apos;t willing to push an
            &ldquo;update&rdquo; that broke things for you again.
          </p>
          <p>
            Your old data lived in iCloud Keychain under a CoreData model that
            iOS 26 no longer supports. We tried to recover it; we couldn&apos;t.
            I&apos;m sorry about that. The new Accessbox starts fresh.
          </p>
          <p>
            The memorable password generator is still here. The card-based vault
            is still here.
          </p>
          <p>Thank you for not forgetting about it.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-10"
        >
          <Button asChild size="lg" className="px-8 py-4">
            <Link href="/testflight">Download Accessbox →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
