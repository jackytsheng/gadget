import { useEffect, useState, useRef } from 'react';
import {
  createTetromino,
  Oshape,
  Zshape,
  Sshape,
  Ishape,
} from '../components/Tetromino';

type HookProps = {
  useLose: any;
  useRecord: any;
  canvasColor: string;
  canvasWidth: number;
  canvasHeight: number;
};

type RecordProps = {
  score: number;
  level: number;
  lineClear: number;
};

export enum KeyPress {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  V = 'v',
  Space = ' ',
}

const initiateArrays = (
  arrayWidth: number,
  arrayHeight: number,
  scale: number,
  canvasColor: string
) => {
  let coorArray = Array(arrayHeight)
    .fill(0)
    .map((row) => Array(arrayWidth).fill(0));
  //this function create the coordinate array
  (() => {
    for (let j = 0; j < arrayHeight; j++) {
      for (let i = 0; i < arrayWidth; i++) {
        coorArray[j][i] = { x: 4 + i * scale, y: 4 + j * scale };
      }
    }
  })();
  let gameBoardArray = Array(arrayHeight)
    .fill(0)
    .map((row) => Array(arrayWidth).fill(0));

  // create a array that store all the colour that a square should be
  let stopedShapeArray = Array(arrayHeight)
    .fill(0)
    .map((row) => Array(arrayWidth).fill(0));
  let gameBoardColorArray = Array(arrayHeight)
    .fill(0)
    .map((row) => Array(arrayWidth).fill(canvasColor));

  return { coorArray, gameBoardArray, stopedShapeArray, gameBoardColorArray };
};

