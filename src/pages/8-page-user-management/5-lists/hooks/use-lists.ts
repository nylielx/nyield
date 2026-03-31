import { useState, useEffect } from "react";
import { getUserLists } from "../services/lists-service";
import type { UserList } from "../data/lists-mock";

export const useLists = () => {
  const [lists, setLists] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserLists().then((data) => {
      setLists(data);
      setLoading(false);
    });
  }, []);

  return { lists, loading };
};
