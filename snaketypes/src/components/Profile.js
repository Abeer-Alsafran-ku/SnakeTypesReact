import React from "react";
import Card from "react-bootstrap/Card";
import MiniChart from "./MiniChart";
import MiniProfile from "./MiniProfile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Profile = () => {
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
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle"
          alt="Avatar"
          style={{ display: "flex", maxWidth: "7%" }}
        />
        <Card.Title>{"Username"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {"average 50 wpm"}
        </Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">View Stats</Card.Link>
        <Card.Link href="#">Edit Profile</Card.Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MiniChart />
      </div>
    </>
  );
};

export default Profile;
