import type { Application } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

async function applicationRequest<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/applications${endpoint}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Application request failed.");
    }
    return res.json() as Promise<T>;
  } catch (error) {
    const isNetworkError =
      error instanceof TypeError ||
      (error instanceof Error && error.message === "Failed to fetch");

    if (isNetworkError) {
      throw new Error("Couldn't connect to server. Please try again later.", {
        cause: error,
      });
    }
    throw error;
  }
}

export function getApplications() {
  return applicationRequest<Application[]>("/");
}
