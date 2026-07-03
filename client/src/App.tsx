import {
  createBrowserRouter,
  RouterProvider,
  type LoaderFunctionArgs,
} from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Archived from "./pages/archived";
import Login from "./pages/login";
import Register from "./pages/register";
import { authMiddleware, guestMiddleware } from "./middleware/auth";
import { userContext } from "./context/routerContext";
import HydrateFallback from "./components/HydrateFallback";
import NotFound from "./pages/not-found";
import Error from "./components/Error";
import ApplicationForm from "./pages/application-form";
import { queryClient } from "./lib/queryClient";
import { getApplication } from "./services/applicationService";

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
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "archived",
        Component: Archived,
      },
      {
        path: "create",
        element: <ApplicationForm mode="create" />,
      },
      {
        path: "/:id/edit",
        element: <ApplicationForm mode="edit" />,
        loader: async ({ params }) => {
          const { id } = params;
          if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            throw new Response("Invalid application id", { status: 400 });
          }
          await queryClient.ensureQueryData({
            queryKey: ["application", id],
            queryFn: () => getApplication(id),
          });

          return null;
        },
      },
    ],
  },
  {
    middleware: [guestMiddleware],
    HydrateFallback: HydrateFallback,
    ErrorBoundary: Error,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
