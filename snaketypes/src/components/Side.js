import { Link } from "react-router-dom";
import "../assets/css/Side.css";
import logo from "../assets/img/snake-logo.png";
import playicon from "../assets/img/play-icon.png";
import homeicon from "../assets/img/home-icon.png";
import loginicon from "../assets/img/login-icon.png";
import profileicon from "../assets/img/profile-icon.png";

const Side = () => {
  return (
    <div className="Side">
      <nav id="sidebar" className="">
      <div className="custom-menu">
					<button type="button" id="sidebarCollapse" className="btn btn-primary"
            onClick={function(){document.getElementById('sidebar').classList.toggle('active')}}>
	        </button>
        </div>
        {/* image on top of the nav */}
        <div
          className="img bg-wrap text-center py-4"
          style={{ backgroundImage: "url(images/bg_1.jpg)" }}
        >
          <div className="user-logo">
            <img src={logo}></img>
            <h3 style={{ marginTop: 3 }}>SnakeTypes</h3>
          </div>
        </div>

        {/* nav items */}
        <ul className="list-unstyled components mb-5">
          {/*play*/}
          <li className="active">
            <Link to="/stage" className="li-container">
              <img src={playicon} width="60px"></img>
              <span>Play</span>
            </Link>
          </li>

          {/*home*/}
          <li className="active">
            <Link to="/" className="li-container">
              <img src={homeicon} width="60px"></img>
              <span>Home</span>
            </Link>
          </li>

          {/*login*/}
          <li className="active">
            <Link to="/Login" className="li-container">
              <img src={loginicon} width="60px"></img>
              <span>Log in</span>
            </Link>
          </li>

          {/*profile*/}
          <li className="active">
            <Link to="/Profile" className="li-container">
              <img src={profileicon} width="60px"></img>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Side;
