const start = document.getElementById("start")
const gameConsole = document.getElementById("text")

let playing = false

const game = () => {
  document
    .querySelectorAll(".square")
    .forEach((tile) => (tile.textContent = ""))
  let player
  playing = true
  console.log("Game has begun.")
  const newPlayer = (name, marker) => {
    return { name, marker }
  }
  const playerOne = newPlayer(prompt("What is your name?"), "X")
  const playerTwo = newPlayer(prompt("What is your name?"), "O")
  if (playerOne && playerTwo) {
    gameConsole.textContent =
      "Two players have joined the arena! " +
      playerOne.name +
      " and " +
      playerTwo.name +
      " are about to fight to the death."
  }
  let moves = 0
  document.querySelectorAll(".square").forEach((tile) => {
    tile.addEventListener("click", function () {
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
          (moves + 1) +
          " moves have been made."

        moves++
        console.log(moves)
        return moves
      } else {
        alert("Try again.")
      }
    })
  })
}

start.addEventListener("click", game)
