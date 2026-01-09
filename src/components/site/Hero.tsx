"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/site";
import Image from "next/image";

// Carousel images - replace these with your actual image paths
const carouselImages = [
  "/hero.png",
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      const newIndex = (currentIndex + 1) % carouselImages.length;
      setNextIndex(newIndex);

      // After transition completes, update current index
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setNextIndex((newIndex + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 1200); // Match transition duration
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - current image */}
      <Image
        src={carouselImages[currentIndex]}
        alt={`Accessbox feature ${currentIndex + 1}`}
        fill
        className="object-cover object-center"
        priority
      />

      {/* Crossfade layer - next image fades in */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`transition-${nextIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[nextIndex]}
              alt={`Accessbox feature ${nextIndex + 1}`}
              fill
              className="object-cover object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refined overlay for elegant text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Strong bottom gradient for maximum text readability */}
      {/*<div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white/95 via-white/20 via-white/10 to-transparent" />
    */}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-black">
      {/* Image Carousel Background */}
      <ImageCarousel />

      {/* Content positioned on left side */}
      <div className="relative z-10 flex items-center min-h-[100svh] w-full">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            {/* Introducing */}
            <div className="mb-2">
              <span
                className="text-xl lg:text-2xl text-black/90 font-medium tracking-tight"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
              >
                Introducing
              </span>
            </div>

            {/* Logo + App Name on same line */}
            <div className="flex items-center gap-6 mb-2">
              <div
                className="flex-shrink-0 overflow-hidden rounded-[22px] lg:rounded-[28px]"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3))' }}
              >
                <Image
                  src="/Accessbox.png"
                  alt="Accessbox"
                  width={200}
                  height={200}
                  className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px]"
                  priority
                />
              </div>
              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-black leading-tight"
                style={{ textShadow: '0 2px 16px rgba(0, 0, 0, 0.4)' }}
              >
                {appConfig.accessbox.name}
              </h1>
            </div>

            {/* Tagline */}
            <div className="mb-12">
              <span
                className="text-xl lg:text-2xl text-black/90 font-medium tracking-tight"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
              >
                {appConfig.accessbox.tagline}
              </span>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-black/90 px-8 py-4"
              >
                <Link href="#features">Learn more</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-4"
              >
                <Link
                  href={appConfig.accessbox.testFlightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join TestFlight
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
