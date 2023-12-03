export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
      context.clearRect(0, 0, 1000, 570);
    }
  };

  export interface IObjectBody {
  x: number;
  y: number;
}

// draws a square object, used to draw both snake and food
export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
  strokeStyle = "#FFFFFF"
) => {
    if (context) {
      objectBody.forEach((object: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context.fillRect(object.x, object.y, 20, 20);   // the ? operator was initially here, but it is removed as there is an `if` before
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

function randomNumber(min: number, max: number) {
    let random = Math.random() * max;
    return random - (random % 20);
  }
  export const generateRandomPosition = (width: number, height: number) => {
    return {
      x: randomNumber(0, width),
      y: randomNumber(0, height),
    };
  };

  // checks if the snake tries to eat itself
  export const hasSnakeCollided = (
    snake: IObjectBody[],
    currentHeadPos: IObjectBody
  ) => {
    let flag = false;
    snake.forEach((pos: IObjectBody, index: number) => {
      if (pos.x === currentHeadPos.x && pos.y === currentHeadPos.y && index !== 0) {
        flag = true;
      }
    });
    // if(flag) {console.log('collided');}
    return flag;
  };

  // determines if snake gets out of bound
  export const isSnakeOutOfBound = (
    snake: IObjectBody[],
    width: number,
    height: number
  ) => {

    if(
    snake[0].x >= width  ||
    snake[0].x <= 0      ||
    snake[0].y <= 0      ||
    snake[0].y >= height
    ){
    // console.log('ofb');
      return true;
    }

    return false;
  }