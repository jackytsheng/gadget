import {
  checkNoMoreMove,
  checkWin,
  isGameEnd,
  makeMove,
  takeOutFromGrid,
} from './util';
describe('Util test', () => {
  it.each`
    rows         | columns      | diag         | oDiag        | result
    ${[0, 0, 3]} | ${[0, 0, 0]} | ${[0, 0, 0]} | ${[0, 0, 0]} | ${true}
    ${[0, 0, 2]} | ${[1, 0, 0]} | ${[1, 0, 0]} | ${[1, 1, 0]} | ${false}
    ${[0, 0, 0]} | ${[0, 3, 0]} | ${[0, 0, 0]} | ${[0, 0, 0]} | ${true}
    ${[0, 0, 0]} | ${[0, 0, 0]} | ${[1, 1, 1]} | ${[0, 0, 0]} | ${true}
    ${[0, 0, 0]} | ${[0, 0, 0]} | ${[0, 0, 0]} | ${[1, 1, 1]} | ${true}
  `(
    'should match result by passing winning condition',
    ({ rows, columns, diag, oDiag, result }) => {
      expect(checkWin(rows, columns, diag, oDiag)).toBe(result);
    }
  );

  it.each`
    pGrids                                                                     | row  | col  | resultGrid
    ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${0} | ${0} | ${{ rows: [1, 0, 0], cols: [1, 0, 0], diag: [1, 0, 0], oDiag: [0, 0, 0] }}
    ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${2} | ${0} | ${{ rows: [0, 0, 1], cols: [1, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 1] }}
    ${{ rows: [1, 0, 0], cols: [0, 1, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${1} | ${1} | ${{ rows: [1, 1, 0], cols: [0, 2, 0], diag: [0, 1, 0], oDiag: [0, 1, 0] }}
    ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${0} | ${1} | ${{ rows: [1, 0, 0], cols: [0, 1, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }}
    ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${1} | ${0} | ${{ rows: [0, 1, 0], cols: [1, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }}
  `(
    'checking result for placement on $row $col',
    ({ pGrids, row, col, resultGrid }) => {
      expect(JSON.stringify(makeMove(pGrids, row, col))).toBe(
        JSON.stringify(resultGrid)
      );
    }
  );
  it.each`
    grid                                                            | cur    | resultGrids                                                                | row  | col  | pGrids
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'X'} | ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${0} | ${0} | ${{ rows: [1, 0, 0], cols: [1, 0, 0], diag: [1, 0, 0], oDiag: [0, 0, 0] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'X'} | ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${2} | ${0} | ${{ rows: [0, 0, 1], cols: [1, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 1] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'X'} | ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${0} | ${1} | ${{ rows: [1, 0, 0], cols: [0, 1, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'O'} | ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${1} | ${0} | ${{ rows: [0, 1, 0], cols: [1, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'O'} | ${{ rows: [1, 0, 1], cols: [1, 0, 1], diag: [1, 0, 1], oDiag: [0, 0, 0] }} | ${1} | ${1} | ${{ rows: [1, 0, 1], cols: [1, 0, 1], diag: [1, 0, 1], oDiag: [0, 0, 0] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'X'} | ${{ rows: [0, 0, 0], cols: [0, 0, 0], diag: [0, 0, 0], oDiag: [0, 0, 0] }} | ${1} | ${1} | ${{ rows: [0, 1, 0], cols: [0, 1, 0], diag: [0, 1, 0], oDiag: [0, 1, 0] }}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${'O'} | ${{ rows: [2, 0, 1], cols: [0, 2, 0], diag: [1, 0, 0], oDiag: [0, 0, 0] }} | ${1} | ${1} | ${{ rows: [2, 0, 1], cols: [0, 2, 0], diag: [1, 0, 0], oDiag: [0, 0, 0] }}
  `(
    'checking result for placement on $row $col and taken out',
    ({ grid, cur, pGrids, row, col, resultGrids }) => {
      expect(JSON.stringify(takeOutFromGrid(grid, cur, pGrids, row, col))).toBe(
        JSON.stringify(resultGrids)
      );
    }
  );
  it.each`
    gameGrid                                                        | result
    ${[[0, 0, 0], [0, 0, 'X3'], [0, 0, 0]]}                         | ${false}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${true}
  `(
    'check has game ended or not for result $result',
    ({ gameGrid, result }) => {
      expect(isGameEnd(gameGrid)).toBe(result);
    }
  );
  it.each`
    gameGrid                                                        | result
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${false}
    ${[['O2', 'O2', 'X3'], ['X2', 'O3', 'X3'], ['O3', 'O3', 'X3']]} | ${true}
    ${[['O2', 'O2', 'X3'], ['X2', 'O3', 'X3'], ['O3', 'O3', 'X2']]} | ${false}
  `('check is game has any more move for result', ({ gameGrid, result }) => {
    expect(checkNoMoreMove(gameGrid)).toBe(result);
  });
});
