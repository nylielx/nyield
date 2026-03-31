import { useState, useEffect } from "react";
import { getOrders } from "../services/orders-service";
import type { Order } from "../data/orders-mock";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return { orders, loading };
};
