import "./newMovie.css";
import { useState } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addMovie } from "../../services/Services";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const onCreateMovie = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
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
            setMovie((prev) => {
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
    console.log("actual data", movie);
    addMovie(movie)
      .then((res) => {
        if (res.status === 200) {
          alert("Movie has been added succesfully");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(movie);
  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => {
              setImgTitle(e.target.files[0]);
            }}
          />
        </div>
        <div className="addMovieItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="movie title"
            name="title"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="year"
            name="year"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="genre"
            name="genre"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="duration"
            name="duration"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={onCreateMovie}
          />
        </div>
        <div className="addMovieItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={onCreateMovie}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addMovieItem">
          <label>Trailer</label>
          <input
            type="file"
            id="trailer"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Video</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded == 5 ? (
          <button className="addMovieButton" onClick={onCreateClick}>
            Create
          </button>
        ) : (
          <button className="addMovieButton" onClick={onUploadClick}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
