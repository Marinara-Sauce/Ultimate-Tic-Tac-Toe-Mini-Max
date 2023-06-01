# Ultimate Tic Tac Toe MiniMax
 An MiniMax AI Implementation for Ultimate Tic Tac Toe

# Description
This project is an attempt at creating an AI for the game [Ultimate Tic Tac Toe](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe) using the [Mini-Max Algorighm](https://en.wikipedia.org/wiki/Minimax). The game itself is implemented using vanilla HTML/JS.

# Running the Code
To run the code, simply open `index.html` and the game will start. The player plays as X while the bot plays as O. Place the first move and the bot will go afterwards.

# Bot Difficulty
The bot currently runs at a depth of 3. I'm hoping to be able to increase the depth to 5 after optimizing the code.

# Heuristic Approach
The current heuristic algorithm relies on finding favorable patterns on the board, and adding/subtracting from a total score depending on the player with that advantage. This function needs a lot of work, but as of now here's how it stands:
* A positive score reflects a game in the bots favor (O) and a negative score for the player (X)
* If a player won the entire game they're awarded a very large amount of points
* A game is given 150 points for every O on the game board, and -150 points for every X
* For every two X's or O's in a row with an empty spot avaliable across the entire board, the game is given 100 points (negative if it's two X's, positive if it's two O's).
* For every individual board with two in a row and an empty spote avaliable, the game is given 25 points.
* If a player has an opportunity to block the position mentioned above (a two in a row exists, but it's the opposite players turn), the game is given 50 points in the opposite player's favor.

This algorithm still needs a lot of work and is being experimented with.

# Additional Work
* The heuristic currently doesn't look for diagonals.
* The heuristic may be granting too many or not enough points for certain positions
* There may be a bug in the DFS component of MiniMax.
* The code needs to be optimized further to allow for a depth of 5 at reasonable speeds.