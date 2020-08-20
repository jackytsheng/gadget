
// merge the array from left to right.
// update the score receiving a function that takes in previous score as input
 const merge = (array, score) => {
   let result = [];
   while (array.length > 1) {
     if (array[0] === array[1]) {
       result.push(array.shift() + array.shift());
       score += result[result.length - 1];
     } else {
       result.push(array.shift());
     }
   }
   if (array.length === 1) {
     result.push(array.shift());
     return result;
   }
   return [result , score];
 };

//generate gameboard

export const generateAvailableCoor = () => {
  let result = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      result.push({ y, x });
    }
  }
  return result;
};



export const randomGenerator = (
         array,
         availableCoordinate) => {
         let gameBoard = JSON.parse(JSON.stringify(array));
         let coorIndex = Math.floor(Math.random() * availableCoordinate.length);
         let coor = availableCoordinate[coorIndex];
         availableCoordinate.splice(coorIndex, 1);
         return [
           gameBoard.map((row, y) => {
             if (y === coor.y) {
               row.forEach((cell, x) => {
                 if (x === coor.x) {
                   row[x] = Math.ceil(Math.random() * 3) === 3 ? 4 : 2;
                 }
               });
             }
             return row;
           }),
           availableCoordinate,
         ];
       };


const updateAvailable = (gameBoard) => {
  console.log(gameBoard);
    let availableCoordinate = [];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if(gameBoard[y][x]===0){
                availableCoordinate.push({y,x});
            }
        }
    }
    return availableCoordinate;
}

export default (keyPress, board, score = 0,lost = false) => {
  let column = [];
  let row = [];
  let newScore;
  let availableCoordinate;
  let updateFlag = false;
  let result;
  let gameBoard = JSON.parse(JSON.stringify(board));
  console.log(keyPress, gameBoard, board);
    switch (keyPress) {
      case "Up":
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            column.push(gameBoard[j][i]);
          }
          column = column.filter((number) => number !== 0);
          // if push up, don't need to reverse the column, it is in order
          [result,newScore] = merge(column, score);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = gameBoard[k][i];
            gameBoard[k][i] = result[k];
            if (gameBoard[k][i] !== preValue) {
              updateFlag = true;
            }
          }
        }
        if (updateFlag) {
          availableCoordinate = updateAvailable(gameBoard);
          [gameBoard, availableCoordinate] = randomGenerator(gameBoard, availableCoordinate);
        }
        return [gameBoard, newScore, availableCoordinate, lost];
      case "Down":
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            column.push(gameBoard[j][i]);
          }
          column = column.filter((number) => number !== 0);
          [result, newScore] = merge(column.reverse(), score);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = gameBoard[k][i];
            gameBoard[k][i] = result[3 - k];
            if (gameBoard[k][i] !== preValue) {
              updateFlag = true;
            }
          }
        }
        if (updateFlag) {
          availableCoordinate = updateAvailable(gameBoard);
          [gameBoard, availableCoordinate] = randomGenerator(gameBoard, availableCoordinate);
        }
        return [gameBoard, newScore, availableCoordinate, lost];
      case "Left":
        for (let i = 0; i < 4; i++) {
          row = gameBoard[i];
          row = row.filter((number) => number !== 0);

          [result, score] = merge(row, score);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = gameBoard[i][k];
            gameBoard[i][k] = result[k];
            if (gameBoard[i][k] !== preValue) {
              updateFlag = true;
            }
          }
        }
        if (updateFlag) {
          availableCoordinate = updateAvailable(gameBoard);
          [gameBoard, availableCoordinate] = randomGenerator(gameBoard, availableCoordinate);
        }
        return [gameBoard, newScore, availableCoordinate, lost];
      case "Right":
        for (let i = 0; i < 4; i++) {
          row = gameBoard[i];
          row = row.filter((number) => number !== 0);
          [result, score] = merge(row.reverse(), score);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = gameBoard[i][k];
            gameBoard[i][k] = result[3 - k];
            if (gameBoard[i][k] !== preValue) {
              updateFlag = true;
            }
          }
        }
        if (updateFlag) {
          availableCoordinate = updateAvailable(gameBoard);
          [gameBoard, availableCoordinate] = randomGenerator(gameBoard, availableCoordinate);
        }
        return [gameBoard, newScore, availableCoordinate, lost];
      default:
        return [gameBoard,score, availableCoordinate,lost];
      }
    }