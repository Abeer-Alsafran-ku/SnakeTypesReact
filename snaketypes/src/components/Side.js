import {Link} from 'react-router-dom';
import '../assets/css/Side.css';

const Side = () => {
    return ( 
        <div className="Side">
            

            <nav id="sidebar" className="">
                
                {/* image on top of the nav */}
                <div className="img bg-wrap text-center py-4" style={{backgroundImage: 'url(images/bg_1.jpg)'}}>
                    <div className="user-logo">
                        <div className="img" style={{backgroundImage: 'url(../src/assets/img/)'}}></div>
                        <h3>SnakeTypes</h3>
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