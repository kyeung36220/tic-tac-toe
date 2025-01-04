function startScreenElements() {
    const headerText = document.querySelector("#header .text")
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

    return {content, nameForm, playerOneNameLabel, playerOneNameInput, 
        playerTwoNameLabel, playerTwoNameInput, playGameButton}
}

function screenManager() {
    startScreenUI = startScreenElements()

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
        
        startScreenUI.nameForm.remove()

        let gameBoard = document.createElement("div")
        gameBoard.id = "gameBoard"
        gameBoard.innerHTML =
        `
        <div id="scoreDisplay">
            <div id=playerOneDisplay>Player 1: 0
            </div>
            <div id=playerTwoDisplay>Player 2: 0
            </div>
        </div>
        <div id="playBoard">
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
            <div class=cell type=button>
            </div>
        </div>
        <div id=roundDisplay>
            <div class="text">Round: 1</div>
        </div>
        `
        startScreenUI.content.appendChild(gameBoard)
    }

    startScreenUI.playGameButton.addEventListener("click", startGame)
}

function player(playerNumber, name, points) {
    this.playerNumber = playerNumber
    this.name = name
    this.points = points
    this.win = function() {
        points++
    }
}

function gameManager() {

}


screenManager()