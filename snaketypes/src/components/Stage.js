import { useSelector } from "react-redux";
import CanvasBoard from "./snake/CanvasBoard.tsx";
import '../assets/css/Stage.css';
import { useEffect, useState, useCallback } from 'react';
import ScoreCard from './snake/ScoreCard.tsx';
import { useDispatch } from 'react-redux';
import { fetchObj, getRandomWords, correctColoring, spanWord, filterChildNodes, getMaxTrackIdx, matchedWords } from "../assets/js/utils.js";
import { makeMove, MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, increaseSnake, INCREMENT_SCORE, scoreUpdates, stopGame, RESET_SCORE, resetGame, setWords } from "../store/actions/actions.ts";
import MiniChart from "./MiniChart.js";


const Stage = () => {
    const h = 570;
    const w = 1000;
    const dispatch = useDispatch();
    const [wordsDirection, setWordsDirection] = useState([])
    const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);
    const log = console.log;
    const upWord = useSelector((state: IGlobalState) => state.upWord);
    const downWord = useSelector((state: IGlobalState) => state.downWord);
    const rightWord = useSelector((state: IGlobalState) => state.rightWord);
    const leftWord = useSelector((state: IGlobalState) => state.leftWord);

    // later will be pulled from database
    const words = ['apple', 'peach', 'cherry', 'grape', 'coconut', 'mango', 'orange', 'avocado', 'pomegranate', 'strawberry'];
    // const words = ['orange']

    const [word, setWord] = useState('word');       // the word that should be typed
    // const [trackIdx, setTrackIdx] = useState(0);    // keeps track of the last correct character the user typed

    const [upTrackIdx, setUpTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [downTrackIdx, setDownTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [rightTrackIdx, setRightTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [leftTrackIdx, setLeftTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [bspace, setBspace] = useState(0);    // keeps track of the last correct character the user typed

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
            {text: wordsArray_filtered[0], direction: 'up'},
            {text: wordsArray_filtered[1], direction: 'down'},
            {text: wordsArray_filtered[2], direction: 'right'},
            {text: wordsArray_filtered[3], direction: 'left'},
        ])

        // console.log('filtered: ', setWords(wordsArray_filtered))
      }, [dispatch])

    // the first time the page loads, pick a word and fill wordDiv with characters
    useEffect(()=>{
        wordsInit();
    }, [] )

    useEffect(()=>{
         // setting wordDiv
         let wordDivs = document.getElementsByClassName('word');
        //  wordDivs[0].innerHTML = spanWord(upWord);
        //  wordDivs[1].innerHTML = spanWord(downWord);
        //  wordDivs[2].innerHTML = spanWord(rightWord);
        //  wordDivs[3].innerHTML = spanWord(leftWord);
         wordDivs[0].innerHTML = spanWord(upWord.wordText);
         wordDivs[1].innerHTML = spanWord(downWord.wordText);
         wordDivs[2].innerHTML = spanWord(rightWord.wordText);
         wordDivs[3].innerHTML = spanWord(leftWord.wordText);
    }, [upWord])

    useEffect(()=>{
        // log('backspace caught')
        let maxTrackIdx = getMaxTrackIdx([upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx]);
        
        // console.log('maxTrackIdx: ', [upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx])
        // if(upTrackIdx == maxTrackIdx){log('reducing u');setUpTrackIdx(upTrackIdx - 1)}
        // if(downTrackIdx == maxTrackIdx)log('reducing d');{setDownTrackIdx(downTrackIdx - 1)}
        // if(rightTrackIdx == maxTrackIdx){log('reducing r');setRightTrackIdx(rightTrackIdx - 1)}
        // if(leftTrackIdx == maxTrackIdx){log('reducing l');setLeftTrackIdx(leftTrackIdx - 1)}

    }, [bspace])

    useEffect(()=>{
        document.getElementsByClassName('user-input')[0].addEventListener('keydown', function(event) {
            const key = event.key;
            if (key === "Backspace") {
                // log('a')
            }
        });

        let upDivs = document.getElementById('upWord').childNodes;
        let downDivs = document.getElementById('downWord').childNodes;
        let rightDivs = document.getElementById('rightWord').childNodes;
        let leftDivs = document.getElementById('leftWord').childNodes;
        
        if(upWord.wordText == undefined){return}

        // filter excess elements, childNodes returns unnecessary elements so they have to be removed
        upDivs = filterChildNodes(upDivs, upWord.wordText);
        downDivs = filterChildNodes(downDivs, downWord.wordText);
        rightDivs = filterChildNodes(rightDivs, rightWord.wordText);
        leftDivs = filterChildNodes(leftDivs, leftWord.wordText);
        
        correctColoring(upDivs, upTrackIdx);
        correctColoring(downDivs, downTrackIdx);
        correctColoring(rightDivs, rightTrackIdx);
        correctColoring(leftDivs, leftTrackIdx);


    }, [upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx] )

   

    // called whenever the user inputs a character or removes one
    function trackWord(){
        let currentValue = document.getElementsByClassName('user-input')[0];        // user input
        // let wordDiv_arr = document.getElementsByClassName('word')[0].childNodes;    // wordDiv
        let upDivs = document.getElementById('upWord').childNodes;
        let downDivs = document.getElementById('downWord').childNodes;
        let rightDivs = document.getElementById('rightWord').childNodes;
        let leftDivs = document.getElementById('leftWord').childNodes;
        let lastPressed = currentValue.value[currentValue.value.length - 1];        // last character the user typed

        // filter excess elements, childNodes returns unnecessary elements so they have to be removed
        upDivs = filterChildNodes(upDivs, upWord.wordText);
        downDivs = filterChildNodes(downDivs, downWord.wordText);
        rightDivs = filterChildNodes(rightDivs, rightWord.wordText);
        leftDivs = filterChildNodes(leftDivs, leftWord.wordText);

        console.log('current: ', currentValue.value)

        let wordsFull = [
            {word: upWord.wordText, wordDiv: upDivs, trackIdx: upTrackIdx, setTrackIdx: setUpTrackIdx},
            {word: downWord.wordText, wordDiv: downDivs, trackIdx: downTrackIdx, setTrackIdx: setDownTrackIdx},
            {word: rightWord.wordText, wordDiv: rightDivs, trackIdx: rightTrackIdx, setTrackIdx: setRightTrackIdx},
            {word: leftWord.wordText, wordDiv: leftDivs, trackIdx: leftTrackIdx, setTrackIdx: setLeftTrackIdx}
        ];

        let matched = matchedWords(currentValue.value, wordsFull);
        if(matched.length == 0){
            console.log('no matching');
            currentValue.value = currentValue.value.slice(0, -1);
            return;
        }
        console.log('matched: ', matched)
        log(`value.length: ${currentValue.value.length}`)

        let maxTrackIdx = getMaxTrackIdx([upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx]);
        
        console.log('maxTrackIdx: ', [upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx])
        if(maxTrackIdx == currentValue.value.length + 1){
            log('backspace caught')
            if(upTrackIdx == maxTrackIdx){
                log('reducing u');
                if(upTrackIdx - 1 >= 0){setUpTrackIdx(upTrackIdx - 1);}

            }
            if(downTrackIdx == maxTrackIdx){
                log('reducing d');
                if(downTrackIdx - 1 >= 0){setDownTrackIdx(downTrackIdx - 1);}
            }
            if(rightTrackIdx == maxTrackIdx){
                log('reducing r');
                if(rightTrackIdx - 1 >= 0){setRightTrackIdx(rightTrackIdx - 1)};
            }
            if(leftTrackIdx == maxTrackIdx){
                log('reducing l');
                if(leftTrackIdx - 1 >= 0){setLeftTrackIdx(leftTrackIdx - 1)};
            }
     
        }
        
        // handle when <backspace> is used
        // if(currentValue.value.length + 1 == matched[0].trackIdx){   // which idx doesn't matter if the value is matched
        //     console.log(`backspace caught`)
            
        //     for(let c = 0; c < wordsFull.length; c++){
        //         // console.log(`wordsFull[c]: ${wordsFull[c].word}, is in matched: ${matched.includes(wordsFull[c])}`)
        //         if(matched.includes(wordsFull[c])){
        //             log(`will color ${wordsFull[c].word} #chars: ${wordsFull[c].trackIdx - 1}`)
        //             // correctColoring(wordsFull[c].wordDiv, wordsFull[c].trackIdx - 1);
        //             wordsFull[c].setTrackIdx(wordsFull[c].trackIdx - 1);
        //         }
        //         else{
        //             // correctColoring()
        //         }
        //     }
        //     // correctColoring(wordDiv_arr, trackIdx - 1);
        //     // setTrackIdx(trackIdx - 1);
        //     return;
        // }


        // color each matched word
        for(let c = 0; c < matched.length; c++){
            log(`${matched[c].word} trackIdx ${matched[c].trackIdx + 1}`)
            // correctColoring(matched[c].wordDiv, matched[c].trackIdx + 1)
            
            if(matched[c].trackIdx + 1 <= currentValue.value.length){
                matched[c].setTrackIdx(matched[c].trackIdx + 1)
            }
            else{
            log(`protected ${matched[c].word} trackIdx ${matched[c].trackIdx} from exceeding current length ${currentValue.value.length}`)
            }
        }
        

        

        // handle when <backspace> is used
        // if(currentValue.value.length + 1 == maxTrackIdx){
        //     correctColoring(upDivs, upTrackIdx - 1);
        //     correctColoring(downDivs, downTrackIdx - 1);
        //     correctColoring(rightDivs, rightTrackIdx - 1);
        //     correctColoring(leftDivs, leftTrackIdx - 1);

        //     setTrackIdx(trackIdx - 1);

        //     console.log('backspace caught')
        //     return;
        // }


        // if correct character was typed increment the index of the (last correct character)
        /*
         * modify if condition to compare character with all words (directions)
         * 
         */

        /*********
         * 
         * Before coloring, compare current trackIdx, if it is equal to maximum trackIdx then apply coloring
         * 
         * 
         * ************/


        // if(lastPressed == upWord.wordText[upTrackIdx]){
        //     setUpTrackIdx(upTrackIdx + 1);
        //     console.log('up match');
        // }

        // if(lastPressed == downWord.wordText[upTrackIdx]){
        //     setDownTrackIdx(downTrackIdx + 1);
        //     // correctColoring(downDivs, downTrackIdx + 1);
        //     console.log('down match')
        // }

        // if(lastPressed == rightWord.wordText[rightTrackIdx]){
        //     setRightTrackIdx(rightTrackIdx + 1);
        //     // correctColoring(rightDivs, rightTrackIdx + 1);
        //     console.log('right match')
        // }
        // if(lastPressed == leftWord.wordText[leftTrackIdx]){
        //     setLeftTrackIdx(leftTrackIdx + 1);
        //     // correctColoring(leftDivs, leftTrackIdx + 1);
        //     console.log('left match')
        // }

        // default:
        //         console.log('pressed key doesnt have a match')
        //         currentValue.value = currentValue.value.slice(0, -1);   // remove the incorrect character
        // }



/************ OLD ***********/

// if(lastPressed == word[trackIdx]){
            
        //     // if the word is completed
        //     if(trackIdx + 1 == wordDiv_arr.length){
        //         console.log('word completed: ', word)

        //         switch(word){
        //             case upWord.wordText:
        //                 moveSnake(0, -20, disallowedDirection);
        //                 break;
        //             case downWord.wordText:
        //                 moveSnake(0, 20, disallowedDirection);
        //                 break;
        //             case rightWord.wordText:
        //                 moveSnake(20, 0, disallowedDirection);
        //                 break;
        //             case leftWord.wordText:
        //                 moveSnake(-20, 0, disallowedDirection);
        //                 break;

        //             default:
        //                 console.log('word completed default case');
        //         } // end switch
        // //     } // end if word completed
        
        //     setTrackIdx(trackIdx + 1);
        //     correctColoring(wordDiv_arr, trackIdx + 1);
        // }
        // else{
        //     currentValue.value = currentValue.value.slice(0, -1);   // remove the incorrect character
        // }

    }

    return ( 

                <div className='Stage'>
                    <MiniChart />
                    <ScoreCard />

                    <div className="wordDivs">
                        <div className='word' id="upWord"></div>
                        <div className='word' id="downWord"></div>
                        <div className='word' id="rightWord"></div>
                        <div className='word' id="leftWord"></div>
                    </div>
                    <input
                        className='user-input'
                        type='text'
                        onChange={trackWord}
                        onBlur={()=>{document.getElementsByClassName('user-input')[0].focus()}} 
                        autoFocus
                    />
                    <CanvasBoard width={w} height={h} />

                </div>
        
     );
}
 
export default Stage;