/**
 * =============================================================================
 * DASHBOARD MOCK DATA
 * =============================================================================
 * Simulates the data a real backend would return for the user dashboard.
 * Replace this import in dashboard-service.ts with a real API call later.
 * =============================================================================
 */

export const dashboardMock = {
  /** Welcome section */
  user: {
    fullName: "Alex Mitchell",
    memberSince: "2025-09-14",
  },

  /** Summary stat cards */
  stats: {
    ordersCount: 3,
    savedItemsCount: 7,
    listsCount: 2,
    savedBuildsCount: 4,
  },

  /** Recent activity feed */
  recentActivity: [
    {
      id: "act-1",
      type: "order" as const,
      title: "Order #NY-20260312 placed",
      description: "RTX 4070 Gaming Build — Collection from London",
      timestamp: "2026-03-28T14:22:00Z",
    },
    {
      id: "act-2",
      type: "saved" as const,
      title: "Saved a listing",
      description: "Ryzen 9 7950X Workstation — £2,450",
      timestamp: "2026-03-27T09:15:00Z",
    },
    {
      id: "act-3",
      type: "list" as const,
      title: 'Added to list "Budget Builds"',
      description: "i5-13400F Starter PC — £680",
      timestamp: "2026-03-25T18:40:00Z",
    },
    {
      id: "act-4",
      type: "build" as const,
      title: "Saved a custom build",
      description: "Mid-Range 1440p Gaming — RTX 4060 Ti + R7 7700X",
      timestamp: "2026-03-24T11:05:00Z",
    },
    {
      id: "act-5",
      type: "order" as const,
      title: "Order #NY-20260228 completed",
      description: "i7-13700K Content Creator Build — Delivered",
      timestamp: "2026-03-20T16:30:00Z",
    },
  ],
};

export type DashboardData = typeof dashboardMock;
