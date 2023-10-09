import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./featured.scss";

const Featured = ({ type }) => {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
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
      <img
        width="100%"
        src="https://lh3.googleusercontent.com/Ryg5ih-fOWbpEGDpbJYJz5RTq3_28Tvo2h3JQRCdiz16lw5ghitDMN6hcWA57g0d6_8VOqQYcCemRBOfZGQA64ZKkFOn71zuF1LDsXwCh4ywF-_z6VqxbBqmbQvK_-PWfZcztxDd1WDTEEUHX6GdP60"
        alt=""
      />
      <div className="info">
        <img src="https://i.imgur.com/QKsDxyn.jpg" alt="" />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          nostrum amet perferendis aliquid iusto ab consectetur enim, incidunt
          voluptate voluptatum fugit consequuntur neque libero, dolores ad sint
          nemo? Quisquam, sed.\
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
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
