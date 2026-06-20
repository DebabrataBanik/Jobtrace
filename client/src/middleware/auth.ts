import { redirect, type MiddlewareFunction } from "react-router";
import { userContext } from "../context/routerContext";

export const authMiddleware: MiddlewareFunction = async ({ context }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw redirect("/login");
  }

  context.set(userContext, await res.json());
};

export const guestMiddleware: MiddlewareFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include",
  });

  if (res.ok) {
    return redirect("/");
  }
};
