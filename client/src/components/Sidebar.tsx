import { ArchiveIcon, LayoutDashboard } from "lucide-react";
import UserItem from "./UserItem";

export default function Sidebar() {
  return (
    <aside>
      <div className="pb-4 border-b border-b-border">
        <div className="px-1 font-semibold text-xl">Jobtrace</div>
      </div>
      <div className="pt-4 px-1">
        <span className="text-xs font-medium text-text-tertiary">MAIN</span>
        <nav>
          <ul className="flex flex-col gap-1 mt-2">
            <li>
              <button className="menu-item active">
                <LayoutDashboard size={14} />
                Dashboard
              </button>
            </li>
            <li>
              <button className="menu-item">
                <ArchiveIcon size={14} />
                Archived
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <UserItem />
    </aside>
  );
}
