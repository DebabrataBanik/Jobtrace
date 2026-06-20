import {
  createBrowserRouter,
  RouterProvider,
  type LoaderFunctionArgs,
} from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import { authMiddleware } from "./middleware/auth";
import { userContext } from "./context/routerContext";
import HydrateFallback from "./components/HydrateFallback";

const router = createBrowserRouter([
  {
    path: "/",
    HydrateFallback: HydrateFallback,
    middleware: [authMiddleware],
    Component: Layout,
    loader: async ({ context }: LoaderFunctionArgs) => {
      const user = context.get(userContext);
      return user;
    },
    children: [
      {
        index: true,
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
