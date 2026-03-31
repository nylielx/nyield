export interface UserList {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
  previewItems: string[];
}

export const listsMock: UserList[] = [
  {
    id: "list-1",
    name: "Budget Builds",
    description: "Affordable gaming PCs under £800",
    itemCount: 5,
    createdAt: "2026-02-10",
    updatedAt: "2026-03-25",
    previewItems: [
      "i5-13400F Starter PC — £680",
      "R5 5600 Budget Build — £520",
      "i3-12100F Entry Gaming — £420",
    ],
  },
  {
    id: "list-2",
    name: "Workstation Shortlist",
    description: "High-end builds for content creation",
    itemCount: 3,
    createdAt: "2026-03-01",
    updatedAt: "2026-03-27",
    previewItems: [
      "R9 7950X Creator — £2,450",
      "i9-14900K Render Station — £3,100",
    ],
  },
];
