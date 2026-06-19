import { redirect, type MiddlewareFunction } from "react-router";
import { userContext } from "../context/routerContext";

export const authMiddleware: MiddlewareFunction = async ({ context }) => {
  const res = await fetch("http://localhost:8000/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    throw redirect("/login");
  }

  context.set(userContext, await res.json());
};
