// Makes a certain move in a row/col, returns the resulting game state
function makeMove(row, col, currGame) {
    currGame = JSON.parse(currGame);

    // Fetch which board this move was made
    var boardRow = Math.floor(row / 3);
    var boardCol = Math.floor(col / 3);

    // Check that this move is valid first
    if (currGame.game[row][col] != '') return;
    if (currGame.board[boardRow][boardCol] != '') {
        return;
    }
    if (currGame.nextLocation[0] != -1) {
        if (boardRow != currGame.nextLocation[0] || boardCol != currGame.nextLocation[1]) {
            return;
        }
    }

    // Update the game state and re-render the board
    currGame.xTurn ? currGame.game[row][col] = 'X' : currGame.game[row][col] = 'O';
    currGame.xTurn = !currGame.xTurn;
    
    // Determine if that specific board has a victory
    var boardWon = checkForBoardWin(currGame, boardRow, boardCol);

    // Determine the location for the next player to make a move
    boardWon == '' ? currGame.nextLocation = [row % 3, col % 3] : currGame.nextLocation = [-1, -1];
    if (currGame.nextLocation[0] != -1 && currGame.board[currGame.nextLocation[0]][currGame.nextLocation[1]] != '') 
        currGame.nextLocation = [-1, -1];

    currGame.board[boardRow][boardCol] = boardWon;

    return currGame;
}

// Check for a specific board win
function checkForBoardWin(gameState, row, col) {

    // Check for row wins
    for (var r = 0 ; r < 3 ; r++) {
        var currentWinner = '';
        for (var c = 0 ; c < 3 ; c++) {
            var valAtLoc = gameState.game[(row * 3) + r][(col * 3) + c];

            if (valAtLoc == '') {
                currentWinner = '';
                break;
            }

            if (currentWinner == '')
                currentWinner = valAtLoc
            
            else if (currentWinner != valAtLoc) {
                currentWinner = '';
                break;
            }
        }

        if (currentWinner != '') return currentWinner;
    }

    // Check for column wins
    for (var c = 0 ; c < 3 ; c++) {
        var currentWinner = '';
        for (var r = 0 ; r < 3 ; r++) {
            var valAtLoc = gameState.game[(row * 3) + r][(col * 3) + c];

            if (valAtLoc == '') {
                currentWinner = '';
                break;
            }

            if (currentWinner == '')
                currentWinner = valAtLoc
            
            else if (currentWinner != valAtLoc) {
                currentWinner = '';
                break;
            }
        }

        if (currentWinner != '') return currentWinner;
    }

    // Check for diagonal wins
    var currentWinner = '';

    // Left to right
    for (var i = 0 ; i < 3 ; i++) {
        var valAtLoc = gameState.game[(row * 3) + i][(col * 3) + i];

        if (valAtLoc == '') {
            currentWinner = '';
            break;
        }

        if (currentWinner == '')
            currentWinner = valAtLoc
        
        else if (currentWinner != valAtLoc) {
            currentWinner = '';
            break;
        }
    }

    if (currentWinner != '') return currentWinner;

    // Right to left
    currentWinner = '';

    for (var i = 0 ; i < 3 ; i++) {
        var valAtLoc = gameState.game[(row * 3) + i][(col * 3) + (2 - i)];

        if (valAtLoc == '') {
            currentWinner = '';
            break;
        }

        if (currentWinner == '')
            currentWinner = valAtLoc
        
        else if (currentWinner != valAtLoc) {
            currentWinner = '';
            break;
        }
    }

    return currentWinner;
}

// Check for game win
function checkForGameWin(gameState) {

    // Check for row wins
    for (var r = 0 ; r < 3 ; r++) {
        var currentWinner = '';
        for (var c = 0 ; c < 3 ; c++) {
            var valAtLoc = gameState.board[r][c];

            if (valAtLoc == '') {
                currentWinner = '';
                break;
            }

            if (currentWinner == '')
                currentWinner = valAtLoc
            
            else if (currentWinner != valAtLoc) {
                currentWinner = '';
                break;
            }
        }

        if (currentWinner != '') return currentWinner;
    }

    // Check for column wins
    for (var c = 0 ; c < 3 ; c++) {
        var currentWinner = '';
        for (var r = 0 ; r < 3 ; r++) {
            var valAtLoc = gameState.board[r][c];

            if (valAtLoc == '') {
                currentWinner = '';
                break;
            }

            if (currentWinner == '')
                currentWinner = valAtLoc
            
            else if (currentWinner != valAtLoc) {
                currentWinner = '';
                break;
            }
        }

        if (currentWinner != '') return currentWinner;
    }

    // Check for diagonal wins
    var currentWinner = '';

    // Left to right
    for (var i = 0 ; i < 3 ; i++) {
        var valAtLoc = gameState.board[i][i];

        if (valAtLoc == '') {
            currentWinner = '';
            break;
        }

        if (currentWinner == '')
            currentWinner = valAtLoc
        
        else if (currentWinner != valAtLoc) {
            currentWinner = '';
            break;
        }
    }

    if (currentWinner != '') return currentWinner;

    // Right to left
    currentWinner = '';

    for (var i = 0 ; i < 3 ; i++) {
        var valAtLoc = gameState.board[i][2 - i];

        if (valAtLoc == '') {
            currentWinner = '';
            break;
        }

        if (currentWinner == '')
            currentWinner = valAtLoc
        
        else if (currentWinner != valAtLoc) {
            currentWinner = '';
            break;
        }
    }

    for (var r = 0 ; r < gameState.board.length ; r++) {
        for (var c = 0 ; c < gameState.board.length ; c++) {
            if (gameState.board[r][c] == '')
                return currentWinner;
        }
    }

    return '-' // For draws
}