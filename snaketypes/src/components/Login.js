import "../assets/css/Login.css";
import React, { useState } from "react";

const Login = () => {
  //login state variables
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Registeration state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    const isValid = /^[a-zA-Z]\w{2,}$/.test(newUsername);
    setUsername(newUsername);
    setIsUsernameValid(isValid);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const isValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/.test(
        newPassword
      );
    setPassword(newPassword);
    setIsPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    const isValid = newConfirmPassword === password;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(isValid);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3800/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === loginUsername && u.password === loginPassword
      );

      if (user) {
        console.log("You have an account");
        // Redirect or navigate to the profile page
      } else {
        console.log("You don't have an account");
      }
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
      try {
        const response = await fetch("http://localhost:3800/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            //avg_wpm,
          }),
        });

        if (response.ok) {
          console.log("Registration successful");
        } else {
          console.log("Registration failed");
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      console.log("Invalid registration data");
    }
  };

  return (
    <>
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
        </form>
      </div>

      <br />
      <br />

      <div>
        <h2>Register</h2>
        <form onSubmit={handleSignUp}>
          <div className="fregister">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
            {!isUsernameValid && (
              <p>
                Username must start with a letter and contain at least 3
                characters.
              </p>
            )}

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            {!isPasswordValid && (
              <p>
                Password must contain at least 1 letter, 1 number, and 1 special
                character.
              </p>
            )}

            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </label>
            {!isConfirmPasswordValid && <p>Passwords must match.</p>}

            <button
              disabled={
                !isUsernameValid || !isPasswordValid || !isConfirmPasswordValid
              }
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
