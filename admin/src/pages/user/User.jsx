import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./user.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUser } from "../../services/Services";

export default function User() {
  const [newUser, setNewUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const location = useLocation();
  const data = location.state;

  const onCreateNewUser = (e) => {
    const value = e.target.value;
    setNewUser({ ...newUser, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label;
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
            setNewUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded(true);
          });
        }
      );
    });
  };

  const onUploadClick = (e) => {
    e.preventDefault();
    console.log(newUser);
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  const onCreateClick = (e) => {
    e.preventDefault();
    updateUser(data._id, newUser)
      .then((res) => {
        if (res.status === 200) {
          alert("User data has been updated!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.profilePic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{data.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={data.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={onCreateNewUser}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email Address</label>
                <input
                  type="text"
                  placeholder={data.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={onCreateNewUser}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="userUpdateInput"
                  name="password"
                  onChange={onCreateNewUser}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin?</label>
                <select
                  name="isSeries"
                  id="isSeries"
                  onChange={onCreateNewUser}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={data.profilePic} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="profilePic"
                  style={{ display: "none" }}
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              {uploaded ? (
                <button className="userUpdateButton" onClick={onCreateClick}>
                  Create
                </button>
              ) : (
                <button className="userUpdateButton" onClick={onUploadClick}>
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
