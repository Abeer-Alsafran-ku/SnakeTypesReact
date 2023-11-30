import React from "react";
import Card from "react-bootstrap/Card";
import MiniChart from "./MiniChart";
import MiniProfile from "./MiniProfile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Profile = ({ isLoggedIn }) => {
  const defaultUserData = {
    username: "Guest",
    avg_wpm: 0,
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fprofile-icon&psig=AOvVaw0b8pGqQmG_UYiInDS-zwDR&ust=1701388921592000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPj50-S16oIDFQAAAAAdAAAAABAJ",
  };

  //the actual data if the user logged in
  const userData = isLoggedIn
    ? {
        username: "JohnDoe",
        avatar_wpm: 50,
        img: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      }
    : defaultUserData;

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
          src={userData.img}
          /*https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fprofile-icon&psig=AOvVaw0b8pGqQmG_UYiInDS-zwDR&ust=1701388921592000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPj50-S16oIDFQAAAAAdAAAAABAJ*/
          className="rounded-circle"
          alt="Avatar"
          style={{ display: "flex" }}
        />
        <Card.Title>{userData.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {`average ${userData.avg_wpm} wpm`}
        </Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        {/*<Card.Link href="#">View Stats</Card.Link>
          <Card.Link href="#">Edit Profile</Card.Link>*/}
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
