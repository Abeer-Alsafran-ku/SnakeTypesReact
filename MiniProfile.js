import "../assets/css/MiniProfile.css";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import MiniChart from "./MiniChart";
import { UserContext } from "./App";
import defaultIcon from "../assets/img/profile-icon.jpg";

const MiniProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="MiniProfile">
      <Card style={{ width: "13rem", height: "16rem", border: "none" }}>
        <Card.Body>
          <img
            id="user-avatar"
            src={user ? user.img : defaultIcon}
            className="rounded-circle"
            alt="Avatar"
          />
          <Card.Title>{user ? user.username : "Guest"}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user ? `Average ${user.avg_wpm} wpm` : ""}
          </Card.Subtitle>
          {/* <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text> */}
          {user ? (
            <ul id="profile-nav">
              <li>
                <Card.Link href="#">View Stats</Card.Link>
              </li>
              <li>
                <Card.Link href="#">View Profile</Card.Link>
              </li>
            </ul>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MiniProfile;
