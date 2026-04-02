/**
 * =============================================================================
 * DASHBOARD PAGE — User overview & recent activity
 * =============================================================================
 */

import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "./hooks/use-dashboard";
import { DashboardStats } from "./components/dashboard-stats";
import { DashboardActivity } from "./components/dashboard-activity";
import { Badge } from "@/components/ui/badge";

const DashboardPage = () => {
  const { user, isBusiness } = useAuth();
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted/30 rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
      </div>
    );
  }

  const firstName = user?.fullName?.split(" ")[0] ?? "User";
  const memberDate = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {firstName}
          </h1>
          {isAdmin && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
              Admin
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {memberDate}
        </p>
      </div>

      {/* Stats */}
      <DashboardStats {...data.stats} />

      {/* Activity */}
      <DashboardActivity activities={data.recentActivity} />
    </div>
  );
};

export default DashboardPage;
