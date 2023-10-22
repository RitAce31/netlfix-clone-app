import React, { useState } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((state) => state.login);
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(data);

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
              <span className="navbarmainLinks">Home</span>
            </NavLink>
            <NavLink to="/series" className="link">
              <span className="navbarmainLinks">Series</span>
            </NavLink>
            <NavLink to="/movies" className="link">
              <span className="navbarmainLinks">Movies</span>
            </NavLink>
            <NavLink to="/anime" className="link">
              <span className="navbarmainLinks">Anime</span>
            </NavLink>
          </div>
          <div className="right">
            <SearchIcon className="icon navbarmainIcons" />
            <span className="navbarmainIcons">KID</span>
            <NotificationsIcon className="icon navbarmainIcons" />
            <img src={data.user.info.profilePic} alt="" />
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
