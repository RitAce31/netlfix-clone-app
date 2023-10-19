import { useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { getNewUser } from "../../services/Services";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    try {
      getNewUser().then((res) => {
        setNewUsers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => {
          return (
            <>
              <li className="widgetSmListItem">
                <img
                  src={
                    user.profilePic ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  }
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
