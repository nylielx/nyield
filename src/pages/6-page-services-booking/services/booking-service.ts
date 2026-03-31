/**
 * =============================================================================
 * BOOKING SERVICE — Mock persistence for bookings
 * =============================================================================
 */

import type { Booking, PCSpecs } from "../types/booking-types";
import { bookingsMock } from "../data/bookings-mock";

const STORAGE_KEY = "nyield_bookings";

function getStoredBookings(): Booking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [...bookingsMock];
}

function saveBookings(bookings: Booking[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export async function getUserBookings(userId?: string): Promise<Booking[]> {
  await new Promise((r) => setTimeout(r, 300));
  const all = getStoredBookings();
  if (!userId) return all;
  return all.filter((b) => b.userId === userId);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  await new Promise((r) => setTimeout(r, 200));
  const all = getStoredBookings();
  return all.find((b) => b.id === id) ?? null;
}

export async function createBooking(data: {
  userId?: string;
  guestEmail?: string;
  edition: string;
  editionName: string;
  pcSpecs: PCSpecs;
  date: string;
  time: string;
  timeLabel: string;
  technicianId: string;
  technicianName: string;
  price: number;
  surcharge: number;
  vat: number;
  total: number;
}): Promise<Booking> {
  await new Promise((r) => setTimeout(r, 500));
  const bookings = getStoredBookings();
  const newBooking: Booking = {
    ...data,
    id: `BK-${String(bookings.length + 1).padStart(3, "0")}`,
    status: "processing",
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export async function cancelBooking(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const bookings = getStoredBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = "cancelled";
    saveBookings(bookings);
  }
}

export async function getSavedPCSpecs(): Promise<PCSpecs[]> {
  await new Promise((r) => setTimeout(r, 200));
  try {
    const stored = localStorage.getItem("nyield_saved_specs");
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export async function savePCSpecs(specs: PCSpecs): Promise<void> {
  const existing = await getSavedPCSpecs();
  existing.unshift(specs);
  localStorage.setItem("nyield_saved_specs", JSON.stringify(existing.slice(0, 10)));
}
