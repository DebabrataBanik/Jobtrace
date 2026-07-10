import { redirect, type MiddlewareFunction } from "react-router";
import { getUser } from "../services/auth.service";
import { queryClient } from "../lib/queryClient";

export const authMiddleware: MiddlewareFunction = async () => {
  const user = await queryClient.ensureQueryData({
    queryKey: ["auth"],
    queryFn: getUser,
  });
  if (!user) {
    throw redirect("/login");
  }
};

export const guestMiddleware: MiddlewareFunction = async () => {
  const user = await queryClient.ensureQueryData({
    queryKey: ["auth"],
    queryFn: getUser,
  });
  if (user) {
    return redirect("/");
  }
};
