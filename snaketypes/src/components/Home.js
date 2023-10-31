import {Link} from 'react-router-dom'
import '../assets/css/Home.css';

const Home = () => {
    return (
    
    <div className="Home">


        
        <ul>
            <li><Link to="/stage"><button className="btn btn-primary">Play(guest)</button></Link></li>
            <li><button className="btn btn-primary">Sign Up / Login</button></li>
        </ul>
    </div>
    );
}
 
export default Home;