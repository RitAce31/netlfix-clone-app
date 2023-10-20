import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./featured.scss";
import { getFeaturedMovie } from "../../services/Service";
import { NavLink } from "react-router-dom";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    try {
      getFeaturedMovie(type).then((res) => {
        if (res.status === 200) {
          setContent(res.data[0]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [type]);

  console.log(content);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>
            {type === "movie" && "Movies"}
            {type === "series" && "Series"}
            {type === "anime" && "Anime"}
          </span>
          <select name="genre" id="">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img width="100%" src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <NavLink to={{ pathname: "/watch" }} state={content} className="link">
            <button className="play">
              <PlayArrowIcon />
              <span>Play</span>
            </button>
          </NavLink>
          <button className="more">
            <InfoOutlinedIcon />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
