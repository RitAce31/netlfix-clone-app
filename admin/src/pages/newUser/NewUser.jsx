import { useState } from "react";
import "./newUser.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addUser } from "../../services/Services";

export default function NewUser() {
  const [newUser, setNewUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const onCreateNewUser = (e) => {
    const value = e.target.value;
    setNewUser({ ...newUser, [e.target.name]: value });
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
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  const onCreateClick = () => {
    addUser(newUser)
      .then((res) => {
        if (res.status === 200) {
          alert("User has been added succesfully");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john69"
            name="username"
            onChange={onCreateNewUser}
          />
        </div>
        <div className="newUserItem">
          <label>Email Address</label>
          <input
            type="text"
            placeholder="john@gmail.com"
            name="email"
            onChange={onCreateNewUser}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={onCreateNewUser}
          />
        </div>
        <div className="newUserItem">
          <label>Is Admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            id="isAdmin"
            onChange={onCreateNewUser}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="image">
          <label>Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={(e) => {
              setProfilePic(e.target.files[0]);
            }}
          />
        </div>
        {uploaded ? (
          <button className="newUserButton" onClick={onCreateClick}>
            Create
          </button>
        ) : (
          <button className="newUserButton" onClick={onUploadClick}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
