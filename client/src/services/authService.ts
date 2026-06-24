const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUser() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: "include",
  });
  if (res.status == 401) {
    return false;
  }
  if (res.ok) {
    return res.json();
  }
}
