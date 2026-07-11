import { Metadata } from "next";
import { SignInDemo } from "./SignInDemo";

export const metadata: Metadata = {
  title: "Sign in — Roundedapps",
  description: "Sign in to your Roundedapps account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInDemo />;
}
