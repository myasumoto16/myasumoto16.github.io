
const grid = document.querySelector('.grid')
// let blackChipIndices = [];
// let whiteChipIndices = [];
const blackChipImage = "images/black-circle-chip.png"
const whiteChipImage = "images/white-chip.png"
const chipImages = [blackChipImage, whiteChipImage]
let currentTurn = 0
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
let numOfEmptyBlocks = 81
const map = new Map()

const initialChipIndices = [[3, 3], [3, 4], [4,3], [4,4]]
let white = 2
let black = 2

let squares = []

for (let i = 0; i < 8; i++) {
    squares.push([8])
}
createSquares()
console.log(squares)
putInitialChips()

function createSquares() {
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div')
        const image = document.createElement('img')
        square.classList.add('block')

        const row = getRow(i)
        const column = getColumn(i)

        console.log(row + " " + column)

        squares[row][column] = square

        map.set(square, [row, column])


        square.appendChild(image)
        square.addEventListener('click', play)
        grid.appendChild(square)
    }
}

function putInitialChips() {

    let imagePath
    for (let i = 0; i < initialChipIndices.length; i++) {

        const x = initialChipIndices[i][0]
        const y = initialChipIndices[i][1]

        const image = squares[x][y].querySelector('img');


        if (i == 0 || i == 3) {
            imagePath = whiteChipImage
        } else {
            imagePath = blackChipImage
        }
        image.src = imagePath
        image.classList.add('chip') // do not add . in the beginning
    }


    console.log('src set')
}

let currentX
let currentY
function play() {
    console.log('new player')
    const img = this.querySelector('img')
    if (img.src != "") {
        alert('You can\'t put your chip there')
        return
    }


    let canPutChipThere = false

    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         if (squares[i][j] == this) {
    //             console.log('found a match')
                currentX = map.get(this)[0]
                currentY = map.get(this)[1]
                console.log("currents: " + currentX + ", " + currentY)
                directions.forEach(direction => {
                    console.log('new direction ' + direction[0] + " " + direction[1])
                    if(flipChips(currentX + direction[0], currentY + direction[1], direction[0], direction[1])) {
                        canPutChipThere = true
                    }
                })
        //     }
        // }
    // }
    if (canPutChipThere) {
        placeChip(img)
        currentTurn = (currentTurn + 1) % 2
    } else {
        alert('you can\'t put your chip there')
    }


    console.log('no match')

    displayBlackWhite()

    if (numOfEmptyBlocks == 0) {
        decideWinner()
        return
    }
}

function placeChip(img) {


        if (chipImages[currentTurn].includes("black-circle-chip.png")) {
            black++
            if (img.src != "") {
                white--;
            }
        } else {
            white++
            if (img.src != "") {
                black--;
            }
        }



    img.src = chipImages[currentTurn]
    img.classList.add('chip')
    numOfEmptyBlocks--
}

function flipChips(x, y, directionX, directionY) {
    if (x < 0 || x >= 8 || y < 0 || y >= 8 ||
        (!squares[x][y].querySelector('img').src.includes(blackChipImage) &&
            !squares[x][y].querySelector('img').src.includes(whiteChipImage))) {
        console.log("base case")
        console.log(x + " " + y)
        return false
    }
    if (squares[x][y].querySelector('img').src.includes(chipImages[currentTurn])) {
        if (isNeighbor(x, y)) {
            return false
        }
        console.log('found the same color at ' + x + " " + y)
        return true
    }
    console.log("dfs: " + x + " " + y)
    console.log("direction: " + directionX + " " + directionY)
    // visited.push(x * 8 + y)

    const validPath = flipChips(x + directionX, y + directionY, directionX, directionY)
    if (validPath) {
        const image = squares[x][y].querySelector('img')
        placeChip(image)
        return true
    }

    return false
}


function getRow(i) {
    return Math.floor(i / 8)
}

function getColumn(i) {
    return i % 8
}

function decideWinner() {
    let winner
    if (white > black) {
        winner = "White"
    } else {
        winner = "Black"
    }

    document.querySelector('.result').innerHTML = winner + " won"


}

function displayBlackWhite() {
    const blackDisplay = document.querySelector('.black')
    const whiteDisplay = document.querySelector('.white')
    blackDisplay.innerHTML = black
    whiteDisplay.innerHTML = white
}


function isNeighbor(x, y) {
    return Math.abs(x - currentX) <= 1 && Math.abs(y - currentY) <= 1
}