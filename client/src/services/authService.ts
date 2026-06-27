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
