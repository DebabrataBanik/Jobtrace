import type { UserFormData } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    credentials: "include",
  });
  if (res.status == 401) return null;

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

export async function updateProfile(data: UserFormData) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
