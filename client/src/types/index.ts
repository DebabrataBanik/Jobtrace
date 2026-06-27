export type User = {
  id: string;
  name: string;
  email: string;
};

type Timeline = {
  status: string;
  date: string;
  note: string;
};

export type Application = {
  _id: string;
  company: string;
  title: string;
  status: "Applied" | "OA" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  timeline: Timeline[];
  url?: string;
  description?: string;
  notes?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
