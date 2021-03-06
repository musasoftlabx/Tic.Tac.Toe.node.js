// Initialize the game.
const game = (board) => {
  let position = move(board);
  return AddBoard(board, position);
};

// Return the index of the next move.
const move = (board) => {
  switch (GameCounter(board)) {
    case 0:
    case 1:
      return FirstMove(board);
      break;
    case 2:
      return SecondMove(board);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return IncrementalMove(board);
      break;
  }
};

// Count the number of moves in the game.
const GameCounter = (board) => {
  let counter = 0;

  board.forEach((element) => {
    if (element !== " ") counter++;
  });

  return counter;
};

// Adds new move and returns the new board
const AddBoard = (board, position) => {
  let move = WhoseTurn(board);
  let NewBoard = [];

  for (let i = 0; i < board.length; i++) {
    i === position ? NewBoard.push(move) : NewBoard.push(board[i]);
  }

  return NewBoard;
};

//Checks if its x or o's turn
const WhoseTurn = (board) => {
  let x = 0,
    o = 0;

  board.forEach((e) => {
    if (e === "x") x++;
    if (e === "o") o++;
  });

  return x === o ? "x" : "o";
};

// Declare the first move of the game. In this case, the first move is always the center square.
const FirstMove = (board) =>
  board.indexOf("x") === 4 || board.indexOf("x") === -1 ? 0 : 4;

// Declare the second move of the game.
const SecondMove = (board) => {
  switch (board.indexOf("o")) {
    case 1:
    case 2:
      return 3;
      break;
    case 3:
    case 4:
    case 6:
      return 1;
      break;
    case 5:
      return 4;
      break;
    case 7:
    case 8:
      return 2;
      break;
  }
};

// Determine if there is a winning move.
const WinningMove = (board) => {
  var WinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  var WinningIndex = false;

  var move = WinningCombinations.find((combo) => {
    let xCount = 0;
    let yCount = 0;
    let emptyCount = 0;
    let emptyIndex;

    combo.reduce((n, val, index) => {
      if (board[val] === "x") xCount++;
      if (board[val] === "o") yCount++;
      if (board[val] === " ") {
        emptyCount++;
        emptyIndex = val;
      }
    }, 0);

    if ((xCount || yCount) === 2 && emptyCount === 1) WinningIndex = emptyIndex;

    return (xCount || yCount) === 2 && emptyCount === 1;
  });

  return WinningIndex;
};

// Return the best possible move
const IncrementalMove = (board) => {
  if (typeof WinningMove(board) === "number") {
    return WinningMove(board);
  }

  switch (GameCounter(board)) {
    case 3:
      if (board[0] === "x" && board[5] === "x") return 7;
      if (board[0] === "x" && board[7] === "x") return 5;
      if (board[0] === "x" && board[8] === "x") return 1;
      if (board[1] === "x" && board[3] === "x") return 2;
      if (board[1] === "x" && board[5] === "x") return 0;
      if (board[1] === "x" && board[6] === "x") return 5;
      if (board[1] === "x" && board[7] === "x") return 0;
      if (board[1] === "x" && board[8] === "x") return 3;
      if (board[2] === "x" && board[3] === "x") return 7;
      if (board[2] === "x" && board[6] === "x") return 1;
      if (board[2] === "x" && board[7] === "x") return 3;
      if (board[3] === "x" && board[5] === "x") return 0;
      if (board[3] === "x" && board[7] === "x") return 0;
      if (board[3] === "x" && board[8] === "x") return 1;
      if (board[4] === "x" && board[8] === "x") return 2;
      if (board[5] === "x" && board[6] === "x") return 1;
      if (board[5] === "x" && board[7] === "x") return 2;
      break;
    case 4:
      if (board[1] === "o" && board[6] === "o") return 4;
      if (board[2] === "o" && board[3] === "o") return 4;
      if (board[1] === "o" && board[8] === "o") return 6;
      break;
    default:
      return board.indexOf(" ");
  }
};

// Export the game.
module.exports = game;
