/**
 * =============================================================================
 * API ENDPOINTS — Future endpoint registry
 * =============================================================================
 * Define all API endpoints here. Service files reference these constants
 * instead of hardcoding URLs.
 * =============================================================================
 */

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  USER: {
    PROFILE: "/user/profile",
    DASHBOARD: "/user/dashboard",
    ORDERS: "/user/orders",
    SAVED_BUILDS: "/user/saved-builds",
    SAVED_ITEMS: "/user/saved-items",
    LISTS: "/user/lists",
  },
  MARKETPLACE: {
    LISTINGS: "/marketplace/listings",
    LISTING_BY_ID: "/marketplace/listings/:id",
    FAVOURITE: "/marketplace/favourite",
    SAVE_TO_LIST: "/marketplace/save-to-list",
  },
};
