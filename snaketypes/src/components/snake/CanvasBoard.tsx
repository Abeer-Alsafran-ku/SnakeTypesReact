import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IObjectBody, clearBoard, drawObject, generateRandomPosition } from "../utils/utils.tsx";
import { IGlobalState } from "../../store/reducers/reducers.ts";
import React from "react";
import '../../assets/css/CanvasBoard.css'

export interface ICanvasBoard {
  height: number;
  width: number;
};


const CanvasBoard = ({ height, width }: ICanvasBoard) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const snake1 = useSelector((state: IGlobalState) => state.snake);
  // console.log('snake: ', snake1);
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
    clearBoard(context);
    drawObject(context, snake1, "#3E5D81");
    drawObject(context, [pos], "#676FA3");
  }, [context]);

  return (
    <div className="CanvasBoard">
      <div className="words-container">

        {/* Up Arrow */}
        <div className="up-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.0769 2H4.92308C3.30871 2 2 3.30871 2 4.92308V37.0769C2 38.6913 3.30871 40 4.92308 40H37.0769C38.6913 40 40 38.6913 40 37.0769V4.92308C40 3.30871 38.6913 2 37.0769 2Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.3846 31.2308V22.4615H31.2307L20.9999 10.7692L10.7692 22.4615H16.6153V31.2308H25.3846Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>word</p></div>
        </div>

        {/* Right Arrow */}
        <div className="right-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 37.0769L40 4.92308C40 3.30871 38.6913 2 37.0769 2L4.92308 2C3.30871 2 2 3.30871 2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40L37.0769 40C38.6913 40 40 38.6913 40 37.0769Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.7692 25.3846L19.5385 25.3846L19.5385 31.2308L31.2308 21L19.5385 10.7692V16.6154L10.7692 16.6154L10.7692 25.3846Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
            <div className="word-box"><p>word</p></div>
        </div>

        {/* Down Arrow */}
        <div className="down-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.92308 40L37.0769 40C38.6913 40 40 38.6913 40 37.0769L40 4.92308C40 3.30871 38.6913 2 37.0769 2L4.92308 2C3.30871 2 2 3.30871 2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.6154 10.7692V19.5385H10.7692L21 31.2308L31.2308 19.5385H25.3846L25.3846 10.7692L16.6154 10.7692Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
            <div className="word-box"><p>word</p></div>
        </div>

        {/* Left Arrow */}
        <div className="left-direction">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4.92308L2 37.0769C2 38.6913 3.30871 40 4.92308 40H37.0769C38.6913 40 40 38.6913 40 37.0769V4.92308C40 3.30871 38.6913 2 37.0769 2H4.92308C3.30871 2 2 3.30871 2 4.92308Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M31.2307 16.6154H22.4615V10.7692L10.7692 21L22.4615 31.2308V25.3846H31.2307V16.6154Z" stroke="#77F083" strokeWidth="2.92308" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="word-box"><p>word</p></div>
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
    </div>
  );
};

export default CanvasBoard;