/**
 * =============================================================================
 * DASHBOARD SERVICE — Data fetching layer
 * =============================================================================
 */

import type { DashboardData } from "../data/dashboard-mock";

export const getDashboardData = async (): Promise<DashboardData> => {
  const { dashboardMock } = await import("../data/dashboard-mock");
  await new Promise((res) => setTimeout(res, 300));
  return dashboardMock;
};
