import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IObjectBody, clearBoard, drawObject, generateRandomPosition, hasSnakeCollided, isSnakeOutOfBound } from "../utils/utils.tsx";
import { IGlobalState, } from "../../store/reducers/reducers.ts";
import React from "react";

import { makeMove, MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, increaseSnake, INCREMENT_SCORE, scoreUpdates, stopGame, RESET_SCORE, resetGame, setWords } from "../../store/actions/actions.ts";

import '../../assets/css/CanvasBoard.css'
import { delay } from "redux-saga/effects";
import Instruction from "./Instructions.tsx";

export interface ICanvasBoard {
  height: number;
  width: number;
};


const CanvasBoard = ({ height, width }: ICanvasBoard) => {

  // used to dispatch actions to reducer
  const dispatch = useDispatch();
  const [defaultControls, setDefaultControls] = useState<boolean>(false)
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  // retrieve states from redux store
  const snake = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);

  // console.log('snake: ', snake);
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );

  const upWord = useSelector((state: IGlobalState) => state.upWord);
  const downWord = useSelector((state: IGlobalState) => state.downWord);
  const rightWord = useSelector((state: IGlobalState) => state.rightWord);
  const leftWord = useSelector((state: IGlobalState) => state.leftWord);
  // console.log(`up0: ${upWord.wordText}, down1: ${downWord.wordText}, right2: ${rightWord.wordText}, left3: ${leftWord.wordText}`)

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
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

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {

      if(defaultControls){

        // if the game started i.e `disallowedDirection` is set then allow moving in other directions
        if (disallowedDirection) {
          switch (event.key) {
            
            case "w":   // up
              moveSnake(0, -20, disallowedDirection);
              break;
            case "s":   // down
              moveSnake(0, 20, disallowedDirection);
              break;
            case "a":   // left
              moveSnake(-20, 0, disallowedDirection);
              break;
            case "d":   // right
              event.preventDefault();
              moveSnake(20, 0, disallowedDirection);
              break;
          }
        } else {

          // game starts when player goes right
          if (
            disallowedDirection !== "LEFT" &&
            disallowedDirection !== "UP" &&
            disallowedDirection !== "DOWN" &&
            event.key === "d"
          )
            moveSnake(20, 0, disallowedDirection);
        }
      }// end defcontrols
    },
    [disallowedDirection, moveSnake]
  );

  //Draw on canvas each time
  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
    clearBoard(context);
    drawObject(context, snake, "#3E5D81");
    drawObject(context, [pos], "#676FA3");

    //When the object is consumed
    if (snake[0].x === pos?.x && snake[0].y === pos?.y) {
      setIsConsumed(true);
    }

    // if snake collides or out of bound
    if (hasSnakeCollided(snake, snake[0]) || isSnakeOutOfBound(snake, width, height)) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener('keypress', handleKeyEvents);
    }

  }, [context, pos, snake, height, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);

      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());

      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isConsumed, pos, height, width, dispatch]);

  // adds keypress listener when the component mounts and removes it when the component unmounts
  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);

    dispatch(resetGame());                        // stops dispatching actions infinitly within saga
    dispatch(scoreUpdates(RESET_SCORE));          // resets score
    clearBoard(context);                          // clears board
    drawObject(context, snake, "#91C483");        // draws snake again

    // set position of food again
    let posi = generateRandomPosition(width - 20, height - 20);
    setPos(posi);
    drawObject(context, [posi], "#676FA3");
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake, width]);

  return (
    <div className="CanvasBoard">
      <div className="words-container">

        {/* Up Arrow */}
        <div className="up-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.0769 2H4.92308C3.30871 2 2 3.30871 2 4.92308V37.0769C2 38.6913 3.30871 40 4.92308 40H37.0769C38.6913 40 40 38.6913 40 37.0769V4.92308C40 3.30871 38.6913 2 37.0769 2Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.3846 31.2308V22.4615H31.2307L20.9999 10.7692L10.7692 22.4615H16.6153V31.2308H25.3846Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>{upWord.wordText}</p></div>
        </div>

        {/* Down Arrow */}
        <div className="down-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.92308 40L37.0769 40C38.6913 40 40 38.6913 40 37.0769L40 4.92308C40 3.30871 38.6913 2 37.0769 2L4.92308 2C3.30871 2 2 3.30871 2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.6154 10.7692V19.5385H10.7692L21 31.2308L31.2308 19.5385H25.3846L25.3846 10.7692L16.6154 10.7692Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>{downWord.wordText}</p></div>
        </div>

        {/* Right Arrow */}
        <div className="right-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 37.0769L40 4.92308C40 3.30871 38.6913 2 37.0769 2L4.92308 2C3.30871 2 2 3.30871 2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40L37.0769 40C38.6913 40 40 38.6913 40 37.0769Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.7692 25.3846L19.5385 25.3846L19.5385 31.2308L31.2308 21L19.5385 10.7692V16.6154L10.7692 16.6154L10.7692 25.3846Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>{rightWord.wordText}</p></div>
        </div>

        {/* Left Arrow */}
        <div className="left-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40H37.0769C38.6913 40 40 38.6913 40 37.0769V4.92308C40 3.30871 38.6913 2 37.0769 2H4.92308C3.30871 2 2 3.30871 2 4.92308Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M31.2307 16.6154H22.4615V10.7692L10.7692 21L22.4615 31.2308V25.3846H31.2307V16.6154Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>{leftWord.wordText}</p></div>
        </div>

      </div>
      <canvas
        ref={canvasRef}
        style={{
          border: "3px solid black",
        }}
        height={height}
        width={width}
      />
      <Instruction resetBoard={resetBoard} />
      <button onClick={resetBoard}>RESET</button>

    </div>
  );
};

export default CanvasBoard;