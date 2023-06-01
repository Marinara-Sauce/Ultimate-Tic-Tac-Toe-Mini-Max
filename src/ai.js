var DEPTH = 3

// Determines which move to make, outputs a row and col, takes in a game state
function determineMove(parent) {

    tree = generateTree(parent);
    candidates = prune(tree);
    candidates = candidates.children;
    
    console.log("Move Candidates");
    console.log(candidates);

    var highestScore = -9999999;
    var highestNodes = [];

    for (var i = 0 ; i < candidates.length ; i++) {
        if (candidates[i].score > highestScore) {
            highestScore = candidates[i].score;
            highestNodes = [candidates[i]];
        }
        else if (candidates[i].score == highestScore) {
            highestNodes.push(candidates[i]);
        }
    }

    play = highestNodes[Math.floor(Math.random() * highestNodes.length)];
    console.log(play);
    if (play) {
        playMove({
            target: {
                dataset: {
                    row: play.node.row,
                    col: play.node.col
                }
            }
        });
    }
    else {
        alert("Stalemate!");
    }
}

function prune(tree, depth = 0) {    
    // Odd number depth indicates AI turn (max), opposite for even
    if (tree.children.length == 0) {
        return {
            ...tree,
            score: assessBoard(tree.node)
        }; // Base case, tree has no children, return the tree back
    }

    // This can probably be merged into a hashmap
    childNodes = [];
    scores = [];

    tree.children.forEach(child => {
        resTree = prune(child, depth + 1);
        childNodes.push(resTree);
        scores.push(resTree.score);
    });

    // console.log(childNodes);
    // console.log(scores);

    if (depth % 2 == 0) {
        // Find node with lowest score
        var lowestScore = 99999999;
        for (var i = 0 ; i < scores.length ; i++) {
            if (scores[i] < lowestScore) {
                lowestScore = scores[i];
            }
        }
        // console.log(depth, tree, lowestScore)
        tree.score = lowestScore;
        return tree;
    }
    else {
        // Find node with highest score
        var highestScore = -99999999;
        for (var i = 0 ; i < scores.length ; i++) {
            if (scores[i] > highestScore) {
                highestScore = scores[i];
            }
        }
        // console.log(depth, highestScore, tree)
        tree.score = highestScore;
        return tree;
    }
}

function generateTree(parent, depth = 1) {
    nextMoves = fetchPossibleMoves(parent.node);

    for (var i = 0 ; i < nextMoves.length ; i++) {
        parent.children.push({
            node: nextMoves[i],
            children: [],
            score: parent.node.score
        });
    }

    if (depth != DEPTH) {
        for (var i = 0 ; i < parent.children.length ; i++) {
            generateTree(parent.children[i], depth + 1);
        }
    }

    return {
        ...parent
    };
}

// Fetches all possible moves a player can make
function fetchPossibleMoves(gameState) {

    nextMoves = [];

    for (var r = 0 ; r < gameState.game.length ; r++) {
        for (var c = 0 ; c < gameState.game.length ; c++) {
            currentVal = gameState.game[r][c];

            if (currentVal == '') {
                // Make the move, push it to the possible moves if the game allows it
                result = makeMove(r, c, JSON.stringify(gameState))

                if (result) {
                    // result.score = assessBoard(result);
                    nextMoves.push({
                        ...result,
                        row: r,
                        col: c,
                    });
                }
            }
        }
    }
    // console.log(nextMoves);
    return nextMoves;
}

// "Rates" a certain board. Neg numbers indicate a match leaning towards X's favor, and vice versa for pos
function assessBoard(gameState) {
    score = 0;
    
    // First check for a winner
    winner = checkForGameWin(gameState);
    if (winner != '') {
        winner == 'X' ? score -= 99999999 : score += 999999999;
        return score;
    }

    // Count the number of X's and O's the whole board has, a player with more of these has a big advantage
    for (var r = 0 ; r < gameState.board.length ; r++) {
        for (var c = 0 ; c < gameState.board[r].length ; c++) {
            if (gameState.board[r][c] != '')
                gameState.board[r][c] == 'X' ? score -= 150 : score += 150;
        }
    }

    // Check for 2 in a rows with an empty spot avaliable
    gameState.board.forEach((row) => {   
        var twoInRow = containsTwoInRow(row);
        if (twoInRow == 'X') {
            score -= 100;
        }

        else if (twoInRow == 'O') {
            score += 100;
        }
    });

    // Check for 2 in a col with an empty slot avaliable
    for (var c = 0 ; c < gameState.board.length ; c++) {
        col = [];
        for (var r = 0 ; r < gameState.board[c].length ; r++) {
            col.push(gameState.board[c][r]);
        }
        var twoInRow = containsTwoInRow(col);
        if (twoInRow == 'X') {
            score -= 100;
        }

        else if (twoInRow == 'O') {
            score += 100;
        }
    }

    // Check for 2 in a rows with an empty spot avaliable
    gameState.game.forEach((row) => {
        for (var board = 0 ; board < 9 ; board += 3) {
            r = [];
            for (var i = board ; i < 3 + board ; i++) {
                r.push(row[i]);
            }
            
            if (containsTwoInRow(r) == 'X') {
                score -= 25;
                
                if (!gameState.xTurn) { // If we can block with O then make this more favorable
                    score += 50;
                }
            }

            else if (containsTwoInRow(r) == 'O') {
                score += 25;
                
                if (gameState.xTurn) {
                    score -= 50;
                }
            }
        }
    });

    // Check for 2 in a column with an empty spot avaliable
    for (var i = 0 ; i < 9 ; i++) {
        for (var b = 0 ; b < 9 ; b += 3) {
            col = [];
            for (var r = b ; r < 3 + b ; r++) {
                col.push(gameState.game[r][i]);
            }

            if (containsTwoInRow(col) == 'X') {
                score -= 25;
                
                if (!gameState.xTurn) { // If we can block with O then make this more favorable
                    score += 50;
                }
            }

            if (containsTwoInRow(col) == 'O') {
                score += 25;

                if (gameState.xTurn) {
                    score -= 50;
                }
            }
        }
    }
    
    return score;
}

function containsTwoInRow(r) {
    if (
        (r[0] == 'X' && r[1] == 'X' && r[2] == '') ||
        (r[0] == '' && r[1] == 'X' && r[2] == 'X') ||
        (r[0] == 'X' && r[1] == '' && r[2] == 'X')
    ) {
        return 'X';
    }
    
    if (
        (r[0] == 'O' && r[1] == 'O' && r[2] == '') ||
        (r[0] == '' && r[1] == 'O' && r[2] == 'O') ||
        (r[0] == 'O' && r[1] == '' && r[2] == 'O')
    ) {
        return 'O';
    }

    return '';
}