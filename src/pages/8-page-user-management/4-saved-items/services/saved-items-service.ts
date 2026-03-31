import type { SavedItem } from "../data/saved-items-mock";

export const getSavedItems = async (): Promise<SavedItem[]> => {
  const { savedItemsMock } = await import("../data/saved-items-mock");
  await new Promise((res) => setTimeout(res, 300));
  return savedItemsMock;
};
