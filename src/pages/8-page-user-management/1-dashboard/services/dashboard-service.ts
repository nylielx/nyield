/**
 * =============================================================================
 * DASHBOARD SERVICE — Data fetching layer
 * =============================================================================
 * Abstracts data access so the UI never imports mock files directly.
 * To connect a real backend, replace the import with a fetch() call.
 * =============================================================================
 */

import type { DashboardData } from "../data/dashboard-mock";

export const getDashboardData = async (): Promise<DashboardData> => {
  const { dashboardMock } = await import("../data/dashboard-mock");
  await new Promise((res) => setTimeout(res, 300));
  return dashboardMock;
};
