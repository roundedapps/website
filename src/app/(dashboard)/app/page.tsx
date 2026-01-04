import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Roundedapps Dashboard - Coming Soon",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Placeholder page for future authenticated dashboard.
 *
 * TODO: Implement authentication and dashboard features
 * - User authentication (OAuth, email/password, etc.)
 * - Database integration
 * - User profile management
 * - App-specific features
 */
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This area is reserved for future features.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Coming soon with authentication and more.
        </p>
      </div>
    </div>
  );
}


