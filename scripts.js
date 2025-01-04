function startScreenElements() {
    const headerText = document.querySelector("#headerText")
    const tic = document.querySelector("#headerTextOne")
    const tac = document.querySelector("#headerTextTwo")
    const toe = document.querySelector("#headerTextThree")
    const content = document.querySelector("#content")
    const nameForm = document.querySelector("#nameForm")
    const playerOneNameLabel = document.querySelector("#playerOneNameLabel")
    const playerOneNameInput = document.querySelector("#playerOneNameInput")
    const playerTwoNameLabel = document.querySelector("#playerTwoNameLabel")
    const playerTwoNameInput = document.querySelector("#playerTwoNameInput")
    const playGameButton = document.querySelector("#playGameButton")

    headerText.addEventListener("click", () => {
        window.location.reload()
    })

    headerText.addEventListener("mouseover", () => {
        tic.style.color = "red"
        tac.style.color = "green"
        toe.style.color = "blue"
    })

    headerText.addEventListener("mouseout", () => {
        tic.style.color = "white"
        tac.style.color = "white"
        toe.style.color = "white"
    })

    return {content, nameForm, playerOneNameLabel, playerOneNameInput, 
        playerTwoNameLabel, playerTwoNameInput, playGameButton, tic, tac ,toe}
}

function gameScreenElements() {
    const gameBoard = document.querySelector("#gameBoard")
    const playerOneScore = document.querySelector("#playerOneDisplay")
    const playerTwoScore = document.querySelector("#playerTwoDisplay")
    const playBoard = document.querySelector("#playBoard")
    const cells = document.querySelectorAll("#playBoard .cell");
    const roundDisplay = document.querySelector("#roundDisplay")
    const roundDisplayText = document.querySelector("#roundDisplay .text")

    for (let i = 0; i < cells.length; i++) {
        cells[i].id = `cell-${i + 1}`; 
      }

    return {gameBoard, playerOneScore, playerTwoScore, playBoard, cells, roundDisplay, roundDisplayText}
}

function screenManager() {
    startScreenUI = startScreenElements()
    startScreenUI.playGameButton.addEventListener("click", startGame)

    function startGame() {
        if (startScreenUI.playerOneNameInput.value.length === 0) {
            startScreenUI.playerOneNameLabel.style.color = "red"
            startScreenUI.playerOneNameInput.style.borderColor = "red"
            return
        }
        else {
            startScreenUI.playerOneNameLabel.style.color = "white"
            startScreenUI.playerOneNameInput.style.borderColor = "rgb(184, 184, 184)"
        }

        if (startScreenUI.playerTwoNameInput.value.length === 0) {
            startScreenUI.playerTwoNameLabel.style.color = "red"
            startScreenUI.playerTwoNameInput.style.borderColor = "red"
            return
        }
        else {
            startScreenUI.playerTwoNameLabel.style.color = "white"
            startScreenUI.playerTwoNameInput.style.borderColor = "rgb(184, 184, 184)"
        }
        
        playerOne = new player(1, startScreenUI.playerOneNameInput.value, 0)
        playerTwo = new player(2, startScreenUI.playerTwoNameInput.value, 0)

        gameManager(playerOne, playerTwo)
    }
}

function player(playerNumber, name, points) {
    this.playerNumber = playerNumber
    this.name = name
    this.points = points
    this.win = function() {
        this.points += 1
    }
}

