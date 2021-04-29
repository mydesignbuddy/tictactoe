const renderCell = (val) => (val !== 0 ? (val === 1 ? "X" : "O") : " ");

const renderDisplay = (boardState) => {
  let buffer = "\n";
  boardState.forEach((row, rowIndex) => {
    let tempRow = [];
    buffer += rowIndex === 0 ? "\n   A   B   C \n" : "";
    row.forEach((cell, cellIndex) => {
      buffer += cellIndex === 0 ? `${rowIndex + 1} ` : "";
      tempRow.push(renderCell(cell));
    });
    buffer += ` ${tempRow.join(" | ")} `;
    buffer += rowIndex === 2 ? "" : "\n  -----------\n";
  });
  return `${buffer}\n`;
};

const renderWelcome = () => {
  let buffer = "*****************************\n";
  buffer += "* Welcome to Tic-Tac-Toe!!! *\n";
  buffer += "*****************************\n\n";
  return buffer;
};

const renderChoices = (emptyCells) => {
  const colLabels = ["A", "B", "C"];
  return emptyCells
    .map(
      (choice, choiceIndex) =>
        `${choiceIndex + 1}: ${colLabels[choice.cellIndex]}:${
          choice.rowIndex + 1
        }`
    )
    .join("\n");
};

const renderPlayer = (isXTurn) => (isXTurn ? "X" : "O");

const renderWinner = (defaultBoardState, isXTurn) => {
  let buffer = "";
  boardState = [...defaultBoardState];
  buffer += "********************************\n";
  buffer += `* Congrats Player ${renderPlayer(isXTurn)} you WON!!! *\n`;
  buffer += "********************************\n\n";
  return buffer;
};

module.exports = {
  renderCell,
  renderChoices,
  renderDisplay,
  renderPlayer,
  renderWelcome,
  renderWinner,
};
