"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/site";
import Image from "next/image";

// Carousel images - replace these with your actual image paths
const carouselImages = [
  "/accessbox-hero-1.png", // Add your first carousel image here
  "/accessbox-hero-2.png", // Add your first carousel image here
  "/accessbox-hero-3.png", // Add your first carousel image here
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={carouselImages[currentIndex]}
            alt={`Accessbox feature ${currentIndex + 1}`}
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pt-16">
      {/* Image Carousel Background */}
      <ImageCarousel />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Now in Beta
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ textShadow: '0 0 8px rgba(0, 0, 0, 0.9)' }}
        >
          <span className="text-white">Introducing: </span>
          <span className="text-white">
            {appConfig.accessbox.name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-xl text-white/80 sm:text-2xl"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
        >
          {appConfig.accessbox.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link
              href={appConfig.accessbox.testFlightUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join TestFlight
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn more</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}