export default ({
  canvasColor,
  useLose,
  canvasWidth,
  canvasHeight,
  useRecord,
}: HookProps) => {
  // 12 wide and 20 height
  const arrayWidth = 12;
  const arrayHeight = 20;

  // each block takes 20 pixel
  const scale = 20;

  // initially it starts at 2 second
  const initialDropTime = 2000;

  // Initialising game data
  const recordRef = useRef<RecordProps>({ score: 0, level: 1, lineClear: 0 });

  const gameInfoRef = useRef({
    arrayHeight: 20,
    arrayWidth: 12,
    initialDropTime: 2000,
  });

  // DropEvent Ref
  const dropEventRef = useRef(0);

  const curTetrominoRef = useRef<Tetromino>();

  // Passed by the parent on Mount
  const [ctx, useCtx] = useState<CanvasRenderingContext2D>();
  const initiateTetromino = () => {
    const firstTetramino = createTetromino();
    let curTetromino = new Tetromino(
      firstTetramino.shape,
      firstTetramino.color,
      ctx!
    );
    curTetrominoRef.current = curTetromino;
    curTetromino.drawTetromino();
    dropEventRef.current = window.setInterval(() => {
      curTetromino.update(KeyPress.Down);
    }, gameInfoRef.current.initialDropTime / recordRef.current.level);

    return curTetromino;
  };

  const updateMove = (direction: KeyPress) => {
    if (direction) curTetrominoRef.current?.update(direction);
  };

  // When ctx is received
  useEffect(() => {
    if (!ctx) {
      return;
    }

    // draw the first tetromino, as long as this use effect not change state will be recorded
    initiateTetromino();

    const handleKeypress = (evt: KeyboardEvent) => {
      const direction = evt.key.replace('Arrow', '');
      curTetrominoRef.current?.update(direction as KeyPress);
    };

    //listen for key press
    document.addEventListener('keydown', handleKeypress);

    return () => {
      clearInterval(dropEventRef.current);
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [ctx]);

  let { coorArray, gameBoardArray, gameBoardColorArray, stopedShapeArray } =
    initiateArrays(arrayWidth, arrayHeight, scale, canvasColor);

  // Initialising game data
  class Tetromino {
    tetroArray: any;
    color: any;
    startX: any;
    startY: any;
    shape: string = '';
    ctx: CanvasRenderingContext2D;
    constructor(
      tetro: number[][],
      color: string,
      ctx: CanvasRenderingContext2D
    ) {
      this.tetroArray = tetro;
      //every time start at the fifth column of the game board
      this.startX = 5;
      this.startY = 0;
      this.color = color;
      this.ctx = ctx;
    }

    // this function will draw the tetromino and record it.
    drawTetromino = (y = this.startY, x = this.startX) => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        this.ctx.fillStyle = this.color;
        // 16 16 because leaving 4 pixel for edges
        this.ctx.fillRect(
          coorArray[this.tetroArray[i][0] + y][this.tetroArray[i][1] + x].x,
          coorArray[this.tetroArray[i][0] + y][this.tetroArray[i][1] + x].y,
          16,
          16
        );
        gameBoardArray[this.tetroArray[i][0] + y][
          this.tetroArray[i][1] + x
        ] = 1;
        gameBoardColorArray[this.tetroArray[i][0] + y][
          this.tetroArray[i][1] + x
        ] = this.color;
      }
    };
    // this function will delete the tetromino on the board.
    deleteTetromino = () => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        this.ctx.fillStyle = canvasColor;
        this.ctx.fillRect(
          coorArray[this.tetroArray[i][0] + this.startY][
            this.tetroArray[i][1] + this.startX
          ].x,
          coorArray[this.tetroArray[i][0] + this.startY][
            this.tetroArray[i][1] + this.startX
          ].y,
          16,
          16
        );
        gameBoardArray[this.tetroArray[i][0] + this.startY][
          this.tetroArray[i][1] + this.startX
        ] = 0;
        gameBoardColorArray[this.tetroArray[i][0] + this.startY][
          this.tetroArray[i][1] + this.startX
        ] = canvasColor;
      }
    };

    // this function will update any changes
    update = (direction: KeyPress) => {
      this.deleteTetromino();
      if (
        direction === KeyPress.Left &&
        !this.hittingWall(direction) &&
        !this.horizontalCollsion(direction)
      ) {
        this.startX--;
      } else if (
        direction === KeyPress.Right &&
        !this.hittingWall(direction) &&
        !this.horizontalCollsion(direction)
      ) {
        this.startX++;
      } else if (direction === KeyPress.Down && this.VerticalCollision()) {
        console.log('this tetromino now locked in place');
      } else if (direction === KeyPress.Down) {
        this.startY++;
      } else if (direction === KeyPress.Space) {
        console.log('Hard Drop!');
        this.hardDrop();
      } else if (direction === KeyPress.Up) {
        this.rotateRight();
      } else if (direction === KeyPress.V) {
        this.rotateLeft();
      }
      this.drawTetromino();
    };

    // redraw the new tetromino.
    reDrawNewTetrimino = () => {
      curTetrominoRef.current?.drawTetromino();
      //store this into a shtopedShapeArray for checking for horizontal collision
      stopedShapeArray = gameBoardArray;
      console.log('Recreate tetro now!');
      //recreate an other tetromino
      const { shape, color } = createTetromino();
      this.tetroArray = shape;
      this.color = color;
      this.startX = 5;
      this.startY = 0;
      this.shape = '';
      //everytime we redraw check if we lose
      if (this.checkLose()) {
        console.log('you lost');

        useLose(true);

        // Stop the game
        window.clearInterval(dropEventRef.current);
      }
    };

    // check for vertical collision
    VerticalCollision = () => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        //must detected if it is 20 first, otherwise it will crash the program
        if (this.tetroArray[i][0] + this.startY + 1 === arrayHeight) {
          console.log('Hitting the bottom');
          this.reDrawNewTetrimino();
          this.checkClearRow();
          return true;
        } else if (
          stopedShapeArray[this.tetroArray[i][0] + this.startY + 1][
            this.tetroArray[i][1] + this.startX
          ] === 1
        ) {
          console.log('there is vertical collision');
          this.reDrawNewTetrimino();
          this.checkClearRow();
          return true;
        }
      }
      return false;
    };

    // hard dropping!!
    hardDrop = () => {
      while (!this.VerticalCollision()) {
        this.startY++;
      }
    };

    // detect for horizontal boundary
    hittingWall = (direction: string) => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        if (this.tetroArray[i][1] + this.startX === 0 && direction === 'Left') {
          console.log('Hitting the left wall');
          return true;
        } else if (
          this.tetroArray[i][1] + this.startX + 1 === arrayWidth &&
          direction === 'Right'
        ) {
          console.log('Hitting the right wall');
          return true;
        }
      }
      return false;
    };

    // check for collision
    horizontalCollsion = (direction: string) => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        if (
          stopedShapeArray[this.tetroArray[i][0] + this.startY][
            this.tetroArray[i][1] + this.startX - 1
          ] === 1 &&
          direction === 'Left'
        ) {
          console.log('Hitting the left stop chuck');
          return true;
        } else if (
          stopedShapeArray[this.tetroArray[i][0] + this.startY][
            this.tetroArray[i][1] + this.startX + 1
          ] === 1 &&
          direction === 'Right'
        ) {
          console.log('Hitting the right stop chuck');
          return true;
        }
      }
      return false;
    };

    // Rotate right, hard coded it
    rotateRight = () => {
      let rotateArray = [];
      if (this.tetroArray === Oshape || this.shape === 'O') {
        this.shape = 'O';
        rotateArray = Oshape;
      } else if (this.tetroArray === Ishape || this.shape === 'I') {
        rotateArray = [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
        ];
        this.shape = 'rI';
      } else if (this.shape === 'lI' || this.shape === 'rI') {
        rotateArray = Ishape;
        this.shape = 'I';
      } else if (this.tetroArray === Sshape || this.shape === 'S') {
        rotateArray = [
          [0, 1],
          [1, 1],
          [1, 2],
          [2, 2],
        ];
        this.shape = 'rS';
      } else if (this.shape === 'rS') {
        rotateArray = Sshape;
        this.shape = 'S';
      } else if (this.tetroArray === Zshape || this.shape === 'Z') {
        rotateArray = [
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 1],
        ];
        this.shape = 'rZ';
      } else if (this.shape === 'rZ') {
        rotateArray = Zshape;
        this.shape = 'Z';
      } else if (!this.shape) {
        rotateArray.push([1, 1]);
        for (let i = 0; i < this.tetroArray.length; i++) {
          if (this.tetroArray[i][0] === 0 && this.tetroArray[i][1] === 0) {
            rotateArray.push([0, 2]);
          } else if (
            this.tetroArray[i][0] === 0 &&
            this.tetroArray[i][1] === 1
          ) {
            rotateArray.push([1, 2]);
          } else if (
            this.tetroArray[i][0] === 0 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([2, 2]);
          } else if (
            this.tetroArray[i][0] === 1 &&
            this.tetroArray[i][1] === 0
          ) {
            rotateArray.push([0, 1]);
          } else if (
            this.tetroArray[i][0] === 1 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([2, 1]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 0
          ) {
            rotateArray.push([0, 0]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 1
          ) {
            rotateArray.push([1, 0]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([2, 0]);
          }
        }
      }
      // check if it can be rotated
      if (this.rotatable(rotateArray)) {
        this.tetroArray = rotateArray;
      }
    };
    // Rotate left, hard coded it
    rotateLeft = () => {
      let rotateArray = [];
      if (this.tetroArray === Oshape || this.shape === 'O') {
        this.shape = 'O';
        rotateArray = Oshape;
      } else if (this.tetroArray === Ishape || this.shape === 'I') {
        rotateArray = [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ];
        this.shape = 'lI';
      } else if (this.shape === 'rI') {
        rotateArray = Ishape;
        this.shape = 'I';
        // can't be bother to change S and Z
      } else if (this.tetroArray === Sshape || this.shape === 'S') {
        rotateArray = [
          [0, 1],
          [1, 1],
          [1, 2],
          [2, 2],
        ];
        this.shape = 'rS';
      } else if (this.shape === 'rS') {
        rotateArray = Sshape;
        this.shape = 'S';
      } else if (this.tetroArray === Zshape || this.shape === 'Z') {
        rotateArray = [
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 1],
        ];
        this.shape = 'rZ';
      } else if (this.shape === 'rZ') {
        rotateArray = Zshape;
        this.shape = 'Z';
      } else if (!this.shape) {
        rotateArray.push([1, 1]);
        for (let i = 0; i < this.tetroArray.length; i++) {
          if (this.tetroArray[i][0] === 0 && this.tetroArray[i][1] === 0) {
            rotateArray.push([2, 0]);
          } else if (
            this.tetroArray[i][0] === 0 &&
            this.tetroArray[i][1] === 1
          ) {
            rotateArray.push([1, 0]);
          } else if (
            this.tetroArray[i][0] === 0 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([0, 0]);
          } else if (
            this.tetroArray[i][0] === 1 &&
            this.tetroArray[i][1] === 0
          ) {
            rotateArray.push([2, 1]);
          } else if (
            this.tetroArray[i][0] === 1 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([0, 1]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 0
          ) {
            rotateArray.push([2, 2]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 1
          ) {
            rotateArray.push([1, 2]);
          } else if (
            this.tetroArray[i][0] === 2 &&
            this.tetroArray[i][1] === 2
          ) {
            rotateArray.push([0, 2]);
          }
        }
      }
      // check if it can be rotated
      if (this.rotatable(rotateArray)) {
        this.tetroArray = rotateArray;
      }
    };

    // check for to see if it's rotatable
    rotatable = (rotateArray: number[][]) => {
      for (let i = 0; i < rotateArray.length; i++) {
        if (
          rotateArray[i][0] + this.startY >= arrayHeight ||
          rotateArray[i][1] + this.startX >= arrayWidth ||
          rotateArray[i][1] + this.startX < 0
        ) {
          console.log('Rotation hit the boundary');
          return false;
        } else if (
          stopedShapeArray[rotateArray[i][0] + this.startY][
            rotateArray[i][1] + this.startX
          ] === 1
        ) {
          console.log('Rotation will hit the block');
          return false;
        }
      }
      return true;
    };

    // check to see if a row can be cleared
    checkClearRow = () => {
      let combo = -1;
      for (let i = 0; i < stopedShapeArray.length; i++) {
        if (stopedShapeArray[i].indexOf(0) === -1) {
          console.log('clearing row');
          let { lineClear, score } = recordRef.current;
          lineClear++;
          combo++;
          this.levelUp();
          for (let j = i; j > 0; j--) {
            stopedShapeArray[j] = stopedShapeArray[j - 1];
            gameBoardColorArray[j] = gameBoardColorArray[j - 1];
          }
          stopedShapeArray[0] = Array(arrayWidth).fill(0);
          gameBoardColorArray[0] = Array(arrayWidth).fill(canvasColor);
          console.log('finish clearing row');
          for (let i = 0; i < coorArray.length; i++) {
            for (let j = 0; j < coorArray[i].length; j++) {
              this.ctx.fillStyle = gameBoardColorArray[i][j];
              this.ctx.fillRect(coorArray[i][j].x, coorArray[i][j].y, 16, 16);
            }
          }
          // account for combo score, and iterate it
          let { level } = recordRef.current;
          score += 10 * combo + level * 5;
          recordRef.current = { score, level, lineClear };
        }
      }
      useRecord(recordRef.current);
    };

    // check to see if we can level up, it is set to be every 5 lines we can level up
    levelUp = () => {
      let { level, lineClear } = recordRef.current;
      if (lineClear % 4 === 0 && lineClear !== 0) {
        level++;
        console.log(level);
        recordRef.current = { ...recordRef.current, level };
        window.clearInterval(dropEventRef.current);
        dropEventRef.current = window.setInterval(() => {
          curTetrominoRef.current?.update(KeyPress.Down);
          // set interval can drop faster over time
        }, initialDropTime / level);
        console.log('New time interval: ', initialDropTime / level);
      }
    };

    // check if we lost the game
    checkLose = () => {
      for (let i = 0; i < this.tetroArray.length; i++) {
        if (
          stopedShapeArray[this.tetroArray[i][0] + this.startY][
            this.tetroArray[i][1] + this.startX
          ] === 1
        ) {
          return true;
        }
      }
      return false;
    };
  }

  const rePaintCanvas = () => {
    console.log(
      'Re painting the canvas',
      canvasColor,
      canvasWidth,
      canvasHeight
    );
    console.log(ctx);
    ctx!.fillStyle = canvasColor;
    ctx!.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // reset game
  const resetGame = () => {
    const {
      coorArray: newCoor,
      gameBoardArray: newGameboard,
      gameBoardColorArray: newGameboardColor,
      stopedShapeArray: newStopedShape,
    } = initiateArrays(arrayWidth, arrayHeight, scale, canvasColor);

    coorArray = newCoor;
    gameBoardArray = newGameboard;
    gameBoardColorArray = newGameboardColor;
    stopedShapeArray = newStopedShape;

    rePaintCanvas();

    recordRef.current = { score: 0, level: 1, lineClear: 0 };

    initiateTetromino();
  };

  return { useCtx, resetGame, updateMove };
};
