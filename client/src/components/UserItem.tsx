import { ChevronRightIcon } from "lucide-react";

export default function UserItem() {
  return (
    <div className="border-t border-t-border pt-3 mt-auto">
      <button className="group w-full flex items-center p-2 gap-2 hover:bg-accent-subtle rounded-sm duration-300">
        <div className="w-8 h-8 rounded-full bg-accent"></div>
        <div className="text-xs text-left">
          <p className="font-medium">Johnny Dough</p>
          <span>johnny@dough.com</span>
        </div>
        <ChevronRightIcon
          size={15}
          className="ml-auto duration-100 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}
