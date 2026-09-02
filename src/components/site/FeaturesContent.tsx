"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { TechnicalDetails } from "@/components/ui/technical-details";
import { appConfig } from "@/lib/site";
import { AppStoreBadge } from "@/components/site/AppStoreBadge";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import {
  Smartphone,
  KeyRound,
  ShieldCheck,
  Fingerprint,
  Lock,
  Eye,
  Palette,
  ImageIcon,
  Tags,
  Search,
  RefreshCw,
  ShieldAlert,
  Wand2,
  Users,
  UserPlus,
  VideoOff,
  Radio,
  Wallet,
  Sparkles,
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
          The password manager built for iPhone, iPad, and Mac. Passwords, passkeys, two&#8209;factor codes, breach protection, and family sharing — all encrypted on your device, all native to Apple.
        </p>

        <div className="mt-10">
          <AppStoreBadge variant="black" />
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// At a glance — highlights grid
// ---------------------------------------------------------------------------

const highlights = [
  {
    icon: ShieldAlert,
    title: "Breach alerts & guided fix",
    description: "Get warned when a stored password has been exposed — then walk through replacing it safely.",
  },
  {
    icon: KeyRound,
    title: "Memorable passwords",
    description: "Strong passwords that are easier to read, type, and recall — with hints for regeneration.",
  },
  {
    icon: Users,
    title: "Family Sharing ceremony",
    description: "Share chosen cards with trusted people, set up in person over an encrypted local connection.",
  },
  {
    icon: Wallet,
    title: "Every credential type",
    description: "Websites, email, Wi‑Fi, passkeys, two‑factor codes, and more — organized in one vault.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted backups",
    description: "Export your vault as an encrypted file. Restore anytime, with merge support.",
  },
  {
    icon: Smartphone,
    title: "Native iPhone, iPad & Mac",
    description: "Real apps designed separately for each device. Your vault stays in sync across all of them.",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            Made for iPhone, iPad, and Mac.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Accessbox is designed separately for iPhone, iPad, and Mac, so it feels natural on each — but your vault works as one. Create a password, passkey, or verification code on your iPhone, and it&apos;s ready to AutoFill on your iPad and Mac. Save something on your Mac, and it&apos;s there when you need it on your phone.
          </p>

          <p className="mt-6 text-base text-muted-foreground/60">
            iCloud keeps everything in sync, encrypted end-to-end.
          </p>

          <TechnicalDetails>
            <p>100% native Apple frameworks.</p>
            <p>AutoFill via the system Credential Provider extension on iOS, iPadOS, and macOS.</p>
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
// 2. Breach Detection
// ---------------------------------------------------------------------------

function BreachDetectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="breach" />
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mx-auto text-center"
        >
          <ShieldAlert
            className="h-10 w-10 text-muted-foreground/40 mx-auto"
            strokeWidth={1.5}
          />

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            We warn you.
            <br />
            <span className="text-muted-foreground">Then we help you fix it.</span>
          </h2>

          <p className="mt-10 text-xl text-muted-foreground leading-relaxed">
            Most security tools tell you when something is wrong and leave the rest to you. Accessbox warns you <em>and</em> walks you through the fix.
          </p>

          <p className="mt-6 text-lg text-muted-foreground/70">
            The check is privacy-preserving: your password never leaves your device. Only a short, one-way fragment is ever compared against the breach database.{" "}
            <Link
              href="/learn/pwned-passwords"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              How it works →
            </Link>
          </p>
        </motion.div>

        <div className="mt-20 max-w-3xl mx-auto space-y-14">
          {/* Breach warnings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <ShieldAlert
              className="h-7 w-7 text-muted-foreground/50"
              strokeWidth={1.5}
            />
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              Breach warnings
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              A clear badge appears on any card whose password has turned up in a known data breach — in your list, in search, and while editing. You won&apos;t miss it.
            </p>
          </motion.div>

          {/* Password Update Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <Wand2
              className="h-7 w-7 text-muted-foreground/50"
              strokeWidth={1.5}
            />
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              Password Update Assistant
            </h3>
            {/* TODO: Add screenshot of the assistant sheet (current + new password side by side) — Rodo has this */}
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Changing a password sounds simple. In practice it&apos;s easy to generate a new one, go update the site, and then realize you can&apos;t remember which password you just saved — or whether the old one is gone.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              The Password Update Assistant keeps both passwords in view at the same time: your current password to authenticate with the site, and your new password ready to autofill into the &ldquo;new password&rdquo; field. Neither is overwritten until you confirm the change actually worked. Then, and only then, you tap Save.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Your old password stays safe while you make the switch. That&apos;s the whole point.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="max-w-3xl mx-auto"
        >
          <TechnicalDetails>
            <p>Breach detection uses the Have I Been Pwned Pwned Passwords API with k-anonymity. Only the first 5 characters of a SHA-1 hash are sent. The full hash — and your password — never leave your device. Matches are resolved locally.</p>
            <p>Responses are padded to defeat traffic analysis; the actual matching happens entirely on-device.</p>
            <p>Fail-open: a network error never blocks saving or editing a card.</p>
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
            Passwords worth remembering.
          </h2>

          <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
            Accessbox can create strong passwords that are easier to read, type, and remember — especially when AutoFill isn&apos;t available.
          </p>

          <div className="mt-8 flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Enhanced with Apple Intelligence
            </span>
          </div>

          <p className="mt-3 text-xl text-muted-foreground leading-relaxed">
            On devices with Apple Intelligence, Accessbox goes further: it uses Apple&apos;s on-device AI to shape your hint into natural, memorable language — turning a genuinely strong password into one you can actually recall. The model runs entirely on your device. Nothing is sent to a server.
          </p>

          <ul className="mt-8 space-y-3 text-base text-muted-foreground">
            <li>Choose between memorable, stronger, or fully random passwords</li>
            <li>A hint is stored with every password, so you can always regenerate it</li>
            <li>Generate passwords in several languages</li>
            <li>Adjust the settings and Accessbox creates a new one that fits</li>
          </ul>

          <TechnicalDetails>
            <p>Passphrases generated from curated word lists.</p>
            <p>Tunable rules: min length, uppercase, lowercase, numbers, symbols, no repeating or sequential characters.</p>
            <p>Hint-based regeneration: a secure hint is stored alongside each password for deterministic re-generation.</p>
            <p>Optional on-device phrase naturalization via Apple&apos;s Foundation Models (Apple Intelligence, iOS 26 / macOS 26). Falls back to the local word lists when unavailable — phrases are never sent off device.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 4. Family Sharing
// ---------------------------------------------------------------------------

function FamilySharingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="family" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <Users
            className="h-10 w-10 text-muted-foreground/40 mx-auto"
            strokeWidth={1.5}
          />

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Share with the people
            <br />
            <span className="text-muted-foreground">you trust.</span>
          </h2>

          <p className="mt-10 text-xl text-muted-foreground leading-relaxed">
            Family Sharing lets you share a chosen set of cards — the Wi&#8209;Fi
            password, the streaming logins, the household accounts — with the
            people closest to you, without ever handing over your whole vault.
          </p>

          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            And it begins with one deliberate step: setup happens in person. Your
            devices have to be together in the same room, where they exchange a
            secret key over an encrypted local connection — never the internet — and
            you approve each person by hand. You can only share with people you
            can actually meet face to face.
          </p>

          <p className="mt-6 text-lg text-muted-foreground/70">
            That&apos;s the security: real-world trust, not a link or code anyone could intercept.
            It takes a few taps, and there&apos;s no account or invite to leak.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: UserPlus,
              title: "You pick what's shared",
              desc: "Mark just the cards you want others to see. Everything else in your vault stays private.",
            },
            {
              icon: Lock,
              title: "End-to-end encrypted",
              desc: "Cards are encrypted on your device before they sync. The server is only a delivery pipe — it never sees your credentials.",
            },
            {
              icon: Radio,
              title: "Set up face to face",
              desc: "A one-time, in-person handshake on iPhone — devices connect nearby and you approve each member. After that, shared cards sync to everyone’s devices automatically.",
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
            <p>The initial key exchange uses P-256 ECDH + HKDF over an encrypted peer-to-peer channel established via the Nearby framework. The shared key is derived locally and never transmitted over the internet. It&apos;s the same key format used for encrypted vault backups.</p>
            <p>Each member is explicitly approved by the organizer during setup before any key is sent.</p>
            <p>Shared cards are packaged as an AES-GCM encrypted blob; iCloud is only the delivery channel between members.</p>
            <p>Per card, choose whether any member can edit it or only its creator.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 5. Security
// ---------------------------------------------------------------------------

function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
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
              icon: Lock,
              title: "On-device encryption",
              desc: "Your passwords and sensitive data are encrypted right on your device, before syncing anywhere. iCloud only ever sees ciphertext.",
            },
            {
              icon: Fingerprint,
              title: "Biometric unlock",
              desc: "Unlock with Face ID, Touch ID, or your device passcode. No separate master password to remember.",
            },
            {
              icon: Eye,
              title: "Auto-lock",
              desc: "Your vault locks the moment you leave the app. A blur overlay protects content in the app switcher.",
            },
            {
              icon: VideoOff,
              title: "Screen-recording safe",
              desc: "On iPhone, revealed passwords are hidden automatically while your screen is being recorded or mirrored.",
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
            <p>Backups are encrypted with a generated 256-bit key (AES-GCM) — no human-chosen password to forget or get wrong.</p>
            <p>Built on the same security technologies used by Apple system apps: CryptoKit and Keychain Services.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 6. Two-Factor Authentication
// ---------------------------------------------------------------------------

function TOTPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
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
            <li>Included in encrypted backups and card sharing, so your codes travel with the account</li>
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
// 7. Passkeys
// ---------------------------------------------------------------------------

function PasskeysSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
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
// 8. Card Organization
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
            Save different kinds of accounts with fields that actually fit — websites, email, Wi&#8209;Fi, servers, databases, software licenses, and more. No more stuffing everything into a generic &ldquo;login&rdquo; entry.
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
// 9. Built for both — merged iPhone + Mac section
// ---------------------------------------------------------------------------

function PlatformsMergedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection alt>
      <SectionAnchor id="devices" />
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-20 lg:mb-28"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Built for each device.
            <br />
            <span className="text-muted-foreground">Compromises on none.</span>
          </h2>
        </motion.div>

        {/* iPhone subsection */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-28">
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-[55%]">
              <IPhoneVideo isInView={isInView} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="lg:max-w-lg order-1 lg:order-2"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              iPhone
            </h3>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Your cards stack and fan out like Apple Wallet. Tap to expand, drag to resize. Search your whole vault from one full-screen view, share a card to a nearby device without using the internet, or export any card as an encrypted, password-protected file.
            </p>
            <TechnicalDetails>
              <p>Wallet-inspired card stack built with SwiftUI gesture composition and matched geometry effects.</p>
              <p>Nearby Share uses ECDH key exchange over MultipeerConnectivity for peer-to-peer encrypted transfer.</p>
            </TechnicalDetails>
          </motion.div>
        </div>

        {/* Mac subsection */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            className="lg:max-w-lg"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Mac
            </h3>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Not a stretched-out iPhone app. Accessbox gives your synced vault a proper home on Mac — familiar layout, keyboard shortcuts, and AutoFill for passwords, passkeys, and verification codes. Add something on iPhone, open it on Mac.
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
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 10. Backup & Restore
// ---------------------------------------------------------------------------

function BackupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
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
            Export your entire vault as an encrypted file anytime — with no backup
            password to invent. Accessbox generates a Recovery Key for you, so
            restoring on your other Apple devices just works.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: KeyRound,
              title: "Recovery Key, generated for you",
              desc: "A strong key is created for you and kept in your iCloud Keychain — nothing to invent or forget.",
            },
            {
              icon: RefreshCw,
              title: "Restore with merge",
              desc: "Restoring is automatic on your other Apple devices. Preview first, and Accessbox avoids duplicates.",
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
            <p>Backups are encrypted with a generated 256-bit key (AES-GCM) — no password, no key-derivation step.</p>
            <p>The key lives in your iCloud Keychain, end-to-end encrypted by Apple, and syncs to your devices so restore is silent.</p>
            <p>A Base32 Recovery Key is your portable escape hatch if you ever lose every Apple device.</p>
            <p>Restore previews changes and detects duplicates by card identity and content hash.</p>
          </TechnicalDetails>
        </motion.div>
      </div>
    </FullSection>
  );
}

// ---------------------------------------------------------------------------
// 11. Languages (compressed)
// ---------------------------------------------------------------------------

function LocalizationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="relative px-6 py-16 lg:py-20 bg-muted/30">
      <SectionAnchor id="localization" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          The entire app is localized in English, Spanish, and Portuguese — every screen, every label, every message.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 12. Ownership / Subscription
// ---------------------------------------------------------------------------

function OwnershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <FullSection>
      <SectionAnchor id="ownership" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <Wallet
            className="h-10 w-10 text-muted-foreground/40 mx-auto"
            strokeWidth={1.5}
          />

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Your data is never
            <br />
            <span className="text-muted-foreground">held hostage.</span>
          </h2>

          <p className="mt-10 text-xl text-muted-foreground leading-relaxed">
            Accessbox Pro is a subscription that unlocks unlimited cards and
            more. But your data is never held hostage. If you ever stop
            subscribing, you keep full access to everything you&apos;ve saved.
          </p>

          <p className="mt-6 text-lg text-muted-foreground/70">
            View and edit every card you already have — change a password, update
            a code, fix a detail. You simply won&apos;t be able to add new cards
            until you subscribe again. Your vault is always truly yours.
          </p>
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
          Available on the App Store for iPhone, iPad, and Mac.
        </p>

        <div className="mt-10 flex justify-center">
          <AppStoreBadge variant="black" />
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
      <BreachDetectionSection />
      <PasswordGenSection />
      <FamilySharingSection />
      <SecuritySection />
      <TOTPSection />
      <PasskeysSection />
      <CardOrgSection />
      <PlatformsMergedSection />
      <BackupSection />
      <LocalizationSection />
      <OwnershipSection />
      <BottomCTA />
    </div>
  );
}
