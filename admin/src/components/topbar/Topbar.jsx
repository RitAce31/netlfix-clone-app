import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onClickLogOut = () => {
    dispatch(changeUser(null));
    localStorage.removeItem("user");
    Navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
          </div>
          <div className="topbarIconContainer">
            <button className="button" onClick={onClickLogOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
