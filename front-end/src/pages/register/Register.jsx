import React, { useEffect, useState } from "react";
import "./register.scss";
import { register } from "../../services/Service";
import { NavLink, useNavigate } from "react-router-dom";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const Navigate = useNavigate();
  console.log(user);
  const onSubmitClick = (e) => {
    e.preventDefault();
    register(user)
      .then((d) => {
        console.log(d.data);
        if (d.status == 201) {
          alert("Registration has been successfully completed");
          Navigate("/login");
        } else {
          alert("Problem occured during register process.");
          console.log(d.data);
        }
      })
      .catch((ex) => {
        console.log(ex);
        alert("Problem occured during register process.");
      });
  };

  const onChangeUser = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
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
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setIsUploaded(true);
          });
        }
      );
    });
  };

  const onUploadClick = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
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
          <button
            className="loginButton"
            onClick={() => {
              console.log("clicked");
            }}
          >
            Sign in
          </button>
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {uploaded === 0 && (
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChangeUser}
                required
              />
              <button className="registerButton" onClick={() => setUploaded(1)}>
                Enter
              </button>
            </div>
          )}
          {uploaded === 1 && (
            <div className="input">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={onChangeUser}
                required
              />
              <button className="registerButton" onClick={() => setUploaded(2)}>
                Enter
              </button>
            </div>
          )}
          {uploaded === 2 && (
            <div className="input">
              <input
                type="text"
                placeholder="Enter password"
                name="password"
                onChange={onChangeUser}
                required
              />
              <button className="registerButton" onClick={() => setUploaded(3)}>
                Enter
              </button>
            </div>
          )}
          {uploaded === 3 && (
            <div className="input">
              <input
                type="file"
                name="profilePic"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setProfilePic(e.target.files[0])}
                required
              />
              {isUploaded ? (
                <button className="registerButton" onClick={onSubmitClick}>
                  Get Started
                </button>
              ) : (
                <button className="registerButton" onClick={onUploadClick}>
                  Upload
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
