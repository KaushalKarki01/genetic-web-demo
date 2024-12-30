import { Outlet } from "react-router-dom";
import SideBar from "../features/Sidebar/SideBar";
import "../styles/layout.css";

export default function AppLayout({ onLogout, user }) {
  return (
    <div className="layout">
      <SideBar onLogout={onLogout} user={user} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
