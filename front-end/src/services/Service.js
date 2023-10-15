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
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjYzM2U2NTU0YzhhNGUwYjMxODA2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzAwMjY0MywiZXhwIjoxNjk3NDM0NjQzfQ.ebhmd9PGOMTJfTd1ixwQIBbUPC8qvLPAyi-6MsxlCbY",
    },
  });
};

export const getMovie = (item) => {
  let apiUrl = url + "/movies/find/" + item;
  return axios.get(apiUrl, {
    headers: {
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjYzM2U2NTU0YzhhNGUwYjMxODA2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzAwMjY0MywiZXhwIjoxNjk3NDM0NjQzfQ.ebhmd9PGOMTJfTd1ixwQIBbUPC8qvLPAyi-6MsxlCbY",
    },
  });
};

export const getFeaturedMovie = (type) => {
  let apiUrl = url + "/movies/random/" + "?type=" + type;
  return axios.get(apiUrl, {
    headers: {
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjYzM2U2NTU0YzhhNGUwYjMxODA2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzAwMjY0MywiZXhwIjoxNjk3NDM0NjQzfQ.ebhmd9PGOMTJfTd1ixwQIBbUPC8qvLPAyi-6MsxlCbY",
    },
  });
};

export const register = (username, email, password) => {
  let obj = {
    username: username,
    email: email,
    password: password,
  };
  let apiUrl = url + "/auth/register";
  return axios.post(apiUrl, obj);
};

export const loginUser = (email, password) => {
  let obj = {
    email: email,
    password: password,
  };
  let apiUrl = url + "/auth/login";
  return axios.post(apiUrl, obj);
};
