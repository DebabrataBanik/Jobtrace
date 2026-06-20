import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="font-medium text-xl w-80 text-center">
        Sorry, the page you're looking for doesn not exist!
      </h1>
      <Link to="/" replace className="hover:underline">
        Return home
      </Link>
    </div>
  );
}
