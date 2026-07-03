import type { Application, ApplicationFormData } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

async function applicationRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/applications${endpoint}`, {
      credentials: "include",
      ...options,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Application request failed.");
    }
    if (res.status === 204) {
      return undefined as unknown as T;
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

export function getApplications() {
  return applicationRequest<Application[]>("/");
}

export function createApplication(data: ApplicationFormData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return applicationRequest<Application>("/", options);
}

export function getApplication(id: string) {
  return applicationRequest<Application>(`/${id}`);
}

export function deleteApplication(id: string) {
  const options = {
    method: "DELETE",
  };
  return applicationRequest<void>(`/${id}`, options);
}
