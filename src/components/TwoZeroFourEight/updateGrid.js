


const checkLose = (gameBoard) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[j][i] === gameBoard[j + 1][i]) {
        return false;
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === gameBoard[i][j + 1]) {
        return false;
      }
    }
  }
  console.log("lose");
  return true;
};


// merge the array from left to right.
// update the score receiving a function that takes in previous score as input
 const merge = (InputArray, score) => {
   let array = [...InputArray];
   let result = [];
   let newScore = score;
   while (array.length > 1) {
     if (array[0] === array[1]) {
       let firstNumber = array.shift();
       let secondNumber = array.shift();
       result.push(firstNumber + secondNumber);
       newScore += firstNumber + secondNumber;
     } else {
       result.push(array.shift());
     }
   }
   if (array.length === 1) {
     result.push(array.shift());
   }
   return [result, newScore];
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
         Coordinate) => {
         let gameBoard = JSON.parse(JSON.stringify(array));
         let availableCoordinate = JSON.parse(JSON.stringify(Coordinate));
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
    let availableCoordinate = [];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if(gameBoard[y][x]===0){
              availableCoordinate.push({y,x});
            }
        }
    }
    return JSON.stringify(availableCoordinate);
}

export default (keyPress, gameBoard, score = 0,lost = false) => {
  let column;
  let row = [];
  let newScore = score;
  let availableCoordinate;
  let updateFlag = false;
  let result;
  let board = JSON.parse(JSON.stringify(gameBoard));
    switch (keyPress) {
      case "Up":
        for (let y = 0; y < 4; y++) {
          column = []
          for (let x = 0; x < 4; x++) {
            column.push(board[x][y]);
          }
          column = column.filter((number) => number !== 0);
          // if push up, don't need to reverse the column, it is in order
          [result, newScore] = merge(column, newScore);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = board[k][y];
            board[k][y] = result[k];
            if (board[k][y] !== preValue) {
              updateFlag = true;
            }
          }
        }
        break
      case "Down":
        for (let y = 0; y < 4; y++) {
          column = [];
          for (let x = 0; x < 4; x++) {
            column.push(board[x][y]);
          }
          column = column.filter((number) => number !== 0);
          [result, newScore] = merge(column.reverse(), newScore);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = board[k][y];
            board[k][y] = result[3-k];
            if (board[k][y] !== preValue) {
              updateFlag = true;
            }
          }
        }
        break
      case "Left":
        for (let y = 0; y < 4; y++) {
          row = board[y];
          row = row.filter((number) => number !== 0);

          [result, newScore] = merge(row, newScore);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = board[y][k];
            board[y][k] = result[k];
            if (board[y][k] !== preValue) {
              updateFlag = true;
            }
          }
        }
        break
      case "Right":
        for (let y = 0; y < 4; y++) {
          row = board[y];
          row = row.filter((number) => number !== 0);
          [result, newScore] = merge(row.reverse(), newScore);
          //pad 0 in front
          result = [...result, ...Array(4 - result.length).fill(0)];
          for (let k = 0; k < 4; k++) {
            let preValue = board[y][k];
            board[y][k] = result[3 - k];
            if (board[y][k] !== preValue) {
              updateFlag = true;
            }
          }
        }
        break
      default:
        break
      }
    availableCoordinate = JSON.parse(updateAvailable(board));
    if (updateFlag) {
      [board, availableCoordinate] = randomGenerator(
        board,
        availableCoordinate
      );
    }
    if (availableCoordinate.length === 0)lost = checkLose(board);
    return [board, newScore, availableCoordinate, lost];
  }