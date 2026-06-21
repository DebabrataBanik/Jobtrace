import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center pt-10 font-medium">
        {error.status} {error.statusText}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-center pt-10 font-medium">{error.message}</div>;
  }

  return (
    <div className="text-center pt-10 font-medium">
      An unknown error occurred.
    </div>
  );
}
