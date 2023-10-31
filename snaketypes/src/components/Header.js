import '../assets/css/Header.css';
import logo from '../assets/img/snake-logo.png'

const Header = () => {
    return (

        <div className="Header">
            <img src={logo} alt='went wrong' id="logo"></img>
            <h1 style={{textAlign: 'center', fontSize: 60}}>SnakeTypes</h1>
        </div>
     );
}
 
export default Header;