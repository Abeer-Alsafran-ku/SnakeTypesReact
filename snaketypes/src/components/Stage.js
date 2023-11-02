// import {Link} from 'react-router-dom'
import Side from './Side';
import '../assets/css/Home.css';
// import App from './App';
import { Provider } from "react-redux";
import store from "../store/actions/index.ts";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";


const Stage = () => {
    return ( 
        <Provider store={store}>
            
            <div className='Stage'>
            <Side />
                <h3>This is the Stage</h3>
            </div>
        
        
        </Provider>
     );
}
 
export default Stage;