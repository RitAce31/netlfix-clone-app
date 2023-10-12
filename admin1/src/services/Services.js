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
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjYzM2U2NTU0YzhhNGUwYjMxODA2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzAwMjY0MywiZXhwIjoxNjk3NDM0NjQzfQ.ebhmd9PGOMTJfTd1ixwQIBbUPC8qvLPAyi-6MsxlCbY",
    },
  });
};
