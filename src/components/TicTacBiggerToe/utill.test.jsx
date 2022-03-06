import { checkWin, isGameEnd, makeMove } from './util';
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
    gameGrid                                                        | result
    ${[[0, 0, 0], [0, 0, 'X3'], [0, 0, 0]]}                         | ${false}
    ${[['O2', 'O2', 'X3'], ['X3', 'O1', 'X3'], ['O1', 'O1', 'X1']]} | ${true}
  `(
    'check has game ended or not for result $result',
    ({ gameGrid, result }) => {
      expect(isGameEnd(gameGrid)).toBe(result);
    }
  );
});
