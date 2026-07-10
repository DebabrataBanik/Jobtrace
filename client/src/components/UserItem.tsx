import { ChevronRightIcon } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth.service";

export default function UserItem() {
  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
  });
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  return (
    <div className="border-t border-t-border pt-3 mt-auto sticky bottom-4">
      <button
        onClick={() => setShowUserDropdown((prev) => !prev)}
        className="group w-full flex items-center p-2 gap-2 hover:bg-accent-subtle rounded-sm duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-accent"></div>
        <div className="text-xs text-left">
          <p className="font-medium line-clamp-1">
            {user ? user.name : "Johnn Dough(Guest)"}
          </p>
          <span className="line-clamp-1">
            {user ? user.email : "johnn@dough.com"}
          </span>
        </div>
        <ChevronRightIcon
          size={15}
          className="ml-auto duration-100 group-hover:translate-x-0.5"
        />
      </button>
      {showUserDropdown && <UserDropdown />}
    </div>
  );
}
