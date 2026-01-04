"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Fingerprint,
  CloudOff,
  Sparkles,
  EyeOff,
  Apple,
  Cloud,
  Key,
  Palette,
  Search
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Encryption",
    description:
      "Your passwords are protected with AES-256 encryption - the same unbreakable standard used by governments and banks worldwide. Every password is encrypted before storage.",
  },
  {
    icon: EyeOff,
    title: "Zero-Knowledge Security",
    description:
      "We have zero access to your passwords. Your data is stored securely on your device and syncs through iCloud with end-to-end encryption - we cannot read or access your passwords.",
  },
  {
    icon: Apple,
    title: "Apple's Security Foundation",
    description:
      "Built on Apple's trusted security technologies including iOS Keychain for encrypted storage and secure data persistence. Your vault uses the same proven systems that protect your banking apps and personal information.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description:
      "Every password is locked behind your biometric authentication. Face ID or Touch ID is required to reveal each password - your face or fingerprint is the key to your vault. No master password, no PIN - just you.",
  },
  {
    icon: Cloud,
    title: "Cross-Device Sync",
    description:
      "Your encrypted vault syncs securely across all your Apple devices using iCloud. Access your passwords on iPhone, iPad, and Mac with the same iCloud account - all protected by your biometrics.",
  },
  {
    icon: CloudOff,
    title: "Offline Access",
    description:
      "Works completely offline. Generate and access passwords without an internet connection. Your data stays secure on your device when you need it most.",
  },
  {
    icon: Sparkles,
    title: "Smart Password Generation",
    description:
      "Strong passwords are crucial for security, but who wants passwords that are impossible to type or remember? Accessbox generates secure passwords that sound like natural phrases - easy to remember, easy to type, but impossible for hackers to guess.",
  },
  {
    icon: Key,
    title: "Passkey Ready",
    description:
      "The future of authentication is passkeys - passwordless login that's more secure and convenient than traditional passwords. While we've worked hard to make passwords easier to use, we're ready for the passkey revolution with full support built-in.",
  },
  {
    icon: Palette,
    title: "Delightful Visual Design",
    description:
      "Each account gets its own beautiful card with the website's icon automatically fetched and colors that perfectly match. A visual interface that makes password management feel natural and even enjoyable.",
  },
  {
    icon: Search,
    title: "Advanced Organization",
    description:
      "Tag, search, and organize your passwords with flexible categories. Find what you need instantly with smart search and visual organization.",
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
            Security that works for humans
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Strong security shouldn't mean complicated interfaces. Accessbox combines
            military-grade protection with thoughtful design that gets out of your way.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
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



