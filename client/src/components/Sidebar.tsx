import { ArchiveIcon, LayoutDashboard } from "lucide-react";
import UserItem from "./UserItem";
import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside>
      <div className="pt-1 pb-4 border-b border-b-border">
        <div className="px-2 font-semibold text-2xl tracking-wide">
          Jobtrace
        </div>
      </div>
      <div className="pt-4 px-1">
        <span className="text-xs font-medium text-text-tertiary">MAIN</span>
        <nav>
          <ul className="flex flex-col gap-1 mt-2">
            <li>
              <NavLink to="/" className="menu-item">
                <LayoutDashboard size={14} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/archived" className="menu-item">
                <ArchiveIcon size={14} />
                Archived
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <UserItem />
    </aside>
  );
}
