import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { updateMovie } from "../../services/Services";

export default function Movie() {
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const location = useLocation();
  const movie = location.state;

  const onUpdateMovie = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      //Create folder firebase storage and push an item
      const storageRef = ref(storage, `items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      //UPLOADING PROGRESS
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Uploading is " + progress + "% done.");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const onUploadClick = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  const onCreateClick = (e) => {
    e.preventDefault();
    updateMovie(movie._id, updatedMovie)
      .then((res) => {
        if (res.status === 200) {
          alert("Movie has been updated!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="movie">
      <div className="movieTitleContainer">
        <h1 className="movieTitle">Movies</h1>
        <Link to="/newmovie">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <div className="movieTop">
        <div className="movieTopRight">
          <div className="movieInfoTop">
            <img src={movie.img} alt="" className="movieInfoImg" />
            <span className="movieName">{movie.title}</span>
          </div>
          <div className="movieInfoBottom">
            <div className="movieInfoItem">
              <span className="movieInfoKey">id:</span>
              <span className="movieInfoValue">{movie._id}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">genre:</span>
              <span className="movieInfoValue">{movie.genre}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">year:</span>
              <span className="movieInfoValue">{movie.year}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">limit:</span>
              <span className="movieInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="movieBottom">
        <form className="movieForm">
          <div className="movieFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={onUpdateMovie}
            />
            <label>Movie Description</label>
            <input
              type="text"
              placeholder={movie.desc}
              name="desc"
              onChange={onUpdateMovie}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={onUpdateMovie}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={onUpdateMovie}
            />
            <label>Duration</label>
            <input
              type="text"
              placeholder={movie.duration}
              name="duration"
              onChange={onUpdateMovie}
            />
            <label>limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={onUpdateMovie}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <label>Image</label>
            <input
              type="file"
              placeholder={movie.img}
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label>Title Image</label>
            <input
              type="file"
              placeholder={movie.imgTitle}
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
            <label>Thumbnail Image</label>
            <input
              type="file"
              placeholder={movie.imgSm}
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>
        </form>
        {uploaded == 5 ? (
          <button className="movieAddButton" onClick={onCreateClick}>
            Update
          </button>
        ) : (
          <button className="movieAddButton" onClick={onUploadClick}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
