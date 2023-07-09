const start = document.getElementById("start")
const gameConsole = document.getElementById("text")
const squares = document.querySelectorAll(".square")
const board = document.getElementById("board")
const firstPlayerName = document.getElementById("player-one")
const secondPlayerName = document.getElementById("player-two")
const nametags = document.getElementById("nametag-container")
const screen = document.getElementById("game")
let winner = false
let playerOne, playerTwo
let moves = 0

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

let playing = false

// Factory function to create players

const newPlayer = (name, marker, moves, winner) => {
  return { name, marker, moves, winner }
}

// Call function to define players based on name inputs

const getPlayers = () => {
  if (
    firstPlayerName.value != "" &&
    firstPlayerName.value != null &&
    secondPlayerName.value != "" &&
    secondPlayerName.value != null
  ) {
    playerOne = newPlayer(firstPlayerName.value, "x", [], false)
    playerTwo = newPlayer(secondPlayerName.value, "o", [], false)
  } else {
    gameConsole.textContent =
      "Both players must put in their name before proceeding."
    gameConsole.style.color = "red"
  }
  board.style.display = "grid"
  nametags.style.display = "none"
}

// Create logic function to verify whether winning pattern has been met

const isWinner = (player) => {
  for (let i = 0; i < winPatterns.length; i++) {
    const pattern = winPatterns[i]
    const hasWinningPattern = pattern.every((position) =>
      player.moves.includes(position)
    )
    if (hasWinningPattern) {
      player.winner = true
      return (winner = true)
    }
  }
  if (moves == 9 && player.winner == false) {
    gameConsole.textContent =
      "Uh oh! It's a tie! No one was able to secure the victory. Try again."
    gameConsole.style.color = "blue"
    return false
  }
}

// Add event listener to each button to add values based on current player
const getMove = () => {
  squares.forEach((tile, index) => {
    tile.addEventListener("click", function () {
      gameConsole.style.color = "#000000"
      if (playing) {
        while (moves < 9 && !playerOne.winner && !playerTwo.winner) {
          if (moves % 2 == 0 || moves == 0) {
            player = playerOne
          } else {
            player = playerTwo
          }
          if (tile.textContent == "") {
            tile.textContent = player.marker
            gameConsole.textContent =
              "A move has been made by " +
              player.name +
              ". A total of " +
              moves +
              " moves have been made."

            moves++
            player.moves.push(index)
            player.moves.sort()
            if (isWinner(player)) {
              gameConsole.textContent =
                "Congratulations, " + player.name + ", you won!"
            }
            console.log(player.name + ": " + player.moves)
          } else {
            gameConsole.textContent =
              "Invalid move! Someone has already put their marker here, please choose another tile."
            gameConsole.style.color = "#FA0000"
          }
          isWinner(player)
          return moves
        }
      }
    })
  })
}

// Initialize the game
const game = () => {
  gameConsole.style.color = "#000"
  playing = true
  getPlayers()
  if (playerOne.name != "" && playerTwo.name != "") {
    gameConsole.textContent =
      "Two players have joined the arena! " +
      playerOne.name +
      " and " +
      playerTwo.name +
      " are about to fight to the death."
  }
  start.textContent = "Restart"
  screen.style.flexDirection = "column-reverse"
  getMove()
}

// Clear the board and restart the game

const resetGame = () => {
  window.location.reload()
}

start.addEventListener("click", function () {
  if (playing) {
    playing = false
    resetGame()
    game()
  } else {
    game()
  }
})
