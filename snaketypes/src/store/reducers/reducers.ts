import { RIGHT, LEFT, UP, DOWN, SET_DISALLOWED_DIRECTION, INCREASE_SNAKE, INCREMENT_SCORE, STOP_GAME, RESET_SCORE, RESET } from "../actions/actions.ts";

export interface ISnakeCoord {
    x: number;
    y: number;
  }

export interface IGlobalState {
    snake: ISnakeCoord[] | [];            // Defines the snake location
    disallowedDirection: string;          // e.g. If the snake is moving "RIGHT" it cannot go "LEFT"
    score: number;
};

const globalState: IGlobalState = {
  //Postion of the entire snake
  snake: [
    { x: 580, y: 300 },   // the head of the snake
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  
  disallowedDirection: "", // refer to event listener in CanvasBoard: initially is empty to identify gamestart
  score: 0,
};

// the reducer takes an action and returns the new state
const gameReducer = (state = globalState, action) => {
  
    switch (action.type) {
        case RIGHT:
        case LEFT:
        case UP:
        case DOWN:

          // To update snake location, we add values to the snake head, then pop the tail (last block)
          let newSnake = [...state.snake];
          newSnake = [{
            //New x and y coordinates
            x: state.snake[0].x + action.payload[0],
            y: state.snake[0].y + action.payload[1],
          }, ...newSnake];
          
          newSnake.pop();
          return {
            ...state,
            snake: newSnake,
          };
          
        case SET_DISALLOWED_DIRECTION:
          return { ...state, disallowedDirection: action.payload };

        case INCREASE_SNAKE:
          const snakeLen = state.snake.length;
          return {
            ...state,
            snake: [
              ...state.snake,
              {
                x: state.snake[snakeLen - 1].x - 20,
                y: state.snake[snakeLen - 1].y - 20,
              },
            ],
          };
          
        case INCREMENT_SCORE:
          return {
            ...state,
            score: state.score + 1,
          };

        case RESET_SCORE:
          return { ...state, score: 0 };

        case RESET:
          return {
            ...state,
            snake: [
              { x: 580, y: 300 },   // the head of the snake
              { x: 560, y: 300 },
              { x: 540, y: 300 },
              { x: 520, y: 300 },
              { x: 500, y: 300 },
            ],
            disallowedDirection: ''
          }

        default:
            return state;
    }
}

export default gameReducer;