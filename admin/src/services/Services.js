import axios from "axios";

const url = "http://localhost:8800/api";

//LOGIN API
export const loginUser = (email, password) => {
  const user = {
    email: email,
    password: password,
  };
  let apiUrl = url + "/auth/login";
  return axios.post(apiUrl, user);
};

//GET USER STATS
export const getUserStats = () => {
  let apiUrl = url + "/users/stats";
  return axios.get(apiUrl);
};

//GET NEW USER
export const getNewUser = () => {
  let apiUrl = url + "/users?new=true";
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};
//DELETE USER
export const deleteUser = (id) => {
  let apiUrl = url + "/users/" + id;
  return axios.delete(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};
//ADD NEW USER
export const addUser = (newUser) => {
  let apiUrl = url + "/users/";
  return axios.post(apiUrl, newUser, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};
//UPDATE USER
export const updateUser = (id, updatedUser) => {
  let apiUrl = url + "/users/" + id;
  return axios.put(apiUrl, updatedUser, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//GET MOVIE
export const getMovieList = () => {
  let apiUrl = url + "/movies";
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//DELETE MOVIE
export const deleteMovieList = (id) => {
  let apiUrl = url + "/movies/" + id;
  return axios.delete(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//ADD MOVIE
export const addMovie = (movie) => {
  let apiUrl = url + "/movies/";
  return axios.post(apiUrl, movie, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//UPDATE MOVIE
export const updateMovie = (id, updatedMovie) => {
  let apiUrl = url + "/movies/" + id;
  return axios.put(apiUrl, updatedMovie, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//GET LISTS
export const getList = () => {
  let apiUrl = url + "/lists";
  return axios.get(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

//DELETE MOVIE
export const deleteList = (id) => {
  let apiUrl = url + "/lists/" + id;
  return axios.delete(apiUrl, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};
