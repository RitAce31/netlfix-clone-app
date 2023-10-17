import axios from "axios";

const url = "http://localhost:8800/api";

export const getUserStats = () => {
  let apiUrl = url + "/users/stats";
  return axios.get(apiUrl);
};

export const getNewUser = () => {
  let apiUrl = url + "/users?new=true";
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

export const loginUser = (email, password) => {
  const user = {
    email: email,
    password: password,
  };
  let apiUrl = url + "/auth/login";
  return axios.post(apiUrl, user);
};

export const getMovieList = () => {
  let apiUrl = url + "/movies";
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

export const deleteMovieList = (id) => {
  let apiUrl = url + "/movies/" + id;
  return axios.delete(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};
