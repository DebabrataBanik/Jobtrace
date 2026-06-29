import type { RegisterUserData, LoginUserData } from "../types";

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

export async function registerUser(data: RegisterUserData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw Error(error.message || `${res.status}, ${res.statusText}`);
  }
}

export async function loginUser(data: LoginUserData) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw Error(error.message || `${res.status}, ${res.statusText}`);
  }
}
