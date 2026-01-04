"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site";

export function NavBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label={siteConfig.name}
        >
          <Image
            src="/roundedapps.svg"
            alt={siteConfig.name}
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
          {/* Hidden text for SEO/screen readers */}
          <span className="sr-only">
            {siteConfig.name}
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group relative py-2 text-sm font-medium">
      <span className="text-foreground/70 transition-colors duration-200 group-hover:text-foreground">
        {children}
      </span>
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-foreground"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </Link>
  );
}




