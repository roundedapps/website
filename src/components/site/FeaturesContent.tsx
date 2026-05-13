"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { TechnicalDetails } from "@/components/ui/technical-details";
import { appConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import {
  Smartphone,
  Monitor,
  KeyRound,
  ShieldCheck,
  Fingerprint,
  Lock,
  Eye,
  QrCode,
  Palette,
  ImageIcon,
  Tags,
  Search,
  HardDrive,
  RefreshCw,
  Globe,
  Heart,
  Share2,
} from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

// ---------------------------------------------------------------------------
// Shared layout helpers
// ---------------------------------------------------------------------------

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />;
}

function FullSection({
  children,
  alt,
}: {
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      className={`relative px-6 py-32 lg:py-44 ${alt ? "bg-muted/30" : "bg-background"}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function FeaturesHero() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/new.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  return (
    <section className="relative flex items-center justify-center px-6 pt-40 pb-32 lg:pt-52 lg:pb-44 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-3xl text-center flex flex-col items-center"
      >
        <div className="relative flex items-center justify-center h-[120px] w-[120px] lg:h-[150px] lg:w-[150px] rounded-full bg-black shadow-lg">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              className="h-[110px] w-[110px] lg:h-[138px] lg:w-[138px]"
            />
          )}
        </div>

        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
          {appConfig.accessbox.name}
        </h1>

        <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-muted-foreground">
          Security, beautifully designed.
        </p>

        <p className="mt-8 text-xl sm:text-2xl text-muted-foreground/70 leading-relaxed max-w-2xl">
        A simpler, safer way to store passwords, passkeys, and two-factor codes — across your iPhone and Mac.
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// At a glance — highlights grid
// ---------------------------------------------------------------------------

const highlights = [
  {
    icon: KeyRound,
    title: "Passwords",
    description: "Strong, memorable passwords you can actually read and type, designed for when autofill isn\u2019t available.",
  },
  {
    icon: Fingerprint,
    title: "Passkeys",
    description: "Sign in with Face ID or Touch ID instead of typing a password.",
  },
  {
    icon: QrCode,
    title: "Two-factor codes",
    description: "Built-in authenticator with live codes. Scan a QR code and you\u2019re set.",
  },
  {
    icon: Smartphone,
    title: "Universal",
    description: "Real iPhone and Mac apps, designed to feel at home on each device.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted backups",
    description: "Export your vault as an encrypted file. Restore anytime, with merge support.",
  },
  {
    icon: Share2,
    title: "Nearby Share",
    description: "Send cards directly to a nearby device. No internet needed.",
  },
  {
    icon: HardDrive,
    title: "Auto-backup",
    description: "Automatically save encrypted backups to a location you choose.",
  },
  {
    icon: ImageIcon,
    title: "Smart icons",
    description: "Icons fetched automatically for your accounts, or pick from thousands of symbols.",
  },
];

function IPhoneVideo({ isInView }: { isInView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease }}
      className="relative aspect-[500/1088] rounded-3xl overflow-hidden bg-neutral-900 ring-8 ring-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/iphone_demo_compressed.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

function HighlightsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            At a glance.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
              className="group rounded-2xl border border-border/40 bg-background/80 p-6 transition-all duration-200 hover:border-border hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <item.icon
                  className="h-5 w-5 text-muted-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 1. Platforms
// ---------------------------------------------------------------------------

function PlatformsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="platforms" />
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="lg:max-w-lg"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
            Made for iPhone and Mac.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Accessbox is designed separately for iPhone and Mac, so it feels natural on both — but your vault works as one. Create a password, passkey, or verification code on your iPhone, and it&apos;s ready to AutoFill on your Mac. Save something on your Mac, and it&apos;s there when you need it on your phone.
          </p>

          <p className="mt-6 text-base text-muted-foreground/60">
            iCloud keeps everything in sync, encrypted end-to-end.
          </p>

          <TechnicalDetails>
            <p>100% native Apple frameworks.</p>
            <p>AutoFill via the system Credential Provider extension on iOS and macOS.</p>
          </TechnicalDetails>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/60 to-muted/20 flex items-center justify-center"
        >
          <Image
            src="/native_apps.png"
            alt="Accessbox on iPhone and Mac"
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 2. Security
// ---------------------------------------------------------------------------

function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="security" />
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Your data stays yours.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Everything is encrypted on your device before it goes anywhere. We
            never see your passwords, and we couldn&apos;t read them even if we
            tried.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Fingerprint,
              title: "Biometric unlock",
              desc: "Unlock with Face ID, Touch ID, or your device passcode. No separate master password to remember.",
            },
            {
              icon: Lock,
              title: "On-device encryption",
              desc: "Your passwords and sensitive data are encrypted right on your device, before syncing anywhere.",
            },
            {
              icon: Eye,
              title: "Auto-lock",
              desc: "Your vault locks the moment you leave the app. A blur overlay protects content in the app switcher.",
            },
            {
              icon: ShieldCheck,
              title: "Encrypted backups",
              desc: "Export your vault as an encrypted file with a password you choose. Only you can open it.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + 0.1 * i, ease }}
            >
              <item.icon
                className="h-7 w-7 text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <TechnicalDetails>
            <p>Passwords stored in Apple Keychain. Sensitive fields encrypted on-device with AES-256-GCM.</p>
            <p>Encryption key stored in iCloud Keychain — syncs securely across devices without ever leaving Apple&apos;s ecosystem.</p>
            <p>Encrypted backups use PBKDF2 key derivation + AES-GCM with a user-chosen password.</p>
            <p>Built on the same security technologies used by Apple system apps: CryptoKit and Keychain Services.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 3. Smart Password Generation
// ---------------------------------------------------------------------------

function PasswordGenSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="passwords" />
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/60 to-muted/20 flex items-center justify-center order-2 lg:order-1"
        >
          <Image
            src="/easy_passwords.png"
            alt="Smart password generation"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="lg:max-w-lg order-1 lg:order-2"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
            Passwords you can actually remember.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
          Accessbox can create strong passwords that are easier to read, type, and remember — especially when AutoFill is not available.
          </p>

          <ul className="mt-8 space-y-3 text-base text-muted-foreground">
            <li>Choose between memorable, stronger, or fully random passwords</li>
            <li>A memorable hint stored with every password, so you can always regenerate it</li>
            <li>Generate passwords using several languages</li>
            <li>Adjust the settings and Accessbox creates a new password that fits.</li>
          </ul>

          <TechnicalDetails>
            <p>Passphrases generated from curated word lists.</p>
            <p>Tunable rules: min length, uppercase, lowercase, numbers, symbols, no repeating or sequential characters.</p>
            <p>Hint-based regeneration: a secure hint is stored alongside each password for deterministic re-generation.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 4. Passkeys
// ---------------------------------------------------------------------------

function PasskeysSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="passkeys" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Ready for a<br />
            <span className="text-muted-foreground">passwordless future.</span>
          </h2>

          <p className="mt-10 text-xl sm:text-2xl text-muted-foreground leading-relaxed">
          Passkeys let you sign in with Face ID or Touch ID instead of typing a password. Accessbox stores them alongside your other credentials and fills them when you need them.
          </p>

          <p className="mt-6 text-lg text-muted-foreground/70">
          For accounts that no longer use passwords, you can save a card with just the passkey.
          </p>

          <TechnicalDetails>
            <p>Accessbox supports modern passkeys and works with Apple&apos;s AutoFill system, so passkeys appear where you expect them.</p>
            <p>AutoFill integration through the ASCredentialProviderViewController extension.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 5. Two-Factor Authentication
// ---------------------------------------------------------------------------

function TOTPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="totp" />
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="lg:max-w-lg"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
            Two-factor codes, built right in.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            No need for a separate authenticator app. Accessbox stores your
            two-factor setup and shows live codes with a countdown timer.
          </p>

          <ul className="mt-8 space-y-3 text-base text-muted-foreground">
            <li>Scan a QR code on iPhone, or enter the secret manually on any device</li>
            <li>Codes autofill when the system asks for a verification code</li>
            <li>Included in encrypted backups and card sharing, so your codes stay with the account</li>
          </ul>

          <TechnicalDetails>
            <p>TOTP implementation per RFC 6238. Supports SHA-1, SHA-256, SHA-512 hash algorithms.</p>
            <p>Configurable digits (6 or 8) and refresh period.</p>
            <p>AutoFill via the system one-time code suggestion API.</p>
          </TechnicalDetails>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/60 to-muted/20 flex items-center justify-center"
        >
          <Image
            src="/verification_codes.png"
            alt="Two-factor authentication codes"
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 6. Card Organization
// ---------------------------------------------------------------------------

function CardOrgSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const cardTypes = [
    "Website",
    "Email",
    "Wireless",
    "VPN",
    "Server",
    "Database",
    "Software",
    "FTP",
    "Password",
  ];

  return (
    <FullSection>
      <SectionAnchor id="cards" />
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            A card for every kind of account.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
          Save different kinds of accounts with fields that actually fit — websites, email, Wi‑Fi, servers, databases, software licenses, and more. No more stuffing everything into a generic &ldquo;login&rdquo; entry.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {cardTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-border/50 bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {type}
            </span>
          ))}
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Palette,
              title: "Custom colors",
              desc: "Pick from a curated palette, use auto-color from the icon, or choose any color you like.",
            },
            {
              icon: ImageIcon,
              title: "Smart icons",
              desc: "Icons fetched automatically for your accounts. Or pick from SF Symbols, photos, or files.",
            },
            {
              icon: Tags,
              title: "Tags",
              desc: "Organize cards with tags and find them instantly.",
            },
            {
              icon: Search,
              title: "Full-text search",
              desc: "Search across titles, usernames, URLs, and tags — results appear as you type.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * i, ease }}
            >
              <item.icon
                className="h-7 w-7 text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 7. iOS Experience
// ---------------------------------------------------------------------------

function IOSSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="ios" />
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <div className="w-[60%]">
            <IPhoneVideo isInView={isInView} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="lg:max-w-lg order-1 lg:order-2"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
            Designed for iPhone.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Your cards stack and fan out like Apple Wallet. Tap to expand, drag
            to resize. It feels natural because it follows patterns you already
            know.
          </p>

          <ul className="mt-8 space-y-3 text-base text-muted-foreground">
            <li>Search your whole vault from one full-screen view</li>
            <li>Send cards to a nearby device without using the internet</li>
            <li>Share individual cards as encrypted, password-protected files</li>
          </ul>

          <TechnicalDetails>
            <p>Wallet-inspired card stack built with SwiftUI gesture composition and matched geometry effects.</p>
            <p>Nearby Share uses ECDH key exchange over MultipeerConnectivity for peer-to-peer encrypted transfer.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 8. Mac Experience
// ---------------------------------------------------------------------------

function MacSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="mac" />
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="lg:max-w-lg"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
            A real Mac app.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
          Not a stretched-out iPhone app. Accessbox gives your synced vault a proper home on Mac, with a familiar layout, keyboard shortcuts, and AutoFill for your passwords, passkeys, and verification codes. Add something on iPhone, use it on Mac, and securely share a card when someone else needs access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/macOs.png"
            alt="Accessbox on Mac"
            fill
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 9. Backup & Restore
// ---------------------------------------------------------------------------

function BackupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="backup" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Your vault,
            <br />
            <span className="text-muted-foreground">always safe.</span>
          </h2>

          <p className="mt-10 text-xl text-muted-foreground leading-relaxed">
            Export your entire vault as an encrypted file anytime. Or let
            Accessbox back up automatically in the background.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: HardDrive,
              title: "Manual export",
              desc: "Export your vault with a password you choose. Store it anywhere you trust.",
            },
            {
              icon: RefreshCw,
              title: "Restore with merge",
              desc: "Preview a backup before restoring it. Accessbox helps avoid duplicates automatically.",
            },
            {
              icon: ShieldCheck,
              title: "Auto-backup",
              desc: "Optionally backs up when the app goes to background, to a location you pick.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + 0.1 * i, ease }}
            >
              <item.icon
                className="h-7 w-7 text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="text-left max-w-lg mx-auto"
        >
          <TechnicalDetails>
            <p>Backup files encrypted with PBKDF2 key derivation + AES-GCM.</p>
            <p>Restore includes duplicate detection by comparing card identifiers and content hashes.</p>
            <p>Optional &ldquo;backup password card&rdquo; stores the backup password in your vault for safekeeping.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 10. Localization
// ---------------------------------------------------------------------------

function LocalizationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="localization" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <Globe className="h-10 w-10 text-muted-foreground/40 mx-auto" strokeWidth={1.5} />

          <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15]">
            English and Spanish.
          </h2>

          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            The entire app is localized in both languages — every screen, every
            label, every message.
          </p>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 11. Design Philosophy
// ---------------------------------------------------------------------------

function DesignPhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="design" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <Heart className="h-10 w-10 text-muted-foreground/40 mx-auto" strokeWidth={1.5} />

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Calm, minimal,
            <br />
            <span className="text-muted-foreground">intentional.</span>
          </h2>

          <p className="mt-10 text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Your credentials are visual objects — not rows in a table. Every
            animation, color, and interaction is there for a reason.
          </p>

          <p className="mt-6 text-lg text-muted-foreground/60">
            No visual noise. Just a focused, trustworthy experience that follows
            Apple&apos;s Human Interface Guidelines.
          </p>

          <TechnicalDetails>
            <p>Design inspired by Apple Wallet, Settings, and Shortcuts patterns.</p>
            <p>100% SwiftUI. No UIKit wrappers, no web views, no Electron.</p>
            <p>Built with SwiftData for persistence, CloudKit for sync, CryptoKit for encryption.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

function BottomCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-44 px-6 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
          Try {appConfig.accessbox.name} today.
        </h2>

        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
          Available on TestFlight for iPhone and Mac.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4"
          >
            <Link
              href={appConfig.accessbox.testFlightUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join TestFlight
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function FeaturesContent() {
  return (
    <div className="relative">
      <FeaturesHero />
      <HighlightsGrid />
      <PlatformsSection />
      <SecuritySection />
      <PasswordGenSection />
      <PasskeysSection />
      <TOTPSection />
      <CardOrgSection />
      <IOSSection />
      <MacSection />
      <BackupSection />
      <LocalizationSection />
      <DesignPhilosophySection />
      <BottomCTA />
    </div>
  );
}
