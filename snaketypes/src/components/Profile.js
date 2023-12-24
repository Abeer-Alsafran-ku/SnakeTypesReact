import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import MiniChart from "./MiniChart";
import MiniProfile from "./MiniProfile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserContext } from "./App";
import defaultIcon from "../assets/img/profile-icon.jpg";
import { Link } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3%",
        }}
      >
        <img
          id="user-avatar"
          src={user ? user.img : defaultIcon}
          className="rounded-circle"
          alt="Avatar"
          style={{ display: "flex", maxWidth: "7%" }}
        />
        <Card.Title>{user ? user.username : "Guest"}</Card.Title>
        
        {user ? (
          <Card.Text>Nice to see you again {user.username} ^_^</Card.Text>
        ) : (
          <Card.Text>
            {/*Some quick example text to build on the card title and make up the
            bulk of the card's content.*/}
            <p>
              <Link to="/login">Log in or Sign up now!</Link>
            </p>
          </Card.Text>
        )}
        <Card.Subtitle className="mb-2 text-muted">
          {user ? `Highest Score is ${user.score}` : ""}{" "}
        </Card.Subtitle>
        {/*{user ? <MiniChart /> : ""}
        <Card.Link href="#"> View Stats</Card.Link>
        <Card.Link href="#">View Leader board</Card.Link>
        <Link to="/dashboard">Dashboard!</Link>*/}
        <LeaderBoard />
      </div>
    </>
  );
};

export default Profile;
