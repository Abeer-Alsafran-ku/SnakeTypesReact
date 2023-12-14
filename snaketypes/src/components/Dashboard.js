import React, { useContext, useState, useEffect } from "react";
import MiniChart from "./MiniChart";
import { UserContext } from "./App";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) {
          throw Error("couldn't fetch users");
        }
        return res.json();
      })
      .then((users) => {
        setAllUsers(users);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }, []);

  return <div></div>;
};

export default Dashboard;
