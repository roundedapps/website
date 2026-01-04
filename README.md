# Roundedapps Website

A minimal, Apple-inspired marketing website for Roundedapps, built with Next.js 15, TypeScript, and Tailwind CSS.

![Roundedapps](public/og-image.png)

## ✨ Features

- **Apple-like Design** - Clean, minimal aesthetic with generous whitespace
- **Smooth Animations** - Subtle framer-motion transitions throughout
- **Lottie Logo Support** - Animated logo using lottie-react
- **MDX Content** - Privacy and Terms pages written in MDX
- **Fully Responsive** - Beautiful on all screen sizes
- **SEO Optimized** - Meta tags, OpenGraph, and structured data ready
- **Future-Proof** - Reserved dashboard route for authenticated features

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/        # Future authenticated routes
│   │   ├── app/
│   │   │   └── page.tsx    # Placeholder dashboard
│   │   └── layout.tsx
│   ├── privacy/
│   │   └── page.mdx        # Privacy Policy (MDX)
│   ├── support/
│   │   └── page.tsx        # Support page
│   ├── terms/
│   │   └── page.mdx        # Terms of Service (MDX)
│   ├── globals.css         # Global styles + CSS variables
│   ├── layout.tsx          # Root layout with SEO
│   └── page.tsx            # Home page
├── components/
│   ├── site/
│   │   ├── AboutTribute.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── NavBar.tsx
│   └── ui/
│       └── button.tsx      # shadcn/ui button
├── lib/
│   ├── site.ts             # Site constants
│   └── utils.ts            # Utility functions
└── mdx-components.tsx      # MDX component overrides

public/
├── lottie/
│   └── roundedapps-logo-placeholder.json
├── favicon.ico
└── og-image.png
```

## 🎨 Customization

### Replacing the Lottie Logo

1. Create your Lottie animation using [LottieFiles](https://lottiefiles.com/) or Adobe After Effects with Bodymovin
2. Export as JSON
3. Replace the file at:

```
public/lottie/roundedapps-logo-placeholder.json
```

4. The animation auto-plays once on page load

### Setting the TestFlight Link

Edit `src/lib/site.ts`:

```typescript
export const appConfig = {
  accessbox: {
    name: "Accessbox",
    tagline: "Passwords made for humans",
    testFlightUrl: "https://testflight.apple.com/join/YOUR_CODE", // <- Replace this
  },
};
```

### Updating Site Information

All site-wide constants are in `src/lib/site.ts`:

```typescript
export const siteConfig = {
  name: "Roundedapps",
  description: "...",
  url: "https://www.roundedapps.com",
  ogImage: "/og-image.png",
  supportEmail: "support@roundedapps.com",
  location: "Costa Rica",
};
```

### Adding OpenGraph Image

Replace `public/og-image.png` with a 1200x630 pixel image.

### Favicon

Replace `public/favicon.ico` with your favicon. Consider also adding:
- `public/apple-touch-icon.png` (180x180)
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

## 🎭 Theme Customization

Colors are defined as CSS variables in `src/app/globals.css`. The site uses a monochromatic, Apple-inspired palette:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 4%;
  --primary: 0 0% 9%;
  /* ... */
}

.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Logo Animation:** [lottie-react](https://lottiereact.com/)
- **Content:** [MDX](https://mdxjs.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚧 Future Development

The `/app` route is reserved for a future authenticated dashboard. When ready to implement:

1. Add authentication (NextAuth.js, Clerk, etc.)
2. Add database integration (Prisma, Drizzle, etc.)
3. Build out the dashboard layout in `src/app/(dashboard)/`

## 📄 License

Copyright © 2025 Roundedapps. All rights reserved.

---

Made with ❤️ in Costa Rica




