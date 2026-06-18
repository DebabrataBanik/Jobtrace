import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
