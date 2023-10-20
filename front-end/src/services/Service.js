import axios from "axios";

let url = "http://localhost:8800/api";
export const getList = (type, genre) => {
  let apiUrl = url + "/lists";
  if (type && type !== "") {
    apiUrl += "?" + "type=" + type;
  }
  if (genre && genre !== "") {
    apiUrl += "&genre=" + genre;
  }
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

export const getMovie = (item) => {
  let apiUrl = url + "/movies/find/" + item;
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

export const getFeaturedMovie = (type) => {
  console.log(type);
  let apiUrl = url + "/movies/random/" + "?type=" + type;
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

export const register = (user) => {
  let apiUrl = url + "/auth/register";
  return axios.post(apiUrl, user);
};

export const loginUser = (email, password) => {
  let obj = {
    email: email,
    password: password,
  };
  let apiUrl = url + "/auth/login";
  return axios.post(apiUrl, obj);
};
