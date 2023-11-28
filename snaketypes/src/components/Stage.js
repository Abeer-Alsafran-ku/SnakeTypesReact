// import {Link} from 'react-router-dom'
import Side from './Side';
// import App from './App';
import { Provider } from "react-redux";
import store from "../store/actions/actions.ts";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoard from "./snake/CanvasBoard.tsx";
import '../assets/css/Stage.css';
import { useEffect, useState } from 'react';


const Stage = () => {
    const h = 570;
    const w = 1000;

    const [word, setWord] = useState('word');
    const [hiddenWord, setHiddenWord] = useState('');

    useEffect(()=>{
        let wordDiv = document.getElementById(word);
        let html = "";

        for(let c = 0; c < word.length; c++){
            html += `<span class="word-char" style="font-size: xxx-large; color: gray; letter-spacing: 3px;">${word[c]}</span>\n`
        }

        wordDiv.innerHTML = html
    }, [] )

    function trackWord(){
        let currentValue_str = document.getElementsByClassName('user-input')[0].value;
        let visibleWord_arr = document.getElementById('word').childNodes;
        for(let c = 0; c < word.length; c++){
            let charElement = visibleWord_arr[c*2];
            console.log('current: ', currentValue_str, 'word[c]: ', word[c])
            
            if(currentValue_str[c] == charElement.textContent){
                charElement.style.color = "black";
            }
            else{
                charElement.style.color = "gray";
            }

        }

    }

    return ( 

                <div className='Stage'>
                <Side />

                {/* Dynamic User Input Field */}
                <div className='word' id={word}></div>                
                <input className='user-input' type='text' autoFocus onChange={trackWord}
                    onBlur={()=>{document.getElementsByClassName('user-input')[0].focus()}}
                />

                    <Provider store={store}>
                        {/* <ChakraProvider> */}
                        <CanvasBoard width={w} height={h} />
                        {/* </ChakraProvider> */}
                    </Provider>


                </div>
        
     );
}
 
export default Stage;