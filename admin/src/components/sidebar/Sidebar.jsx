import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink to="/newUser" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add new user
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Movie Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/movies" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Movies
              </li>
            </NavLink>
            <NavLink to="/newmovie" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Add new Movie
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">List Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/lists" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Lists
              </li>
            </NavLink>
            <NavLink to="/newList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Add new list
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
