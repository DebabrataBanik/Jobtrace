import { useNavigate } from "react-router";
import { UserIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { SunIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { useTheme } from "../context/themeContext";
import { useQueryClient } from "@tanstack/react-query";

export default function UserDropdown() {
  const { toggleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function logout() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="absolute z-10 bg-bg-primary bottom-0 -right-40 border border-border-subtle rounded-lg w-35">
      <div className="flex flex-col py-2">
        <button className="user_dropdown-item hover:bg-bg-secondary">
          <UserIcon size={15} />
          Profile
        </button>
        <button
          onClick={toggleTheme}
          className="user_dropdown-item hover:bg-bg-secondary"
        >
          {isDarkMode ? <MoonIcon size={15} /> : <SunIcon size={15} />}
          Theme
        </button>
      </div>
      <div className="flex py-1 border-t border-t-border">
        <button
          onClick={logout}
          className="w-full user_dropdown-item hover:bg-error-subtle text-error"
        >
          <LogOutIcon size={15} />
          Logout
        </button>
      </div>
    </div>
  );
}
