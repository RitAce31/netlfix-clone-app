import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { useEffect, useState } from "react";
import { updateList } from "../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList } from "../../services/Services";
import { changeMovies } from "../../redux/slices/movieSlice";

export default function Movie() {
  const [updatedList, setUpdatedList] = useState(null);
  const data = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const location = useLocation();
  const list = location.state;

  const onChangeList = (e) => {
    const value = e.target.value;
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const onSelectMovies = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedList({ ...list, [e.target.name]: value });
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    updateList(list._id, updatedList)
      .then((res) => {
        if (res.status === 200) {
          alert("List has been updated succesfully!");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(updatedList);

  useEffect(() => {
    getMovieList()
      .then((res) => {
        dispatch(changeMovies(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="movie">
      <div className="movieTitleContainer">
        <h1 className="movieTitle">Edit List</h1>
        <Link to="/newList">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <div className="movieTop">
        <div className="movieTopRight">
          <div className="movieInfoBottom">
            <div className="movieInfoItem">
              <span className="movieInfoKey">id:</span>
              <span className="movieInfoValue">{list._id}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">title:</span>
              <span className="movieInfoValue">{list.title}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">type:</span>
              <span className="movieInfoValue">{list.type}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">genre:</span>
              <span className="movieInfoValue">{list.genre}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="movieBottom">
        <form className="movieForm">
          <div className="movieFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={list.title}
              name="title"
              onChange={onChangeList}
            />
            <label>Type</label>
            <select name="type" id="type" onChange={onChangeList}>
              <option></option>
              <option value="series">Series</option>
              <option value="movie">Movie</option>
            </select>
            <label>Genre</label>
            <input
              type="text"
              placeholder={list.genre}
              name="genre"
              onChange={onChangeList}
            />
            <label>Content</label>
            <select
              multiple
              name="content"
              id="content"
              placeholder={list.content}
              onChange={onSelectMovies}
            >
              {data.movies.map((movie) => {
                return (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <button className="movieAddButton" onClick={onUpdateClick}>
          Update
        </button>
      </div>
    </div>
  );
}
