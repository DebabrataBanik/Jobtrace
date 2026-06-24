export type User = {
  id: string;
  name: string;
  email: string;
};

export type Application = {
  _id: string;
  company: string;
  title: string;
  status: "Applied" | "OA" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  timeline: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
};
