import { useState } from "react";
import "./login.scss";
import { loginUser } from "../../services/Service";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/slices/loginSlice";

export default function Login() {
  const performAction = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginClick = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          performAction(changeUser(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
          alert("Logged in succesfully");
        } else {
          alert("username or password worng!");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={onLoginClick}>
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <NavLink className="link" exact to="register">
              <b>Sign up now.</b>
            </NavLink>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
