import { ArrowBackOutlined } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  let location = useLocation();
  console.log(location.movie);
  return (
    <div className="watch">
      <NavLink to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </NavLink>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={location.state}
      />
    </div>
  );
}
