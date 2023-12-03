// import {Link} from 'react-router-dom'
import Side from './Side';
// import App from './App';
import { Provider } from "react-redux";
import store from "../store/actions/actions.ts";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoard from "./snake/CanvasBoard.tsx";
import '../assets/css/Stage.css';
import { useEffect, useState } from 'react';
import ScoreCard from './snake/ScoreCard.tsx';


const Stage = () => {
    const h = 570;
    const w = 1000;

    // later will be pulled from database
    const words = ['apple', 'peach', 'cherry', 'grape', 'coconut', 'mango', 'orange', 'avocado', 'pomegranate', 'strawberry'];
    // const words = ['orange']

    const [word, setWord] = useState('word');       // the word that should be typed
    const [trackIdx, setTrackIdx] = useState(0);    // keeps track of the last correct character the user typed

    // returns a random element from a list, this will be removed as later on we can request a random word from database
    function get_random (list) {
        let idx = Math.floor((Math.random()*list.length));
        return list[idx];
      }

    // the first time the page loads, pick a word and fill wordDiv with characters
    // useEffect(()=>{
    //     let sync_word = get_random(words)
    //     console.log('word: ', sync_word)

    //     setWord(sync_word);
    //     let wordDiv = document.getElementsByClassName('word')[0];
    //     let html = "";
    //     for(let c = 0; c < sync_word.length; c++){
    //         html += `<span class="word-char" style="font-size: xxx-large; color: gray; letter-spacing: 3px;">${sync_word[c]}</span>\n`
    //     }

    //     wordDiv.innerHTML = html
    // }, [] )

    // colors the wordDiv until the last correct character (this keeps track of what is being typed)
    function correctColoring(wordDiv_arr, tIdx){
        
        let charElement = null;

        // black color up to tIdx (the last correct character)
        for(let c = 0; c < tIdx; c++){
            charElement = wordDiv_arr[c];            
            charElement.style.color = "black";
        }

        // the rest should remain gray (we are using a loop to avoid black-gray-black patterns)
        for(let c = tIdx; c < wordDiv_arr.length; c++){
            charElement = wordDiv_arr[c];
            charElement.style.color = "gray";
        }
    } // end correctColoring

    // called whenever the user inputs a character or removes one
    function trackWord(){
        let currentValue = document.getElementsByClassName('user-input')[0];        // user input
        let wordDiv_arr = document.getElementsByClassName('word')[0].childNodes;    // wordDiv
        let lastPressed = currentValue.value[currentValue.value.length - 1];        // last character the user typed

        // filter excess elements, childNodes returns unnecessary elements so they have to be removed
        let temp = [];
        for(let c = 0; c < word.length; c++){
            temp.push(wordDiv_arr[c*2])
        }
        wordDiv_arr = temp;

        // console.log('current value: ', currentValue.value, ' last pressed: ', lastPressed, '\nidx: ', trackIdx, '\nleng: ', currentValue.value.length);
        // handle when <backspace> is used
        if(currentValue.value.length + 1 == trackIdx){
            console.log('backspace caught');
            correctColoring(wordDiv_arr, trackIdx - 1);
            setTrackIdx(trackIdx - 1);
            return;
        }

        // if correct character was typed increment the index of the (last correct character)
        if(lastPressed == word[trackIdx]){
            if(trackIdx + 1 == wordDiv_arr.length){
                console.log('word completed')
            }
            setTrackIdx(trackIdx + 1);
            correctColoring(wordDiv_arr, trackIdx + 1);
        }
        else{
            currentValue.value = currentValue.value.slice(0, -1);   // remove the incorrect character
        }

    }

    return ( 

                <div className='Stage'>
                    {/* <div className='word'></div> */}
                    {/* <input
                        className='user-input'
                        type='text'
                        onChange={trackWord}
                        onBlur={()=>{document.getElementsByClassName('user-input')[0].focus()}} 
                        autoFocus
                    /> */}

                    <Provider store={store}>
                        <ScoreCard />
                        <CanvasBoard width={w} height={h} />
                    </Provider>


                </div>
        
     );
}
 
export default Stage;