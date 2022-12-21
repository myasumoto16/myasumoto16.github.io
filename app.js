
const grid = document.querySelector('.grid')
let blackChipIndices = [];
let whiteChipIndices = [];
const blackChipImage = "images/black-circle-chip.png"
const whiteChipImage = "images/white-chip.png"
const chipImages = [blackChipImage, whiteChipImage]
let currentTurn = 0

const initialChipIndices = [27, 28, 35, 36]

createSquares()
const squares = document.querySelectorAll('.block');

putInitialChips()

function createSquares() {
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div')
        const image = document.createElement('img')
        square.classList.add('block')

        square.appendChild(image)
        square.addEventListener('click', play)
        grid.appendChild(square)
    }
}

function putInitialChips() {

    let imagePath
    for (let i = 0; i < initialChipIndices.length; i++) {

        const index = initialChipIndices[i]

        const image = squares[index].querySelector('img');


        if (index == 27 || index == 36) {
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
    const img = this.querySelector('img')
    if (img.src != "") {
        alert('You can\'t put your chip there')
        return
    }
    console.log('play')
    img.src = chipImages[currentTurn]
    img.classList.add('chip')
    this.appendChild(img)

    currentTurn = (currentTurn + 1) % 2
}