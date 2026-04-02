/**
 * =============================================================================
 * USE SELLER DASHBOARD — Hook for fetching all seller data
 * =============================================================================
 */

import { useState, useEffect } from "react";
import {
  fetchSellerMetrics,
  fetchSellerOrders,
  fetchSellerListings,
  fetchSellerCustomers,
  fetchSellerActivities,
  fetchRevenueChart,
} from "../services/seller-service";
import type {
  SellerMetrics,
  SellerOrder,
  SellerListing,
  SellerCustomer,
  SellerActivity,
  RevenueDataPoint,
} from "../data/seller-mock";

interface SellerDashboardData {
  metrics: SellerMetrics | null;
  orders: SellerOrder[];
  listings: SellerListing[];
  customers: SellerCustomer[];
  activities: SellerActivity[];
  revenueData: RevenueDataPoint[];
  loading: boolean;
}

export function useSellerDashboard(): SellerDashboardData {
  const [metrics, setMetrics] = useState<SellerMetrics | null>(null);
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [customers, setCustomers] = useState<SellerCustomer[]>([]);
  const [activities, setActivities] = useState<SellerActivity[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [m, o, l, c, a, r] = await Promise.all([
        fetchSellerMetrics(),
        fetchSellerOrders(),
        fetchSellerListings(),
        fetchSellerCustomers(),
        fetchSellerActivities(),
        fetchRevenueChart(),
      ]);
      setMetrics(m);
      setOrders(o);
      setListings(l);
      setCustomers(c);
      setActivities(a);
      setRevenueData(r);
      setLoading(false);
    }
    load();
  }, []);

  return { metrics, orders, listings, customers, activities, revenueData, loading };
}
