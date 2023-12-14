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
    const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);

    // getting words from redux store
    const upWord = useSelector((state: IGlobalState) => state.upWord);
    const downWord = useSelector((state: IGlobalState) => state.downWord);
    const rightWord = useSelector((state: IGlobalState) => state.rightWord);
    const leftWord = useSelector((state: IGlobalState) => state.leftWord);

    const [upTrackIdx, setUpTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [downTrackIdx, setDownTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [rightTrackIdx, setRightTrackIdx] = useState(0);    // keeps track of the last correct character the user typed
    const [leftTrackIdx, setLeftTrackIdx] = useState(0);    // keeps track of the last correct character the user typed

    // function that dispaches movements
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

    // initializes words in redux store
    const wordsInit = useCallback(async ()=>{
        let wordsArray_fetched = await fetchObj('words');
        let wordsArray_filtered = getRandomWords(wordsArray_fetched, 4);
        dispatch(setWords(wordsArray_filtered));
      }, [dispatch])

    // the first time the page loads, set the words in redux store
    useEffect(()=>{
        wordsInit();
    }, [] )

    // when the words are set, fill the wordDivs
    useEffect(()=>{
         // setting wordDiv
         let wordDivs = document.getElementsByClassName('word');

         wordDivs[0].innerHTML = spanWord(upWord.wordText);
         wordDivs[1].innerHTML = spanWord(downWord.wordText);
         wordDivs[2].innerHTML = spanWord(rightWord.wordText);
         wordDivs[3].innerHTML = spanWord(leftWord.wordText);
    }, [upWord, downWord, rightWord, leftWord])

    // whenever a trackIdx is modified re-color the wordDivs
    useEffect(()=>{
       
        // the wordDivs
        let upDivs = document.getElementById('upWord').childNodes;
        let downDivs = document.getElementById('downWord').childNodes;
        let rightDivs = document.getElementById('rightWord').childNodes;
        let leftDivs = document.getElementById('leftWord').childNodes;
        
        // if the words are not set yet, ignore this useEffect the first time
        if(!upWord.wordText || !downWord.wordText || !rightWord.wordText || !leftWord.wordText){return}

        // filter excess elements, childNodes returns unnecessary elements so they have to be removed
        upDivs = filterChildNodes(upDivs, upWord.wordText);
        downDivs = filterChildNodes(downDivs, downWord.wordText);
        rightDivs = filterChildNodes(rightDivs, rightWord.wordText);
        leftDivs = filterChildNodes(leftDivs, leftWord.wordText);

        // coloring
        correctColoring(upDivs, upTrackIdx);
        correctColoring(downDivs, downTrackIdx);
        correctColoring(rightDivs, rightTrackIdx);
        correctColoring(leftDivs, leftTrackIdx);

    }, [upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx] )

   

    // called whenever the user inputs a character or removes one
    function trackWord(){
        let currentValue = document.getElementsByClassName('user-input')[0];        // current user input
        
        // the wordDivs
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

        // this structure is helpful in the algorithm
        let wordsFull = [
            {word: upWord.wordText, wordDiv: upDivs, trackIdx: upTrackIdx, setTrackIdx: setUpTrackIdx},
            {word: downWord.wordText, wordDiv: downDivs, trackIdx: downTrackIdx, setTrackIdx: setDownTrackIdx},
            {word: rightWord.wordText, wordDiv: rightDivs, trackIdx: rightTrackIdx, setTrackIdx: setRightTrackIdx},
            {word: leftWord.wordText, wordDiv: leftDivs, trackIdx: leftTrackIdx, setTrackIdx: setLeftTrackIdx}
        ];

        // find matched words, i.e, if input is "ap", then matched can be 'apple', 'apricot', etc..
        let matched = matchedWords(currentValue.value, wordsFull);
        if(matched.length == 0){    // if there is no matching remove the new character and ignore
            currentValue.value = currentValue.value.slice(0, -1);
            return;
        }

        // handling <backspace>
        let maxTrackIdx = getMaxTrackIdx([upTrackIdx, downTrackIdx, rightTrackIdx, leftTrackIdx]);
        if(maxTrackIdx == currentValue.value.length + 1){
            
            // if user is deleting from upWord
            if(upTrackIdx == maxTrackIdx){
                // this ensures a positive trackIdx
                if(upTrackIdx - 1 >= 0){
                    setUpTrackIdx(upTrackIdx - 1);
                }
            }

            if(downTrackIdx == maxTrackIdx){
                if(downTrackIdx - 1 >= 0){setDownTrackIdx(downTrackIdx - 1);}
            }
            if(rightTrackIdx == maxTrackIdx){
                if(rightTrackIdx - 1 >= 0){setRightTrackIdx(rightTrackIdx - 1)};
            }
            if(leftTrackIdx == maxTrackIdx){
                if(leftTrackIdx - 1 >= 0){setLeftTrackIdx(leftTrackIdx - 1)};
            }
        }   // end handling backspace

        // for each matched word, increase its trackIdx indicating the last correct character typed of the word
        for(let c = 0; c < matched.length; c++){            
            // ensures that matching doesn't occur more than once on the same word
            if(matched[c].trackIdx + 1 <= currentValue.value.length){
                matched[c].setTrackIdx(matched[c].trackIdx + 1)
            }
        }
        
    }   // end trackWord

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