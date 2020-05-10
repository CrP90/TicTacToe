const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const restartButton = document.getElementById("restartButton")
const X_CLASS = "x"
const O_CLASS = "o"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let oTurn
let gameResult
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHoverForNextClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        gameResult = "win"
        endGame()
    } else if (isDraw()) {
        gameResult = "draw"
        endGame()
    } else {
        switchTurn()
        setHoverForNextClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    oTurn = !oTurn
}

function setHoverForNextClass() {
    board.classList.remove(O_CLASS)
    board.classList.remove(X_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame() {
    if (gameResult == "draw") {
        winningMessageTextElement.innerText = "Draw!"
    } else if (gameResult == "win") {
        winningMessageTextElement.innerText = `${oTurn? "O`s" : "X`s"} Wins!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}