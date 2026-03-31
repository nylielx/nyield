/**
 * =============================================================================
 * DASHBOARD PAGE — User overview & recent activity
 * =============================================================================
 * Composition-only page: imports hook + components, renders UI.
 * =============================================================================
 */

import { useDashboard } from "./hooks/use-dashboard";
import { DashboardStats } from "./components/dashboard-stats";
import { DashboardActivity } from "./components/dashboard-activity";

const DashboardPage = () => {
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

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {data.user.fullName.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Member since {new Date(data.user.memberSince).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
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
