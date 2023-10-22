import logo from './img/snake-logo.png'

const Header = () => {
    return (

        <div className="header">
            <img src={logo} alt='went wrong' id="logo"></img>
            <h1 style={{textAlign: 'center', fontSize: 60}}>SnakeTypes</h1>
        </div>
     );
}
 
export default Header;