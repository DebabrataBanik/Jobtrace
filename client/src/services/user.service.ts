import type { UserFormData } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    credentials: "include",
  });
  if (res.status == 401) return null;

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Couldn't fetch user data!");
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
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Profile update failed");
  }
  return res.json();
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("image", file, "profile-image.jpg");

  const res = await fetch(`${BASE_URL}/user/image`, {
    credentials: "include",
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }
  return res.json();
}
