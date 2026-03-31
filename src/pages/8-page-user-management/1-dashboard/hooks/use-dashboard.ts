/**
 * =============================================================================
 * USE-DASHBOARD HOOK — State management for the dashboard page
 * =============================================================================
 * Fetches dashboard data via the service layer and exposes it to components.
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { getDashboardData } from "../services/dashboard-service";
import type { DashboardData } from "../data/dashboard-mock";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};
