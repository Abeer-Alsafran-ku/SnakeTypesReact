import "../assets/css/Login.css";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);

  /*useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);*/

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
          localStorage.setItem("user", JSON.stringify(foundUser));
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
    localStorage.removeItem("user");
    setUser(null);
    console.log("You have logged out");
  };

  if (user) {
    return (
      <div>
        <h2>You are logged in!</h2>
        <p>Welcome, {user.username}!</p>
        <img src={user.img} alt={user.username} style={{maxWidth: "10%", borderRadius: "50%",
          marginRight: "10px",
        }}/>
        
        <div style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto", width: "20%"}}>
          <Link to="/stage" className="start-button">
          Let's Play 🐍!
          </Link>
        </div>

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
