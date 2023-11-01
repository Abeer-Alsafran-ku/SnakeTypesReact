import {Link} from 'react-router-dom';
import '../assets/css/Side.css';
import logo from '../assets/img/snake-logo.png'

const Side = () => {
    return ( 
        <div className="Side">
            

            <nav id="sidebar" className="">
                
                {/* image on top of the nav */}
                <div className="img bg-wrap text-center py-4" style={{backgroundImage: 'url(images/bg_1.jpg)'}}>
                    <div className="user-logo">
                        <img src={logo}></img>
                        <h3 style={{marginTop: 3}}>SnakeTypes</h3>
                    </div>
                </div>

                {/* nav items */}
                <ul className="list-unstyled components mb-5">

                    <li className='active'><Link to="/stage">Play</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Settings</Link></li>
                    
                </ul>
            </nav>
        </div> 
     );
}
 
export default Side;