"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Fingerprint, CloudOff, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "Your passwords are encrypted with AES-256, the same standard used by governments worldwide.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Unlock",
    description:
      "Access your vault instantly with Face ID or Touch ID. No master password to remember.",
  },
  {
    icon: CloudOff,
    title: "Offline First",
    description:
      "Your data lives on your device. No servers, no cloud, no compromise. Complete privacy.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Design",
    description:
      "A beautiful interface that gets out of your way. Password management that feels natural.",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="relative overflow-hidden px-6 py-32"
      ref={ref}
    >
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Designed for simplicity
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Every feature exists because it makes your life easier. Nothing
            more, nothing less.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="group relative rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80"
    >
      {/* Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        {feature.description}
      </p>

      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}


