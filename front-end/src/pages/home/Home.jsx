import React, { useEffect } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useState } from "react";
import { getList } from "../../services/Service";
import { useLocation } from "react-router-dom";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    try {
      getList(type, genre).then((res) => {
        setLists(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list, index) => {
        return <List list={list} />;
      })}
    </div>
  );
};

export default Home;
