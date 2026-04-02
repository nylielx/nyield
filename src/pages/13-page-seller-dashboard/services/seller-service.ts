/**
 * =============================================================================
 * SELLER SERVICE — Data fetching layer for seller dashboard
 * =============================================================================
 * Uses mock data with simulated async delay.
 * Replace with real API calls when backend is ready.
 * =============================================================================
 */

import {
  sellerMetrics,
  sellerOrders,
  sellerListings,
  sellerCustomers,
  sellerActivities,
  revenueChart,
  type SellerMetrics,
  type SellerOrder,
  type SellerListing,
  type SellerCustomer,
  type SellerActivity,
  type RevenueDataPoint,
} from "../data/seller-mock";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function fetchSellerMetrics(): Promise<SellerMetrics> {
  await delay();
  return sellerMetrics;
}

export async function fetchSellerOrders(): Promise<SellerOrder[]> {
  await delay();
  return sellerOrders;
}

export async function fetchSellerListings(): Promise<SellerListing[]> {
  await delay();
  return sellerListings;
}

export async function fetchSellerCustomers(): Promise<SellerCustomer[]> {
  await delay();
  return sellerCustomers;
}

export async function fetchSellerActivities(): Promise<SellerActivity[]> {
  await delay();
  return sellerActivities;
}

export async function fetchRevenueChart(): Promise<RevenueDataPoint[]> {
  await delay();
  return revenueChart;
}
