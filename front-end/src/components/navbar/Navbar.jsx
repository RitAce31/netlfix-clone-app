import React, { useState } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const onLogoutPress = () => {
    localStorage.removeItem("user");
    dispatch(changeUser(null));
    Navigate("/login");
  };
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt=""
            />
            <NavLink to="/" className="link">
              <span>Home</span>
            </NavLink>
            <NavLink to="/series" className="link">
              <span>Series</span>
            </NavLink>
            <NavLink to="/movies" className="link">
              <span>Movies</span>
            </NavLink>
            <span>New and Popular</span>
            <span>My List</span>
          </div>
          <div className="right">
            <SearchIcon className="icon" />
            <span>KID</span>
            <NotificationsIcon className="icon" />
            <img
              src="https://i.pinimg.com/474x/33/b7/45/33b7457105d6c4c0e108ae368c2f37ff.jpg"
              alt=""
            />
            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Settings</span>
                <span onClick={onLogoutPress}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
