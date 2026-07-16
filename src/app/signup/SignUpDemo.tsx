"use client";

/**
 * Demo sign-up for testing Accessbox AutoFill account creation.
 *
 * Client-side only, like /signin: no account is created and nothing
 * leaves the browser. The new-password autocomplete fields are what
 * drive the credential provider's strong-password suggestion and the
 * save-new-credential flow on submit.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function SignUpDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Enter your email and a password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    // A real backend would create the account here.
    setError(null);
    setCreated(true);
  }

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
          {created ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-7 w-7 text-green-600" />
              </div>
              <h1 className="mt-5 text-2xl font-semibold tracking-tight">
                Welcome{name ? `, ${name.split(" ")[0]}` : ""}!
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Your account is ready.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{email}</p>
              <Button asChild size="lg" className="mt-8 w-full">
                <Link href="/signin">Continue to sign in</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                to get started with {siteConfig.name}
              </p>

              <form onSubmit={handleSignUp} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
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
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Confirm password
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
                  Create account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
