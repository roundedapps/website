"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Carousel images for section 1
const section1Images = [
  "/section1-1.png",
  "/section1-2.png",
  "/section1-3.png",
];

function Section1Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      const newIndex = (currentIndex + 1) % section1Images.length;
      setNextIndex(newIndex);

      setTimeout(() => {
        setCurrentIndex(newIndex);
        setNextIndex((newIndex + 1) % section1Images.length);
        setIsTransitioning(false);
      }, 1200);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-background to-muted/40">
      {/* Base layer - current image */}
      <Image
        src={section1Images[currentIndex]}
        alt={`Feature showcase ${currentIndex + 1}`}
        fill
        className="object-cover object-center"
      />

      {/* Crossfade layer - next image */}
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
              src={section1Images[nextIndex]}
              alt={`Feature showcase ${nextIndex + 1}`}
              fill
              className="object-cover object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual section components with isolated scroll tracking
function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-6 py-32 lg:py-48 bg-background">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text content - left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:max-w-lg"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
              Strong passwords,
              <span className="text-muted-foreground"> usable by humans</span>
            </h2>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Reusing passwords <b>is a bad idea</b>, that's why we use password managers.
            They're great at creating long, complex passwords that are nearly impossible to guess, and just as hard to remember.
            </p>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            They work best when autofill is available.<br/>
    <b>Accessbox is designed for the moments when you need more than autofill.</b>
            </p>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            We help you create <b>strong, memorable passwords</b> you can actually use — without compromising security.
            Your data stays encrypted on your device. We can’t see it, access it, or read it. Even if you ask.</p>
          </motion.div>

          {/* Carousel - right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <Section1Carousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EncryptionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-6 py-32 lg:py-48 bg-muted/50">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text content - left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:max-w-lg"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
              Security you don't have to think about.
            </h2>
            
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              Accessbox protects your data using Apple's Keychain and end-to-end encryption.
            </p>
            
            <p className="mt-6 text-lg text-muted-foreground/70 leading-relaxed">
              Your passwords are encrypted on-device with AES-256 and are never accessible to us.
            </p>
            
            <p className="mt-10 text-sm text-muted-foreground/50 tracking-wide">
              Built on the same security technologies used by Apple system apps.
            </p>
          </motion.div>
          
          {/* Visual placeholder - right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-square lg:aspect-[4/3] bg-gradient-to-br from-background to-muted/40 rounded-3xl flex items-center justify-center"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BiometricSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32 lg:py-48 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
          Just you.
          <br />
          Nothing else.
        </h2>
        
        <p className="mt-10 text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          Face ID or Touch ID unlocks your vault instantly.
        </p>
        
        <p className="mt-6 text-lg text-muted-foreground/70">
          No master password. No PINs to remember.
        </p>
        
        <p className="mt-4 text-lg text-muted-foreground/70">
          Your biometrics are the key.
        </p>
      </motion.div>
    </section>
  );
}

function EcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-6 py-32 lg:py-48 bg-muted/50">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual placeholder - left side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-square lg:aspect-[4/3] bg-gradient-to-br from-background to-muted/40 rounded-3xl flex items-center justify-center order-2 lg:order-1"
          >
            {/* Device silhouettes */}
            <div className="flex items-end gap-4">
              <div className="w-8 h-16 rounded-lg bg-muted/50" />
              <div className="w-14 h-20 rounded-xl bg-muted/60" />
              <div className="w-20 h-14 rounded-lg bg-muted/50" />
            </div>
          </motion.div>
          
          {/* Text content - right aligned */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:max-w-lg order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
              Works seamlessly across your Apple devices.
            </h2>
            
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              Your encrypted vault syncs securely across iPhone, iPad, and Mac using iCloud.
            </p>
            
            <p className="mt-6 text-lg text-muted-foreground/70">
              Always protected by your biometrics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SmartDesignSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative py-32 lg:py-48 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24 lg:mb-32"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Smart by design.
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              Smart password generation
            </h3>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Generate strong, memorable passphrases tailored to real-world password requirements.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              Ready for a passwordless future
            </h3>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Accessbox supports modern authentication standards, including passkeys.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DesignPhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 lg:py-48 bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
          Security,
          <br />
          <span className="text-muted-foreground">beautifully designed.</span>
        </h2>
        
        <p className="mt-10 text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Thoughtful animations. Clear layouts. A calm, focused experience built around trust.
        </p>
      </motion.div>
    </section>
  );
}

export function Features() {
  return (
    <div id="features" className="relative">
      <SecuritySection />
      <EncryptionSection />
      <BiometricSection />
      <EcosystemSection />
      <SmartDesignSection />
      <DesignPhilosophySection />
    </div>
  );
}
