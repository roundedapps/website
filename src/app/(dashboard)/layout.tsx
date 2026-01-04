/**
 * Dashboard layout placeholder.
 *
 * This layout will be used for authenticated routes in the future.
 * Currently, it simply renders children without any auth checks.
 *
 * TODO: Add authentication middleware
 * TODO: Add sidebar navigation
 * TODO: Add user session management
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


