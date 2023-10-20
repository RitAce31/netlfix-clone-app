import React from "react";
import "./app.scss";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  const loginData = useSelector((state) => state.login);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={loginData.user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/register"
          element={!loginData.user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/login"
          element={!loginData.user ? <Login /> : <Navigate to="/" />}
        />
        {loginData.user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/anime" element={<Home type="anime" />} />
            <Route path="/watch" element={<Watch />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