function gameManager(playerOne, playerTwo) {
    createGameSpace(playerOne, playerTwo)
    var gameScreenUI = gameScreenElements()
    gameScreenUI.roundDisplay.style.marginBottom = "10vh"
    let roundNumber = 0
    gameScreenUI.roundDisplayText.textContent = `Round: 1`
    let currentPlayerTurn = Math.random() <= 0.5 ? 1 : 2
    playerDisplayFocus(currentPlayerTurn)
    gameCompleted = false

    for (let cell of gameScreenUI.cells) {
      cell.addEventListener("click", handleCellClick);
    }

    function handleCellClick(e) {
        if (e.target.textContent === "" && gameCompleted === false) {
            e.target.textContent = currentPlayerTurn === 1 ? "O" : "X"
            roundNumber++
            gameScreenUI.roundDisplayText.textContent = `Round: ${roundNumber}`
            headerTextColorChange(roundNumber)
            if (checkForWinner() === true) {
                endSequence(currentPlayerTurn, true, playerOne, playerTwo)
                gameCompleted = true
                return
            }
            currentPlayerTurn = currentPlayerTurn === 1 ? 2 : 1
            playerDisplayFocus(currentPlayerTurn)
            if (roundNumber === 9) {
                endSequence(currentPlayerTurn, false, playerOne, playerTwo)
                gameCompleted = true
                return
            }
        }
        else if (gameCompleted === true) {
            alert("Game is finished.")
        }
    
        else {
            alert("Cell already filled.")
        }
    }
}

function playerDisplayFocus(currentPlayerTurn) {
    let gameScreenUI = gameScreenElements()
    if (currentPlayerTurn === 1) {
        gameScreenUI.playerOneScore.classList.add("focusPlayer")
        gameScreenUI.playerTwoScore.classList.remove("focusPlayer")
    }
    else {
        gameScreenUI.playerTwoScore.classList.add("focusPlayer")
        gameScreenUI.playerOneScore.classList.remove("focusPlayer")
    }
}

function checkForWinner() {
    let cell1 = document.querySelector("#cell-1")
    let cell2 = document.querySelector("#cell-2")
    let cell3 = document.querySelector("#cell-3")
    let cell4 = document.querySelector("#cell-4")
    let cell5 = document.querySelector("#cell-5")
    let cell6 = document.querySelector("#cell-6")
    let cell7 = document.querySelector("#cell-7")
    let cell8 = document.querySelector("#cell-8")
    let cell9 = document.querySelector("#cell-9")

    let cell1Text = document.querySelector("#cell-1").textContent
    let cell2Text = document.querySelector("#cell-2").textContent
    let cell3Text = document.querySelector("#cell-3").textContent
    let cell4Text = document.querySelector("#cell-4").textContent
    let cell5Text = document.querySelector("#cell-5").textContent
    let cell6Text = document.querySelector("#cell-6").textContent
    let cell7Text = document.querySelector("#cell-7").textContent
    let cell8Text = document.querySelector("#cell-8").textContent
    let cell9Text = document.querySelector("#cell-9").textContent

    if (cell1Text != "" && cell1Text == cell2Text && cell1Text == cell3Text) {
        cell1.style.backgroundColor = "green"
        cell2.style.backgroundColor = "green"
        cell3.style.backgroundColor = "green"
        return true
    }
    if (cell4Text != "" && cell4Text == cell5Text && cell4Text == cell6Text) {
        cell4.style.backgroundColor = "green"
        cell5.style.backgroundColor = "green"
        cell6.style.backgroundColor = "green"
        return true
    }
    if (cell7Text != "" && cell7Text == cell8Text && cell7Text == cell9Text) {
        cell7.style.backgroundColor = "green"
        cell8.style.backgroundColor = "green"
        cell9.style.backgroundColor = "green"
        return true
    }
    if (cell1Text != "" && cell1Text == cell4Text && cell1Text == cell7Text) {
        cell1.style.backgroundColor = "green"
        cell4.style.backgroundColor = "green"
        cell7.style.backgroundColor = "green"
        return true
    }
    if (cell2Text != "" && cell2Text == cell5Text && cell2Text == cell8Text) {
        cell2.style.backgroundColor = "green"
        cell5.style.backgroundColor = "green"
        cell8.style.backgroundColor = "green"
        return true
    }
    if (cell3Text != "" && cell3Text == cell6Text && cell3Text == cell9Text) {
        cell3.style.backgroundColor = "green"
        cell6.style.backgroundColor = "green"
        cell9.style.backgroundColor = "green"
        return true
    }
    if (cell1Text != "" && cell1Text == cell5Text && cell1Text == cell9Text) {
        cell1.style.backgroundColor = "green"
        cell5.style.backgroundColor = "green"
        cell9.style.backgroundColor = "green"
        return true
    }
    if (cell3Text != "" && cell3Text == cell5Text && cell3Text == cell7Text) {
        cell3.style.backgroundColor = "green"
        cell5.style.backgroundColor = "green"
        cell7.style.backgroundColor = "green"
        return true
    }
}

