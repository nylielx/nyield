import { useState, useEffect } from "react";
import { getSavedBuilds } from "../services/saved-builds-service";
import type { SavedBuild } from "../data/saved-builds-mock";

export const useSavedBuilds = () => {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedBuilds().then((data) => {
      setBuilds(data);
      setLoading(false);
    });
  }, []);

  return { builds, loading };
};
