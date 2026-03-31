import { useState, useEffect } from "react";
import { getSavedItems } from "../services/saved-items-service";
import type { SavedItem } from "../data/saved-items-mock";

export const useSavedItems = () => {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return { items, loading };
};
