import {Link} from 'react-router-dom'

const Nav = () => {
    return (
    
    <div className="nav-container">
        <ul>
            <li><Link to="/stage"><button className="btn btn-primary">Play(guest)</button></Link></li>
            <li><button className="btn btn-primary">Sign Up / Login</button></li>
        </ul>
    </div>
    );
}
 
export default Nav;