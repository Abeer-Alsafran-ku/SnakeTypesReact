import "../assets/css/Login.css";
import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import defaultIcon from "../assets/img/profile-icon.jpg";

const Register = () => {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameValid(/^[a-zA-Z].{2,}$/.test(value));
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/.test(value)
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsConfirmPasswordValid(value === password);
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
      throw Error("Registration is not valid");
    }

    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          avg_wpm: 0,
          img: defaultIcon,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("couldn't fetch user");
          }
          console.log("Registration successful");
          return res.json();
        })
        .then((user) => {
          console.log("Registration successful");
          setUser(user);
          setRegistrationSuccess(true);
        })
        .catch((err) => {
          console.log("Error: " + err.message);
        });
    }
  };

  const handleLogout = () => {
    setUser(null);
    console.log("You have logged out");
  };

  if (registrationSuccess) {
    return (
      <div>
        <h2>You are logged in!</h2>
        <p>Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="flogin">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsername}
          />
          {!isUsernameValid && (
            <p>
              Username must start with a letter and contain at least 3
              characters.
            </p>
          )}
        </div>

        <div className="flogin">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          {!isPasswordValid && (
            <p>
              Password must contain at least 1 letter, 1 number, and 1 special
              character.
            </p>
          )}
        </div>

        <div className="flogin">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!isConfirmPasswordValid && <p>Passwords must match.</p>}
        </div>

        <button
          type="submit"
          className="SignIn"
          disabled={
            !isUsernameValid || !isPasswordValid || !isConfirmPasswordValid
          }
          //onClick={handleSignUp}
        >
          Sign Up!
        </button>

        <br />
        <br />
      </form>
    </div>
  );
};

export default Register;
