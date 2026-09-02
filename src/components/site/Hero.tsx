"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/site";
import Image from "next/image";
import { AppStoreBadge } from "@/components/site/AppStoreBadge";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-black">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Accessbox app showcase"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[100svh] w-full">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0 overflow-hidden rounded-[22px] lg:rounded-[28px] shadow-2xl">
                <Image
                  src="/Accessbox.png"
                  alt="Accessbox"
                  width={200}
                  height={200}
                  className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px]"
                  priority
                />
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                {appConfig.accessbox.name}
              </h1>
            </div>

            <div className="mb-3">
              <span className="text-xl lg:text-2xl text-white/90 font-medium tracking-tight">
              {appConfig.accessbox.tagline}
              </span>
            </div>

            <div className="mb-12">
              <span className="text-lg lg:text-xl text-white/75 font-normal tracking-tight">
              The password manager we built in 2013 — rebuilt from the ground up.
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4"
              >
                <Link href="/accessbox">Explore features</Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm border border-white/20 px-8 py-4"
              >
                <Link href="/story">Read the story →</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6"
            >
              <AppStoreBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
