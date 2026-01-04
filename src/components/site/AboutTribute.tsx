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

        {/* Apps Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Looking for our previous apps?
          </h3>
          <p className="text-muted-foreground">
            After a pause, we&apos;re returning with{" "}
            <span className="text-foreground">renewed focus and clarity</span>.
          </p>
          <p className="text-muted-foreground mt-4">
            <span className="text-foreground font-medium">Accessbox</span> is our first rewrite—built from the ground up using modern technologies and a fresh perspective.
          </p>
          <p className="text-muted-foreground mt-4 italic">
            Updates to our beloved{" "}
            <span className="text-foreground font-medium">ConvertMe</span> and{" "}
            <span className="text-foreground font-medium">RememberTheOil</span>{" "}
            are next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}




