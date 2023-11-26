import "../assets/css/Login.css";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/.test(
      newPassword
    );
    setPassword(newPassword);
  };

  const handeleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3800/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        console.log("You have an account");
      } else {
        console.log("You don't have an account");
      }
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  return (
    <>
      <form onSubmit={handeleLogin}>
        <div className="flogin">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="flogin">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="SignIn">
          {/*disabled={}
            onClick={handleSignUp}*/}
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
