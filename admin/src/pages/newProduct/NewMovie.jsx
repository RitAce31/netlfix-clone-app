import "./newMovie.css";

export default function NewMovie() {
  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addMovieItem">
          <label>Title Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addMovieItem">
          <label>Thumbnail Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addMovieItem">
          <label>Title</label>
          <input type="text" placeholder="movie title" />
        </div>
        <div className="addMovieItem">
          <label>Description</label>
          <input type="text" placeholder="description" />
        </div>
        <div className="addMovieItem">
          <label>Year</label>
          <input type="text" placeholder="year" />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" />
        </div>
        <div className="addMovieItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" />
        </div>
        <div className="addMovieItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" />
        </div>
        <div className="addMovieItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addMovieItem">
          <label>Trailer</label>
          <input type="file" id="file" />
        </div>
        <div className="addMovieItem">
          <label>Video</label>
          <input type="file" id="file" />
        </div>
        <button className="addMovieButton">Create</button>
      </form>
    </div>
  );
}
