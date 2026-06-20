import { ChevronRightIcon } from "lucide-react";
import { useLoaderData } from "react-router";

export default function UserItem() {
  const user = useLoaderData();
  return (
    <div className="border-t border-t-border pt-3 mt-auto">
      <button className="group w-full flex items-center p-2 gap-2 hover:bg-accent-subtle rounded-sm duration-300">
        <div className="w-8 h-8 rounded-full bg-accent"></div>
        <div className="text-xs text-left">
          <p className="font-medium line-clamp-1">
            {user ? user.name : "Johnny Dough"}
          </p>
          <span className="line-clamp-1">
            {user ? user.email : "johnny@dough.com"}
          </span>
        </div>
        <ChevronRightIcon
          size={15}
          className="ml-auto duration-100 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}
