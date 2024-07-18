import { message, Tabs } from "antd";
import TheatreList from "./TheatreList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Partner = () => {
  // const onChange = (key) => {
  //     console.log(key);
  //   };
  const navigate = useNavigate();
  const checkUser = async () => {
    const response = await axios.get("/api/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.data.role === "admin") {
      navigate("/admin");
      message.error("You are not authorized to view this page");
    }
    if (response.data.data.role === "user") {
      navigate("/");
      message.error("You are not authorized to view this page");
    }
  };

  checkUser();

  const items = [
    {
      key: "1",
      label: "Theatres",
      children: <TheatreList />,
    },

    // {
    //   key: '3',
    //   label: 'Tab 3',
    //   children: 'Content of Tab Pane 3',
    // },
  ];

  return (
    <>
      <h1>Partner Page</h1>
      <Tabs defaultActiveKey="2" items={items} />
    </>
  );
};

export default Partner;
