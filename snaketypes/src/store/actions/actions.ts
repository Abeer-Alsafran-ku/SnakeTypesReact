import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import gameReducer from "../reducers/reducers.ts";
import watcherSagas from "../sagas/sagas.ts";
// actions yielded by saga to propagate the calls to reducers
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";

// actions that are dispatched from CanvasBoard component and caught by saga middleware
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

// this is action is used to set the disallowed direction
export const SET_DISALLOWED_DIRECTION = "SET_DISALLOWED_DIRECTION";

// dispatched when fruit is eaten
export const INCREASE_SNAKE = "INCREASE_SNAKE";
export const INCREMENT_SCORE = "INCREMENT_SCORE";

// to deal with collision
export const STOP_GAME = "STOP_GAME";

export const RESET = "RESET";
export const RESET_SCORE = "RESET_SCORE";

// words functionalities
export const SET_WORDS = "SET_WORDS"


/* an action creator: makes a move based on `move`, `dx` and `dy` are the deltas
 * They tell the Redux store by how much we should increase/decrease
 * the coordinates of each snake block to move the snake in the given direction
 */
export const makeMove = (dx: number, dy: number, move: string) => ({
    type: move,
    payload: [dx, dy]
});

export const setDisAllowedDirection = (direction: string) => ({
    type: SET_DISALLOWED_DIRECTION,
    payload: direction
});

export const increaseSnake = () => ({
    type: INCREASE_SNAKE
  });

// takes either INCREMENT_SCORE or RESET_SCORE
export const scoreUpdates = (type: string) => ({
    type
  });

  export const stopGame = () => ({
    type: STOP_GAME
  });

  export const resetGame = () => ({
    type: RESET
  });

  export const setWords = (words: object) => ({
    type: SET_WORDS,
    payload: words
  })

const sagaMiddleware = createSagaMiddleware();

const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSagas);
export default store;





