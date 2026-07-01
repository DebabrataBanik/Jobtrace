export type User = {
  id: string;
  name: string;
  email: string;
};

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type ApplicationData = {
  company: string;
  title: string;
  url?: string;
  appliedDate: string;
  status: "applied" | "assessment" | "interview" | "offer" | "rejected";
  description?: string;
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
