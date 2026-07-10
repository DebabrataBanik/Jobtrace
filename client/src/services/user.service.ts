import type { UserFormData, User } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

async function profileRequest<T>(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${BASE_URL}/user${endpoint}`, {
      credentials: "include",
      ...options,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Profile request failed.`);
    }
    return res.json() as Promise<T>;
  } catch (error) {
    const isNetworkError =
      error instanceof TypeError && error.message.includes("fetch");

    if (isNetworkError) {
      throw new Error("Couldn't connect to server. Please try again later.", {
        cause: error,
      });
    }
    throw error;
  }
}

export async function getUserProfile() {
  return profileRequest<User>("/profile");
}

export async function updateProfile(data: UserFormData) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return profileRequest<User>("/profile", options);
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("image", file, "profile-image.jpg");

  const options = {
    method: "PATCH",
    body: formData,
  };
  return profileRequest<User>("/image", options);
}
