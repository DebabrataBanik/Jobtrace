import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: async () => {
          try {
            const res = await fetch("http://localhost:8000/auth/me", {
              credentials: "include",
            });
            if (!res.ok) {
              return redirect("login");
            }
            return { user: await res.json() };
          } catch {
            return redirect("login");
          }
        },
        Component: Dashboard,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
