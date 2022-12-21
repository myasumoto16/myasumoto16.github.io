
const grid = document.querySelector('.grid')
// let blackChipIndices = [];
// let whiteChipIndices = [];
const blackChipImage = "images/black-circle-chip.png"
const whiteChipImage = "images/white-chip.png"
const chipImages = [blackChipImage, whiteChipImage]
let currentTurn = 0
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
let visited = []

const initialChipIndices = [[3, 3], [3, 4], [4,3], [4,4]]

let squares = []

for (let i = 0; i < 8; i++) {
    squares.push([8])
}
createSquares()
// let squareDisplays = Array.from(document.querySelectorAll('.block'))
//
//
// let currentIndex = 0;

// while(squareDisplays.length != 0) {
//     squares.push(squareDisplays.splice(0, 8))
// }
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

function play() {
    console.log('new player')
    const img = this.querySelector('img')
    if (img.src != "") {
        alert('You can\'t put your chip there')
        return
    }


    placeChip(img)

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (squares[i][j] == this) {
                console.log('found a match')
                directions.forEach(direction => {
                    console.log('new direction ' + direction[0] + " " + direction[1])
                    flipChips(i + direction[0], j + direction[1], direction[0], direction[1])
                })
            }
        }
    }


    console.log('no match')
    currentTurn = (currentTurn + 1) % 2
}

function placeChip(img) {
    img.src = chipImages[currentTurn]
    img.classList.add('chip')
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