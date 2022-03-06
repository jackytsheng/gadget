export const checkWin = (
  rowsContainer,
  columnsContainer,
  diagonalContainer,
  oppositeDiagonalContainer
) => {
  // check diagonal
  if (
    !diagonalContainer?.includes(0) ||
    !oppositeDiagonalContainer?.includes(0)
  ) {
    return true;
  }
  // check row and columns
  for (let i = 0; i < 3; i++) {
    if (rowsContainer[i] === 3 || columnsContainer[i] === 3) {
      return true;
    }
  }
  return false;
};

export const isGameEnd = (grid) => {
  let still0;
  grid.forEach((r) => (still0 = r.includes(0)));
  return !still0;
};

export const makeMove = (playerGrids, row, column) => {
  // Populate all the containers based on the marked position
  const copyGrids = deepCopy(playerGrids);

  copyGrids.rows[row] += 1;
  copyGrids.cols[column] += 1;

  if (row === column) {
    copyGrids.diag[row] += 1;
  }

  if (row + column + 1 === 3) {
    copyGrids.oDiag[row] += 1;
  }

  return copyGrids;
};

export const deepCopy = (a) => JSON.parse(JSON.stringify(a));
