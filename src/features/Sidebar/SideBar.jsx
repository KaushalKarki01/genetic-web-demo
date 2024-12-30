import {
  IoChatbubbleEllipsesOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Doctor from "../../assets/doctor.jpg";
import User from "../../assets/user.jpg";
import "../../styles/sidebar.css";
export default function SideBar({ onLogout, user }) {
  return (
    <div className="sidebar">
      <header>
        <img
          src={user.role === "patient" ? User : Doctor}
          alt="person"
          loading="lazy"
        />
        <div className="personal-details">
          <h5>{user.email}</h5>
          <span>Miami, Florida</span>
          <p className="phone">+1 (555) 555-5555</p>
        </div>
      </header>
      <main>
        <ul>
          <li>
            <NavLink to="/dashboard/profile" className="sidebar-item">
              <IoPersonOutline className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/chat" className="sidebar-item">
              <IoChatbubbleEllipsesOutline className="icon" />
              <span>Chat</span>
            </NavLink>
          </li>

          <li className="sidebar-item" onClick={onLogout}>
            <IoLogOutOutline className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </main>
    </div>
  );
}