function endSequence(currentPlayerTurn, isWin, playerOne, playerTwo) {
    let startScreenUI = startScreenElements()
    let gameScreenUI = gameScreenElements()
    if (isWin === false) {
        gameScreenUI.roundDisplayText.textContent = `Tie!`
    }
    else if (currentPlayerTurn === 1 && isWin === true) {
        playerOne.win()
        gameScreenUI.playerOneScore.style.backgroundColor = `green`
        gameScreenUI.playerOneScore.textContent = `${playerOne.name}: ${playerOne.points}`
        gameScreenUI.roundDisplayText.textContent = `${playerOne.name} Wins!`
    }
    else if (currentPlayerTurn === 2 && isWin === true) {
        playerTwo.win()
        gameScreenUI.playerTwoScore.style.backgroundColor = `green`
        gameScreenUI.playerTwoScore.textContent = `${playerTwo.name}: ${playerTwo.points}`
        gameScreenUI.roundDisplayText.textContent = `${playerTwo.name} Wins!`
    }

    let completedButtons = document.createElement("div")
    completedButtons.id = "completedButtons"
    completedButtons.innerHTML =
    `
    <div id="newGameButton" class="button" type=button>
        New Game
    </div>
    <div id="returnButton" class="button" type=button>
        Return
    </div>
    `
    gameScreenUI.gameBoard.appendChild(completedButtons)
    gameScreenUI.roundDisplay.style.marginBottom = "1vh"

    let newGameButton = document.querySelector("#newGameButton")
    let returnButton = document.querySelector("#returnButton")

    newGameButton.addEventListener("click", () => {
        gameScreenUI.gameBoard.remove()
        startScreenUI.tic.style.color = "white"
        startScreenUI.tac.style.color = "white"
        startScreenUI.toe.style.color = "white"

        gameManager(playerOne, playerTwo)
        returnButton.remove()
        newGameButton.remove()
    })
    returnButton.addEventListener("click", () => {
        window.location.reload()
    })
}

function createGameSpace() {
    let gameBoard = document.createElement("div")
        gameBoard.id = "gameBoard"
        gameBoard.innerHTML =
        `
        <div id="scoreDisplay">
            <div id=playerOneDisplay class="display scoreDisplay">${playerOne.name}: ${playerOne.points}
            </div>
            <div id=playerTwoDisplay class="display scoreDisplay">${playerTwo.name}: ${playerTwo.points}
            </div>
        </div>
        <div id="playBoard">
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
            <div class=cell type=button></div>
        </div>
        <div id=roundDisplay class="display">
            <div class="text">Round: 1</div>
        </div>
        `
        if (startScreenUI.nameForm) {
            startScreenUI.nameForm.remove()
        }
        startScreenUI.content.appendChild(gameBoard)
}
screenManager()

function headerTextColorChange(roundNumber) {
    startScreenUI = startScreenElements()
    let tic = startScreenUI.tic
    let tac = startScreenUI.tac
    let toe = startScreenUI.toe
    let redRounds = [1,4,7]
    let greenRounds = [2,5,8]
    let blueRounds = [3,6,9]

    tic.style.color = "white"
    tac.style.color = "white"
    toe.style.color = "white"
    
    if (redRounds.includes(roundNumber)) {
        tic.style.color = "red"
        return
    }
    if (greenRounds.includes(roundNumber)) {
        tac.style.color = "green"
        return
    }
    if (blueRounds.includes(roundNumber)) {
        toe.style.color = "blue"
        return
    }
}