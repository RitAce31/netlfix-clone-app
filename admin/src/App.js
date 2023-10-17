import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import Movie from "./pages/movie/Movie";
import { useSelector } from "react-redux";
import MovieList from "./pages/movieList/MoviesList";
import NewMovie from "./pages/newMovie/NewMovie";

function App() {
  const loginData = useSelector((state) => state.login);
  let user = loginData.user;
  return (
    <BrowserRouter>
      {user && <Topbar />}
      <div className="container">
        {user && <Sidebar />}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<Movie />} />
          <Route path="/newmovie" element={<NewMovie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
