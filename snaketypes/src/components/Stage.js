import { useSelector } from "react-redux";
import CanvasBoard from "./snake/CanvasBoard.tsx";
import '../assets/css/Stage.css';
import { useEffect, useState, useCallback } from 'react';
import ScoreCard from './snake/ScoreCard.tsx';
import { useDispatch } from 'react-redux';
import { fetchObj, getRandomWords } from "../assets/js/utils.js";
import { makeMove, MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, increaseSnake, INCREMENT_SCORE, scoreUpdates, stopGame, RESET_SCORE, resetGame, setWords } from "../store/actions/actions.ts";



const Stage = () => {
    const h = 570;
    const w = 1000;
    const dispatch = useDispatch();
    const [wordsDirection, setWordsDirection] = useState([])
    const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);


    const moveSnake = useCallback(
        (dx = 0, dy = 0, ds = '') => {
          if (dx > 0 && dy === 0 && ds !== "RIGHT") {
            // console.log('dispatching: ', makeMove(dx, dy, MOVE_RIGHT))
            dispatch(makeMove(dx, dy, MOVE_RIGHT));
          }
    
          if (dx < 0 && dy === 0 && ds !== "LEFT") {
            // console.log('dispatching: ', makeMove(dx, dy, MOVE_LEFT))
            dispatch(makeMove(dx, dy, MOVE_LEFT));
          }
    
          if (dx === 0 && dy < 0 && ds !== "UP") {
            // console.log('dispatching: ', makeMove(dx, dy, MOVE_UP))
            dispatch(makeMove(dx, dy, MOVE_UP));
          }
    
          if (dx === 0 && dy > 0 && ds !== "DOWN") {
            // console.log('dispatching: ', makeMove(dx, dy, MOVE_DOWN))
            dispatch(makeMove(dx, dy, MOVE_DOWN));
          }
        },
        [dispatch]
      );

    const wordsInit = useCallback(async ()=>{
        
        let wordsArray_fetched = await fetchObj('words');
        let wordsArray_filtered = getRandomWords(wordsArray_fetched, 4);
        dispatch(setWords(wordsArray_filtered));

        // setting the word to be typed
        let sync_word = getRandomWords(wordsArray_filtered, 1)[0].wordText;
        setWord(sync_word);

        setWordsDirection([
            {text: wordsArray_filtered[0], direction: ''},
        ])
        console.log('filtered: ', wordsArray_filtered)
        // setting wordDiv
        let wordDiv = document.getElementsByClassName('word')[0];
        let html = "";
        for(let c = 0; c < sync_word.length; c++){
            html += `<span class="word-char" style="font-size: xxx-large; color: gray; letter-spacing: 3px;">${sync_word[c]}</span>\n`
        }

        wordDiv.innerHTML = html        
      }, [dispatch])

    // later will be pulled from database
    const words = ['apple', 'peach', 'cherry', 'grape', 'coconut', 'mango', 'orange', 'avocado', 'pomegranate', 'strawberry'];
    // const words = ['orange']

    const [word, setWord] = useState('word');       // the word that should be typed
    const [trackIdx, setTrackIdx] = useState(0);    // keeps track of the last correct character the user typed

    // the first time the page loads, pick a word and fill wordDiv with characters
    useEffect(()=>{
        wordsInit();
    }, [] )

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

        // handle when <backspace> is used
        if(currentValue.value.length + 1 == trackIdx){
            correctColoring(wordDiv_arr, trackIdx - 1);
            setTrackIdx(trackIdx - 1);
            return;
        }

        // if correct character was typed increment the index of the (last correct character)
        if(lastPressed == word[trackIdx]){
            if(trackIdx + 1 == wordDiv_arr.length){
                console.log('word completed: ', word)
                moveSnake(20, 0, disallowedDirection);

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
                    <div className='word'></div>
                    <input
                        className='user-input'
                        type='text'
                        onChange={trackWord}
                        onBlur={()=>{document.getElementsByClassName('user-input')[0].focus()}} 
                        autoFocus
                    />

                    <ScoreCard />
                    <CanvasBoard width={w} height={h} />

                </div>
        
     );
}
 
export default Stage;