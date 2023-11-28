import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { clearBoard, drawObject, generateRandomPosition } from "../utils/utils.tsx";

export interface ICanvasBoard{
    height: number;
    width: number;
};


const CanvasBoard = ({ height, width }: ICanvasBoard) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState < CanvasRenderingContext2D | null > (null);

    const snake1 = useSelector((state: IGlobalState) => state.snake);
    console.log('snake: ', snake1);
    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
      );

    useEffect(() => {
      //Draw on canvas each time
      setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
      clearBoard(context);
      drawObject(context, snake1, "#91C483");
      drawObject(context, [pos], "#676FA3");
    }, [context]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          border: "3px solid black",
        }}
        height={height}
        width={width}
      />
    );
  };

  export default CanvasBoard;