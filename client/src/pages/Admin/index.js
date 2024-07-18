import React, { Children } from "react";

import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";
import MovieFrom from "./MovieForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Admin() {
  const navigate = useNavigate();
  const checkUser = async () => {
    const response = await axios.get("/api/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.data.role === "partner") {
      navigate("/partner");
      message.error("You are not authorized to view this page");
    }
    if (response.data.data.role === "user") {
      navigate("/");
      message.error("You are not authorized to view this page");
    }
  };
  checkUser();

  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },

    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];

  return (
    <div>
      <h1>Admin Page</h1>

      <Tabs items={tabItems} />
    </div>
  );
}

export default Admin;
