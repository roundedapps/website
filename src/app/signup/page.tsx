import { Metadata } from "next";
import { SignUpDemo } from "./SignUpDemo";

export const metadata: Metadata = {
  title: "Create your account — Roundedapps",
  description: "Create a Roundedapps account.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <SignUpDemo />;
}
