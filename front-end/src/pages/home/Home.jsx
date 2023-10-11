import React, { useEffect } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";
import { useState } from "react";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjYzM2U2NTU0YzhhNGUwYjMxODA2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzAwMjY0MywiZXhwIjoxNjk3NDM0NjQzfQ.ebhmd9PGOMTJfTd1ixwQIBbUPC8qvLPAyi-6MsxlCbY",
            },
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((item, index) => {
        <List item={item} />;
      })}
    </div>
  );
};

export default Home;
