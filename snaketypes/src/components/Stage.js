// import {Link} from 'react-router-dom'
import Side from './Side';
import '../assets/css/Home.css';
// import App from './App';
import { Provider } from "react-redux";
import store from "../store/actions/actions.ts";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoard from "./snake/CanvasBoard.tsx";



const Stage = () => {
    return ( 

                <div className='Stage'>
                <Side />
                    <h3>This is the Stage</h3>
                    <Provider store={store}>
                        {/* <ChakraProvider> */}
                        <CanvasBoard height={570} width={1000} />
                        {/* </ChakraProvider> */}
                    </Provider>


                </div>
        
     );
}
 
export default Stage;