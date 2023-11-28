export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
      context.clearRect(0, 0, 1000, 570);
    }
  };

  export interface IObjectBody {
  x: number;
  y: number;
}

// draws a square object, which explains the 20x20 in the code
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