import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center pt-10 font-medium flex flex-col items-center gap-2 text-lg">
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
    if (error.name === "TypeError") {
      return (
        <div className="text-center pt-10 font-medium flex flex-col items-center gap-2">
          <p className="text-lg">
            Couldn't connect to server.
            <span className="block">
              Please check your internet connection and try again later.
            </span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="hover:underline"
          >
            Retry
          </button>
        </div>
      );
    }
    return (
      <div className="text-center pt-10 font-medium flex flex-col items-center gap-2 text-lg">
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
