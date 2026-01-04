"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutTribute() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden px-6 py-32" ref={ref}>
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quality apps made with care
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground"
        >
          <p>
            At Roundedapps, we believe software should be{" "}
            <span className="text-foreground">thoughtfully crafted</span>, not
            mass-produced. Every pixel, every interaction, every line of code is
            considered with care.
          </p>
          <p>
            We don&apos;t chase trends or ship features for the sake of it. We
            take our time to build{" "}
            <span className="text-foreground">
              tools that respect your attention
            </span>{" "}
            and stand the test of time. Small team, big ambitions, relentless
            attention to detail.
          </p>
        </motion.div>

        {/* Tribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm"
        >
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            A tribute to our past
          </h3>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Some apps never leave us, even when they&apos;ve retired. We look
              back fondly at the apps that started this journey:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                <span>
                  <span className="font-medium text-foreground">ConvertMe</span>{" "}
                  — Our first step into the App Store. A unit converter that
                  taught us the art of simplicity. Now resting peacefully.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                <span>
                  <span className="font-medium text-foreground">
                    RememberTheOil
                  </span>{" "}
                  — A humble car maintenance tracker that found its way into
                  thousands of glove compartments. Legacy mode, but still loved.
                </span>
              </li>
            </ul>
            <p className="pt-2 italic">
              These apps shaped who we are. Accessbox carries their spirit
              forward — with the same dedication to craftsmanship, refined by
              years of learning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


