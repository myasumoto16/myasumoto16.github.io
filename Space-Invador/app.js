const grid = document.querySelector('.grid')
const result = document.querySelector('.result')
let currentShooterIndex = 202
const width = 15
let goingRight = true
let laserId
let aliensRemoved = []



for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = document.querySelectorAll('.grid div')
const aliens = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    //hellos
    for (let i = 0; i < aliens.length; i++) {
        if (!aliensRemoved.includes(i) && aliens[i] < 225) {
            console.log('i: ' + i)
            squares[aliens[i]].classList.add('alien')
        }
    }
}
squares[currentShooterIndex].classList.add('shooter')

draw()

function remove() {
    for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.remove('alien')
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex--
            }
            break
        case "ArrowRight":
            if (currentShooterIndex % width !== 14) {
                currentShooterIndex++
            }
            break

    }
    squares[currentShooterIndex].classList.add('shooter')

}

document.addEventListener('keydown', moveShooter)

let direction = 1
let intervalId
function moveInvaders() {
    const leftEdge = aliens[0] % width === 0
    const rightEdge = aliens[aliens.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width + 1
            direction = -1
        }
        goingRight = false

    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width - 1
            goingRight = true
            direction = 1
        }
    }


    for (let i = 0; i < aliens.length; i++) {
        aliens[i] += direction
    }
    draw()

    if (squares[currentShooterIndex].classList.contains('alien', 'shooter')) {
        result.textContent = 'you lost'
        clearInterval(intervalId)
        clearInterval(laserId)
        document.removeEventListener('keydown', shoot)
    }

    for (let i = 0; i < aliens.length; i++) {
        if (aliens[i] >= squares.length) {
            console.log('squares.length: ' + squares.length)
            alert('game over')
            clearInterval(intervalId)
            clearInterval(laserId)
            document.removeEventListener('keydown', shoot)
        }
    }

    if (aliensRemoved.length == 30) {
        result.textContent = 'you won!'
        clearInterval(intervalId)
        clearInterval(laserId)
        document.removeEventListener('keydown', shoot)
    }
}

intervalId = setInterval(moveInvaders, 300)

function checkCollision(currentLaserIndex) {
    if (squares[currentLaserIndex].classList.contains('alien') ) {
        squares[currentLaserIndex].classList.remove('alien')
        squares[currentLaserIndex].classList.remove('laser')
        console.log('collision')
        clearInterval(laserId)
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)

        const alienRemoved = aliens.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
    }
}

function shoot(e) {
    let currentLaserIndex = currentShooterIndex

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        if (Math.floor(currentLaserIndex / width) > 0) {
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            checkCollision(currentLaserIndex)
        }
    }

    switch(e.code) {
        case 'ArrowUp' || 'Space':
            laserId = setInterval(moveLaser, 100)
    }

}

document.addEventListener('keydown', shoot)

