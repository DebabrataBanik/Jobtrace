import { redirect, type MiddlewareFunction } from "react-router";
import { userContext } from "../context/routerContext";
import { getUser } from "../services/authService";

export const authMiddleware: MiddlewareFunction = async ({ context }) => {
  const user = await getUser();
  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
};

export const guestMiddleware: MiddlewareFunction = async () => {
  const user = await getUser();
  if (user) {
    return redirect("/");
  }
};
