import { ArrowBackOutlined } from "@material-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./watch.scss";
import { useEffect, useState } from "react";

export default function Watch(props) {
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    console.log(location.state);
    setMovie(location.state);
  }, []);
  return (
    <div className="watch">
      <NavLink to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </NavLink>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}
