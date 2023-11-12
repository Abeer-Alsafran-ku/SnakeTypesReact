import "../assets/css/Login.css";
const Login = () => {
  return (
    <div className="Login">
      <form className="login">
        <div>
          <input type="email" placeholder="Enter your email .."></input>
        </div>
        <div>
          <input type="password" placeholder="Enter your password .."></input>
        </div>
        <button type="submit" className="SignIn">
          Log In
        </button>
      </form>
      <br />
      <br />
      <br></br>

      <form className="register">
        <div>
          <input type="user" placeholder="Enter your name .."></input>
        </div>
        <div>
          <input type="email" placeholder="Enter your email .."></input>
        </div>
        <div>
          <input type="password" placeholder="Enter your password .."></input>
        </div>
      </form>

      <button type="submit" className="SignIn">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
