import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.login);

  const onClickLogOut = () => {
    dispatch(changeUser(null));
    localStorage.removeItem("user");
    Navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ritaceadmin</span>
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
            <img src={data.user.info.profilePic} alt="" className="topAvatar" />
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
