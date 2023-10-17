import React, { useState } from "react";
import "./login.css";
import { loginUser } from "../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(changeUser(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
          Navigate("/");
          alert("Logged in succesfully");
        } else {
          alert("email address or password wrong!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="loginButton" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}
