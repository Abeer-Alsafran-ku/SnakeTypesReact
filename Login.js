import "../assets/css/Login.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) {
          throw Error("couldn't fetch user");
        }
        return res.json();
      })
      .then((users) => {
        const foundUser = users.find(
          (user) =>
            user.username === loginUsername && user.password === loginPassword
        );

        if (foundUser) {
          console.log("You have an account");
          setError(null);
          setUser(foundUser);
        } else {
          throw Error("username or password are incorrect");
        }
      })
      .catch((err) => {
        console.log("Error: " + err.message);
        setError(err.message);
      });
  };

  const handleLogout = () => {
    setUser(null);
    console.log("You have logged out");
  };

  if (user) {
    return (
      <div>
        <h2>You are logged in!</h2>
        <p>Welcome, {user.username}!</p>
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="flogin">
          <label htmlFor="loginUsername">Username:</label>
          <input
            type="text"
            id="loginUsername"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
        </div>
        <div className="flogin">
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="SignIn">
          Log In
        </button>
        <br />
        <br />
        {error && <div>{error}</div>}
      </form>

      <br />
      <p>
        <Link to="/register">Don't Have an Account? Register NOW!</Link>
      </p>
    </div>
  );
};

export default Login;
