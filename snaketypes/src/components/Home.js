import { Link } from "react-router-dom";
import "../assets/css/Home.css";
import { useEffect, useState } from "react";
import MiniProfile from "./MiniProfile";
import fetchObj from "../assets/js/utils";

const Home = () => {

  return (
    <>
      <MiniProfile />
      <div className="Home">
        <div>
          <h5>Game Description</h5>
          <p>
            SnakeTypes is a fun and educational typing game designed to improve
            your typing skills. Challenge yourself with various words while
            controlling the snake's movement. The goal is to type the displayed
            words correctly before the snake reaches the end of the stage
            screen. Track your progress and improve yuor typing skill!
          </p>
        </div>

        <div>
          <h5>How to Play</h5>
          <p>
            Playing SnakeTypes is simple and fun! Follow these steps to get
            started:
          </p>
          <ul>
            <li>
              Login or sign up to track your progress.You can continue as a
              guset too!
            </li>
            <li>Visit the Stage to start the game.</li>
            <li>
              Type the displayed words as quickly and accurately as possible.
            </li>
            <li>Watch your WPM (Words Per Minute) improve over time ^_^</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
