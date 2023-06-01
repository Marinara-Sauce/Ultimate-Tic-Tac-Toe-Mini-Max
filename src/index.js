// State of every single square
var gameState;

// Renders the board in HTML
function renderBoard() {
  var board = document.getElementById('main-board');
  board.innerHTML = '';
  
  for (var row = 0; row < 3; row++) {
    var boardRow = document.createElement('div');
    boardRow.className = 'board-row';

    for (var col = 0; col < 3; col++) {
      var miniBoard = document.createElement('div');
      miniBoard.className = 'board';

      if (gameState.nextLocation[0] == row && gameState.nextLocation[1] == col) {
        miniBoard.classList.add('target');
      }

      if (gameState.board[row][col] != '') {
        var boardWon = document.createElement('div');
        boardWon.className = 'board-won';

        if (gameState.board[row][col] == 'X') {
            var oWon = document.createElement('h1');
            oWon.className = 'won-x';
            oWon.textContent = 'X'

            boardWon.appendChild(oWon);
        }

        else if (gameState.board[row][col] == 'O') {
            var oWon = document.createElement('h1');
            oWon.className = 'won-o';
            oWon.textContent = 'O'

            boardWon.appendChild(oWon);
        }

        miniBoard.appendChild(boardWon);
    }
      
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          var cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.row = (row * 3) + i;
          cell.dataset.col = (col * 3) + j;
          cell.addEventListener('click', playMove);
          
          var value = gameState.game[(row * 3) + i][(col * 3) + j];
          if (value === 'X') {
            cell.classList.add('played-x');
            cell.textContent = value;
          } else if (value === 'O') {
            cell.classList.add('played-o');
            cell.textContent = value;
          }
          
          miniBoard.appendChild(cell);
        }
      }
      
      boardRow.appendChild(miniBoard);
    }

    board.appendChild(boardRow)
  }
}

function playMove(event) {
    var row = event.target.dataset.row;
    var col = event.target.dataset.col;

    console.log("playing: ", row, col)
    
    newState = makeMove(row, col, JSON.stringify(gameState));

    if (newState) gameState = newState;

    renderBoard();

    var gameWinner = checkForGameWin(gameState);

    if (gameWinner != '')
        alert(gameWinner + " Wins!");
    else {
      if (!gameState.xTurn) {
        gameStateJSON = JSON.stringify(gameState);
        determineMove({node: JSON.parse(gameStateJSON), children: []});
      }
    }
      
}

// Setup the game
function setup() {
    
    gameState = {
        game: [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
        ],

        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],

        xTurn: true,
        nextLocation: [-1, -1]
    };

    renderBoard();
}

// Initial rendering of the board
window.addEventListener('load', setup);