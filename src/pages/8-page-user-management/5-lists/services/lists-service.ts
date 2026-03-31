import type { UserList } from "../data/lists-mock";

export const getUserLists = async (): Promise<UserList[]> => {
  const { listsMock } = await import("../data/lists-mock");
  await new Promise((res) => setTimeout(res, 300));
  return listsMock;
};
