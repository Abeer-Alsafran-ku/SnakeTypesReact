import React, { useContext, useState, useEffect } from "react";
import MiniChart from "./MiniChart";
import { UserContext } from "./App";
import "../assets/css/Leaderboard.css"

const LeaderBoard = () => {
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
        const sortedUsers = users.sort((a, b) => b.score - a.score);
        setAllUsers(sortedUsers);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }, []);

  return (
  <div className="leaderboard-container">
    <h2>Leader Bboard</h2>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((userItem, index) => (
          <tr key={userItem.id} className={userItem.id === (user && user.id) ? "current-user" : ""}>
            <td>{index + 1}</td>
            <td>
              <img src={userItem.img} alt={userItem.username} className="user-img" />
              <span style={{ fontWeight: userItem.id === (user && user.id) ? "bold" : "normal", color: userItem.id === (user && user.id) ? "green" : "inherit" }}> 
              {userItem.username}
              </span>
            </td>
            <td>{userItem.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )};

export default LeaderBoard;
