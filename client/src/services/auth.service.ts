import type { RegisterUserData, LoginUserData, UserFormData } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUser() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: "include",
  });
  if (res.status == 401) return null;

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json();
}

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    credentials: "include",
  });
  if (res.status == 401) return null;

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

export async function registerUser(data: RegisterUserData) {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 5000);
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
      signal: abortController.signal,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `${res.status}, ${res.statusText}`);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please check your connection.", {
        cause: error,
      });
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function loginUser(data: LoginUserData) {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 5000);
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
      signal: abortController.signal,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `${res.status}, ${res.statusText}`);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please check your connection.", {
        cause: error,
      });
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function updateProfile(data: UserFormData) {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
