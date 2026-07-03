import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center pt-10 font-medium flex flex-col items-center gap-2">
        {error.status} - {error.data}
        <button
          onClick={() => navigate("/", { replace: true })}
          className="hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="text-center pt-10 font-medium flex flex-col items-center gap-2">
        {error.message}
        <button
          onClick={() => navigate("/", { replace: true })}
          className="hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center pt-10 font-medium">
      An unknown error occurred.
    </div>
  );
}
