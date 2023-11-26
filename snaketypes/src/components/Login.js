import "../assets/css/Login.css";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    // Validate username (Starts with a letter, contains at least 3 letters)
    const isValid = /^[a-zA-Z][a-zA-Z0-9]{2,}$/.test(newUsername);
    setUsername(newUsername);
    setIsUsernameValid(isValid);
  };

  /*  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };*/

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    // Validate password (At least 1 letter, 1 number, 1 special character)
    const isValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/.test(
        newPassword
      );
    setPassword(newPassword);
    setIsPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    // Validate that confirm password matches the password
    const isValid = newConfirmPassword === password;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(isValid);
  };

  const handleSignUp = () => {
    // Perform registration logic here
    console.log("Registration successful!");
  };

  return (
    <>
      <form className="flogin">
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text"></input>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password"></input>
          </div>
          <button type="submit" className="SignIn">
            {/*disabled={}
            onClick={handleSignUp}*/}
            Log In
          </button>
        </form>

        <br />
        <br />

        <form>
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
      </form>
    </>
  );
};

export default Login;
