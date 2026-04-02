/**
 * =============================================================================
 * DASHBOARD MOCK DATA
 * =============================================================================
 * Stats and activity data. User greeting is now dynamic via AuthContext.
 * =============================================================================
 */

export interface DashboardStats {
  ordersCount: number;
  savedItemsCount: number;
  listsCount: number;
  savedBuildsCount: number;
}

export interface DashboardActivity {
  id: string;
  type: "order" | "saved" | "list" | "build";
  title: string;
  description: string;
  timestamp: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: DashboardActivity[];
}

export const dashboardMock: DashboardData = {
  stats: {
    ordersCount: 3,
    savedItemsCount: 7,
    listsCount: 2,
    savedBuildsCount: 4,
  },
  recentActivity: [
    {
      id: "act-1",
      type: "order",
      title: "Order #NY-20260312 placed",
      description: "RTX 4070 Gaming Build — Collection from London",
      timestamp: "2026-03-28T14:22:00Z",
    },
    {
      id: "act-2",
      type: "saved",
      title: "Saved a listing",
      description: "Ryzen 9 7950X Workstation — £2,450",
      timestamp: "2026-03-27T09:15:00Z",
    },
    {
      id: "act-3",
      type: "list",
      title: 'Added to list "Budget Builds"',
      description: "i5-13400F Starter PC — £680",
      timestamp: "2026-03-25T18:40:00Z",
    },
    {
      id: "act-4",
      type: "build",
      title: "Saved a custom build",
      description: "Mid-Range 1440p Gaming — RTX 4060 Ti + R7 7700X",
      timestamp: "2026-03-24T11:05:00Z",
    },
    {
      id: "act-5",
      type: "order",
      title: "Order #NY-20260228 completed",
      description: "i7-13700K Content Creator Build — Delivered",
      timestamp: "2026-03-20T16:30:00Z",
    },
  ],
};
