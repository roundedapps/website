"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutTribute() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const appsRef = useRef(null);
  const appsInView = useInView(appsRef, { once: true, margin: "-15%" });

  return (
    <>
      {/* Philosophy Section */}
      <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32 lg:py-48">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              Quality apps
              <br />
              <span className="text-muted-foreground">made with care</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed text-center">
              At Roundedapps, we believe software should be{" "}
              <span className="text-foreground">thoughtfully crafted</span>, not mass-produced.
            </p>
            
            <p className="text-lg text-muted-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
              Every pixel, every interaction, every line of code is considered with care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 lg:mt-24"
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              We don't chase trends or ship features for the sake of it. We take our time to build{" "}
              <span className="text-foreground">tools that respect your attention</span>{" "}
              and stand the test of time.
            </p>
            
            <p className="mt-8 text-base text-muted-foreground/60 text-center">
              Small team, big ambitions, relentless attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apps Update Section */}
      <section ref={appsRef} className="relative py-32 lg:py-48 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Looking for our previous apps?
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              After a pause, we're returning with{" "}
              <span className="text-foreground">renewed focus and clarity</span>.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12"
          >
            <p className="text-lg text-muted-foreground">
              <span className="text-foreground font-medium">Accessbox</span> is our first rewrite—built from the ground up using modern technologies and a fresh perspective.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 pt-16 border-t border-border/30"
          >
            <p className="text-base text-muted-foreground/70 italic">
              Updates to our beloved{" "}
              <span className="text-muted-foreground font-medium not-italic">ConvertMe</span> and{" "}
              <span className="text-muted-foreground font-medium not-italic">RememberTheOil</span>{" "}
              are next.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
