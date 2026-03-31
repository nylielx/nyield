import type { Order } from "../data/orders-mock";

export const getOrders = async (): Promise<Order[]> => {
  const { ordersMock } = await import("../data/orders-mock");
  await new Promise((res) => setTimeout(res, 300));
  return ordersMock;
};
