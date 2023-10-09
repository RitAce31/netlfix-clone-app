import React, { useRef, useState } from "react";
import "./register.scss";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const onFirstButtonClick = () => {
    setEmail(emailRef.current.value);
  };
  const onSecondButtonClick = (e) => {
    setPassword(passwordRef.current.value);
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
          {!email ? (
            <div className="input">
              <input type="email" placeholder="Email address" ref={emailRef} />
              <button className="registerButton" onClick={onFirstButtonClick}>
                Get Started
              </button>
            </div>
          ) : (
            <div className="input">
              <input
                type="text"
                placeholder="Enter password"
                ref={passwordRef}
              />
              <button className="registerButton" onClick={onSecondButtonClick}>
                Start
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
