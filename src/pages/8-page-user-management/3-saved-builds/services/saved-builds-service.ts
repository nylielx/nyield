import type { SavedBuild } from "../data/saved-builds-mock";

export const getSavedBuilds = async (): Promise<SavedBuild[]> => {
  const { savedBuildsMock } = await import("../data/saved-builds-mock");
  await new Promise((res) => setTimeout(res, 300));
  return savedBuildsMock;
};
