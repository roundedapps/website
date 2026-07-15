"use client";

/**
 * Demo sign-in for capturing Accessbox AutoFill screenshots.
 *
 * Everything runs client-side: no account is created and no credential
 * leaves the browser. The WebAuthn calls use locally generated challenges,
 * which is enough to drive the OS passkey UI; a real backend would issue
 * and verify these instead (see handleSignIn / verifyCode / passkey fns).
 *
 * /.well-known/change-password (in public/) deep-links to the change
 * password view via /signin/?action=change-password, the standard URL
 * password managers use to send users here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Fingerprint,
  Check,
  ShieldCheck,
  LogOut,
  KeyRound,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Step = "credentials" | "code" | "done";
type AccountView = "home" | "password" | "passkey" | "otp";

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

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function SignInDemo() {
  const [step, setStep] = useState<Step>("credentials");
  const [view, setView] = useState<AccountView>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [passkeyCreated, setPasskeyCreated] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const conditionalAbort = useRef<AbortController | null>(null);

  const displayEmail = email || "you@roundedapps.com";

  const finishSignIn = useCallback((signedInEmail: string) => {
    conditionalAbort.current?.abort();
    setEmail(signedInEmail);
    setPassword("");
    setCode("");
    setError(null);
    setView("home");
    setStep("done");
  }, []);

  // Password managers open /.well-known/change-password, which redirects
  // here with ?action=change-password — land directly on the form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "change-password") {
      setStep("done");
      setView("password");
    }
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

  function openView(next: AccountView) {
    setMenuOpen(false);
    setError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordChanged(false);
    setView(next);
  }

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

  function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentPassword || !newPassword) {
      setError("Fill in every field.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }
    // A real backend would verify the current password and store the new one.
    setError(null);
    setPasswordChanged(true);
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
      await createPasskey(displayEmail);
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
    const account = encodeURIComponent(displayEmail);
    const otpauth = `otpauth://totp/${siteConfig.name}:${account}?secret=${secret}&issuer=${siteConfig.name}&algorithm=SHA1&digits=6&period=30`;
    setQrDataUrl(await QRCode.toDataURL(otpauth, { margin: 1, width: 220 }));
  }

  function signOut() {
    setStep("credentials");
    setView("home");
    setMenuOpen(false);
    setEmail("");
    setPassword("");
    setCode("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordChanged(false);
    setError(null);
    setPasskeyCreated(false);
    setTotpSecret(null);
    setQrDataUrl(null);
  }

  const otpauthUrl =
    totpSecret &&
    `otpauth://totp/${siteConfig.name}:${encodeURIComponent(
      displayEmail,
    )}?secret=${totpSecret}&issuer=${siteConfig.name}&algorithm=SHA1&digits=6&period=30`;

  const menuItems: {
    label: string;
    icon: typeof KeyRound;
    view: AccountView;
  }[] = [
    { label: "Change password", icon: KeyRound, view: "password" },
    { label: "Passkey", icon: Fingerprint, view: "passkey" },
    { label: "Two-factor authentication", icon: ShieldCheck, view: "otp" },
  ];

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
              {/* Header row: identity + account menu */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {siteConfig.name} account
                </p>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Account menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {displayEmail[0].toUpperCase()}
                  </button>

                  {menuOpen && (
                    <>
                      <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-10 cursor-default"
                      />
                      <div className="absolute right-0 top-11 z-20 w-64 overflow-hidden rounded-xl border border-border/60 bg-background py-1.5 shadow-lg">
                        <p className="truncate px-4 py-2 text-xs text-muted-foreground">
                          {displayEmail}
                        </p>
                        <div className="mx-2 my-1 h-px bg-border/60" />
                        {menuItems.map((item) => (
                          <button
                            key={item.view}
                            type="button"
                            onClick={() => openView(item.view)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                          >
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            {item.label}
                          </button>
                        ))}
                        <div className="mx-2 my-1 h-px bg-border/60" />
                        <button
                          type="button"
                          onClick={signOut}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                        >
                          <LogOut className="h-4 w-4 text-muted-foreground" />
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {view === "home" && (
                <div className="mt-10 pb-4 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                    <Check className="h-7 w-7 text-green-600" />
                  </div>
                  <h1 className="mt-5 text-2xl font-semibold tracking-tight">
                    You&apos;re signed in
                  </h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {displayEmail}
                  </p>
                </div>
              )}

              {view === "password" && (
                <div className="mt-8">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Change password
                  </h1>

                  {passwordChanged ? (
                    <div className="mt-8 pb-4 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="mt-4 font-medium">Password changed</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your new password is ready to use.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-6"
                        onClick={() => openView("home")}
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleChangePassword}
                      className="mt-6 space-y-4"
                    >
                      {/* Present but visually hidden so the password manager
                          knows which account the new password belongs to. */}
                      <input
                        type="email"
                        name="username"
                        autoComplete="username"
                        value={displayEmail}
                        readOnly
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <div>
                        <label
                          htmlFor="current-password"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Current password
                        </label>
                        <input
                          id="current-password"
                          name="current-password"
                          type="password"
                          autoComplete="current-password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="new-password"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          New password
                        </label>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Confirm new password
                        </label>
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      {error && <p className="text-sm text-red-500">{error}</p>}

                      <Button type="submit" size="lg" className="w-full">
                        Change password
                      </Button>
                    </form>
                  )}

                  {!passwordChanged && (
                    <BackToAccount onClick={() => openView("home")} />
                  )}
                </div>
              )}

              {view === "passkey" && (
                <div className="mt-8">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Passkey
                  </h1>
                  {passkeyCreated ? (
                    <p className="mt-4 text-sm text-green-600">
                      ✓ Passkey saved. Sign out and try &ldquo;Sign in with a
                      passkey.&rdquo;
                    </p>
                  ) : (
                    <>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Add a passkey to sign in without a password.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        disabled={busy}
                        onClick={handleCreatePasskey}
                      >
                        <Fingerprint className="mr-2 h-4 w-4" />
                        Create a passkey
                      </Button>
                    </>
                  )}

                  {error && (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                  )}

                  <BackToAccount onClick={() => openView("home")} />
                </div>
              )}

              {view === "otp" && (
                <div className="mt-8">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Two-factor authentication
                  </h1>
                  {totpSecret ? (
                    <div className="mt-4 space-y-3">
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
                      <p className="mt-4 text-sm text-muted-foreground">
                        Set up verification codes for this account.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={setUpTwoFactor}
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Set up 2FA
                      </Button>
                    </>
                  )}

                  <BackToAccount onClick={() => openView("home")} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function BackToAccount({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to account
    </button>
  );
}
