"use client";

/**
 * Demo sign-in for capturing Accessbox AutoFill screenshots.
 *
 * Everything runs client-side: no account is created and no credential
 * leaves the browser. The WebAuthn calls use locally generated challenges,
 * which is enough to drive the OS passkey UI; a real backend would issue
 * and verify these instead (see handleSignIn / verifyCode / passkey fns).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { Fingerprint, Check, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Step = "credentials" | "code" | "done";

// WebAuthn binds passkeys to the relying-party ID. Use the registrable
// domain so a passkey works on both www.roundedapps.com and the apex.
function rpId(): string {
  const host = window.location.hostname;
  return host === "localhost" ? "localhost" : host.replace(/^www\./, "");
}

function randomBytes(length: number): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function randomBase32Secret(byteLength = 20): string {
  const bytes = randomBytes(byteLength);
  let bits = 0;
  let value = 0;
  let output = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output;
}

async function createPasskey(email: string): Promise<void> {
  await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(32),
      rp: { id: rpId(), name: siteConfig.name },
      user: {
        id: randomBytes(16),
        name: email,
        displayName: email,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
        { type: "public-key", alg: -257 }, // RS256
      ],
      authenticatorSelection: {
        residentKey: "required",
        requireResidentKey: true,
        userVerification: "preferred",
      },
      timeout: 60_000,
    },
  });
}

async function getPasskeyAssertion(options?: {
  conditional?: boolean;
  signal?: AbortSignal;
}): Promise<Credential | null> {
  return navigator.credentials.get({
    ...(options?.conditional ? { mediation: "conditional" as const } : {}),
    ...(options?.signal ? { signal: options.signal } : {}),
    publicKey: {
      challenge: randomBytes(32),
      rpId: rpId(),
      allowCredentials: [],
      userVerification: "preferred",
      timeout: 60_000,
    },
  });
}

export function SignInDemo() {
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [passkeyCreated, setPasskeyCreated] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const conditionalAbort = useRef<AbortController | null>(null);

  const finishSignIn = useCallback((signedInEmail: string) => {
    conditionalAbort.current?.abort();
    setEmail(signedInEmail);
    setPassword("");
    setCode("");
    setError(null);
    setStep("done");
  }, []);

  // Conditional mediation surfaces saved passkeys in the QuickType bar
  // alongside password AutoFill — the flow the screenshots are after.
  useEffect(() => {
    if (step !== "credentials") return;
    if (
      typeof window === "undefined" ||
      !window.PublicKeyCredential?.isConditionalMediationAvailable
    ) {
      return;
    }
    const controller = new AbortController();
    conditionalAbort.current = controller;
    (async () => {
      try {
        const available =
          await PublicKeyCredential.isConditionalMediationAvailable();
        if (!available || controller.signal.aborted) return;
        const credential = await getPasskeyAssertion({
          conditional: true,
          signal: controller.signal,
        });
        if (credential) finishSignIn("passkey@roundedapps.com");
      } catch {
        // Aborted or dismissed — the form still works without it.
      }
    })();
    return () => controller.abort();
  }, [step, finishSignIn]);

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    // A real backend would verify the password here.
    setError(null);
    setStep("code");
  }

  function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code.");
      return;
    }
    // A real backend would verify the TOTP code here.
    finishSignIn(email);
  }

  async function signInWithPasskey() {
    setBusy(true);
    setError(null);
    try {
      conditionalAbort.current?.abort();
      const credential = await getPasskeyAssertion();
      if (credential) finishSignIn("passkey@roundedapps.com");
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError(
          "Passkey sign-in didn't complete. Create a passkey first, or use your password.",
        );
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleCreatePasskey() {
    setBusy(true);
    setError(null);
    try {
      await createPasskey(email || "you@roundedapps.com");
      setPasskeyCreated(true);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError("Passkey creation didn't complete.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function setUpTwoFactor() {
    const secret = totpSecret ?? randomBase32Secret();
    setTotpSecret(secret);
    const account = encodeURIComponent(email || "you@roundedapps.com");
    const otpauth = `otpauth://totp/${siteConfig.name}:${account}?secret=${secret}&issuer=${siteConfig.name}&algorithm=SHA1&digits=6&period=30`;
    setQrDataUrl(await QRCode.toDataURL(otpauth, { margin: 1, width: 220 }));
  }

  function signOut() {
    setStep("credentials");
    setEmail("");
    setPassword("");
    setCode("");
    setError(null);
    setPasskeyCreated(false);
    setTotpSecret(null);
    setQrDataUrl(null);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const otpauthUrl =
    totpSecret &&
    `otpauth://totp/${siteConfig.name}:${encodeURIComponent(
      email || "you@roundedapps.com",
    )}?secret=${totpSecret}&issuer=${siteConfig.name}&algorithm=SHA1&digits=6&period=30`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label={siteConfig.name}>
            <Image
              src="/roundedapps.svg"
              alt={siteConfig.name}
              width={120}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-background p-8 shadow-sm">
          {step === "credentials" && (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                to continue to {siteConfig.name}
              </p>

              <form onSubmit={handleSignIn} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username webauthn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password webauthn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" size="lg" className="w-full">
                  Sign in
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground/60">
                <div className="h-px flex-1 bg-border/60" />
                or
                <div className="h-px flex-1 bg-border/60" />
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                disabled={busy}
                onClick={signInWithPasskey}
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                Sign in with a passkey
              </Button>
            </>
          )}

          {step === "code" && (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">
                Two-factor authentication
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator.
              </p>

              <form onSubmit={verifyCode} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="one-time-code"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Verification code
                  </label>
                  <input
                    id="one-time-code"
                    name="one-time-code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`${inputClass} text-center text-2xl tracking-[0.5em]`}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" size="lg" className="w-full">
                  Verify
                </Button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep("credentials");
                }}
                className="mt-6 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to sign in
              </button>
            </>
          )}

          {step === "done" && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">
                    You&apos;re signed in
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {email || "you@roundedapps.com"}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6 border-t border-border/50 pt-6">
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    Passkey
                  </h2>
                  {passkeyCreated ? (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ Passkey saved. Sign out and try &ldquo;Sign in with a
                      passkey.&rdquo;
                    </p>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add a passkey to sign in without a password.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        disabled={busy}
                        onClick={handleCreatePasskey}
                      >
                        Create a passkey
                      </Button>
                    </>
                  )}
                </div>

                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    Two-factor authentication
                  </h2>
                  {totpSecret ? (
                    <div className="mt-3 space-y-3">
                      {qrDataUrl && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={qrDataUrl}
                          alt="TOTP setup QR code"
                          className="rounded-lg border border-border/50"
                          width={160}
                          height={160}
                        />
                      )}
                      <p className="text-xs text-muted-foreground">
                        Scan with your authenticator, or enter the secret
                        manually:
                      </p>
                      <code className="block select-all break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                        {totpSecret}
                      </code>
                      {otpauthUrl && (
                        <a
                          href={otpauthUrl}
                          className="block text-sm text-primary hover:underline"
                        >
                          Add to your authenticator on this device →
                        </a>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Set up verification codes for this account.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={setUpTwoFactor}
                      >
                        Set up 2FA
                      </Button>
                    </>
                  )}
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>

              <p className="mt-6 border-t border-border/50 pt-4 text-xs text-muted-foreground/60">
                This is a demo. No account is created and nothing you enter
                leaves your device.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
