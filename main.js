const readline = require("readline");
const {
  renderChoices,
  renderDisplay,
  renderPlayer,
  renderWelcome,
  renderWinner,
} = require("./renders");

class TicTacToe {
  x = 1;
  o = 5; // increments of 5 to avoid collisons with x player
  xWins = 3;
  oWins = 15;
  isXTurn = true;
  rl;
  defaultBoardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  boardState;

  constructor() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.boardState = [...this.defaultBoardState];
  }

  getEmptyCells() {
    let emptyCells = [];
    this.boardState.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 0) {
          emptyCells.push({ rowIndex, cellIndex });
        }
      });
    });
    return emptyCells;
  }

  setCell(rowIndex, cellIndex, val) {
    this.boardState[rowIndex][cellIndex] = val;
  }

  checkForWinner = () => {
    let winner = 0;
    // row checking
    for (let row = 0; row < 3; row++) {
      winner = this.getWinner(
        this.boardState[row][0] +
          this.boardState[row][1] +
          this.boardState[row][2]
      );
      if (winner) return winner;
    }
    winner = 0;

    // column checking
    for (let col = 0; col < 3; col++) {
      winner = this.getWinner(
        this.boardState[0][col] +
          this.boardState[1][col] +
          this.boardState[2][col]
      );
      if (winner) return winner;
    }
    winner = 0;

    // top-left to bottom right
    winner = this.getWinner(
      this.boardState[0][0] + this.boardState[1][1] + this.boardState[2][2]
    );
    if (winner) return winner;

    // top-right to bottom left
    winner = this.getWinner(
      this.boardState[0][2] + this.boardState[1][1] + this.boardState[2][0]
    );
    if (winner) return winner;

    return 0;
  };

  getWinner(sum) {
    return sum === this.xWins ? 1 : sum === this.oWins ? 2 : 0;
  }

  newGame() {
    this.boardState = [...this.defaultBoardState];
    return renderWelcome();
  }

  parseAnswer(choices, answer) {
    const a = parseInt(answer);
    if (a <= choices.length) {
      return choices[a - 1];
    } else {
      throw new Error();
    }
  }

  takeTurn() {
    this.rl.question(
      `${renderDisplay(this.boardState)}\nPlayer ${renderPlayer(
        this.isXTurn
      )}'s turn (type 'exit' to quit):\n${renderChoices(
        this.getEmptyCells()
      )}\n`,
      (answer) => {
        if (answer === "exit") {
          process.exit(0);
        }

        try {
          const choices = this.getEmptyCells();
          if (choices.length <= 0) {
            console.log("Sorry, no winners :(");
            process.exit(0);
          }
          const a = this.parseAnswer(choices, answer);
          this.setCell(a.rowIndex, a.cellIndex, this.isXTurn ? this.x : this.o);
          const winner = this.checkForWinner();
          if (winner > 0) {
            console.log(renderDisplay(this.boardState));
            console.log(renderWinner(this.defaultBoardState, this.isXTurn));
            process.exit(0);
          }
          this.isXTurn = !this.isXTurn; // toggle current player
        } catch (err) {
          console.log("Sorry, invalid answer. Please try again.");
          this.takeTurn();
        }

        this.takeTurn();
      }
    );
  }

  start() {
    this.rl.question(`${this.newGame()}Start by pressing any key`, () => {
      this.takeTurn();
    });
  }
}

const game = new TicTacToe();
game.start();
