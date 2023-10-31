import {Link} from 'react-router-dom';
import '../assets/css/Side.css';

const Side = () => {
    return ( 
        <div className="Side">
            

    <nav id="sidebar" className="">
        <div className="custom-menu">
            <button type="button" id="sidebarCollapse" className="btn btn-primary"></button>
        </div>

        <div className="img bg-wrap text-center py-4" style={{backgroundImage: 'url(images/bg_1.jpg)'}}>
            <div className="user-logo">
                <div className="img" style={{backgroundImage: 'url(images/logo.jpg)'}}></div>
                <h3>Catriona Henderson</h3>
            </div>
        </div>
        <ul className="list-unstyled components mb-5">
            <li className="active">
                <a href="#"><span className="fa fa-home mr-3"></span> Home</a>
            </li>

            <li>
                <a href="#"><span className="fa fa-download mr-3 notif"><small className="d-flex align-items-center justify-content-center">5</small></span> Download</a>
            </li>
            
            <li>
                <a href="#"><span className="fa fa-gift mr-3"></span> Gift Code</a>
            </li>
            <li>
            <a href="#"><span className="fa fa-trophy mr-3"></span> Top Review</a>
            </li>
            <li>
            <a href="#"><span className="fa fa-cog mr-3"></span> Settings</a>
            </li>
            <li>
            <a href="#"><span className="fa fa-support mr-3"></span> Support</a>
            </li>
            <li>
            <a href="#"><span className="fa fa-sign-out mr-3"></span> Sign Out</a>
            </li>
        </ul>
        </nav>



            {/* <ul>
                <li><Link to="/"><button className="btn btn-primary">Home</button></Link></li>
                <li><button className="btn btn-primary">Sign Up / Login</button></li>
            </ul>
    */}
        </div> 
     );
}
 
export default Side;