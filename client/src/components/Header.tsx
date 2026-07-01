import { PlusIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="flex items-center justify-between gap-2 px-4">
        <h1 className="font-medium tracking-wide">Applied Jobs</h1>
        <div className="flex gap-4">
          <label className="flex items-center relative">
            <input
              type="search"
              className="search-input peer"
              placeholder="Search"
            />
            <SearchIcon
              className="absolute left-2.5 text-text-tertiary peer-focus:text-text-primary"
              size={15}
            />
          </label>
          <button
            onClick={() => navigate("/create")}
            className="bg-accent text-accent-subtle w-9 flex items-center justify-center rounded-md hover:bg-accent-hover focus:outline-offset-2 focus:outline-accent"
          >
            <PlusIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
