import React, { useContext, useEffect, useRef, useState } from "react";
import "./register.scss";
import { register } from "../../services/Service";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const Navigate = useNavigate();
  const handleClick = () => {
    register(username, email, password)
      .then((d) => {
        console.log(d.data);
        if (d.status == 201) {
          alert("Registered success by ritesh bhangi...");
          Navigate("/login");
        } else {
          alert("Problem occured during register process.");
        }
      })
      .catch((ex) => {
        console.log(ex);
        //alert("Problem occured during register process.");
      });
    //RegsiterUser({ username, email, password }, dispatch);
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="logo"
          />
          <button className="loginButton">Sign in</button>
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="input">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="registerButton">Get Started</button>
          </div>
          <div className="input">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="registerButton">Get Started</button>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleClick}>
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
