import { useLocation, useNavigate } from "react-router-dom";
import "./newList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, getMovieList } from "../../services/Services";
import { changeMovies } from "../../redux/slices/movieSlice";

export default function NewList() {
  const data = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [list, setList] = useState(null);
  const Navigate = useNavigate();

  const onChangeList = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };
  console.log(list);

  const onSelectMovies = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const onCreateListClick = (e) => {
    e.preventDefault();
    addList(list)
      .then((res) => {
        if (res.status === 200) {
          alert("List had been added succesfully!");
          Navigate("/lists");
        } else {
          alert("Please check all the fields correctly!");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieList()
      .then((res) => {
        dispatch(changeMovies(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New List</h1>
      <form className="addUserForm">
        <div className="formLeft">
          <div className="addUserItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="movie title"
              name="title"
              onChange={onChangeList}
            />
          </div>
          <div className="addUserItem">
            <label>Type</label>
            <select name="type" id="type" onChange={onChangeList}>
              <option value="series">Series</option>
              <option value="movie">Movie</option>
            </select>
          </div>
          <div className="addUserItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="genre"
              name="genre"
              onChange={onChangeList}
            />
          </div>
        </div>
        <div className="formRight">
          <div className="addUserItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              id="content"
              onChange={onSelectMovies}
              style={{ height: 224 }}
            >
              {data.movies.map((movie) => {
                return (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
            <div className="addUserItem">
              <button className="addUserButton" onClick={onCreateListClick}>
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
