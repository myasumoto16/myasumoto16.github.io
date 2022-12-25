
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const button = document.querySelector("#button")
//.grid div is all the dive in grid
const squares = document.querySelectorAll('.grid div')
const logLefts = document.querySelectorAll(".log-left")
const logRights = document.querySelectorAll('.log-right')

const carLefts = document.querySelectorAll('.car-left')
const carRights = document.querySelectorAll('.car-right')
const frog = document.querySelector('.frog')

let currentIndex = 76
const width = 9
const height = 9

let timeLeft = 19

let intervalId = setInterval(autoMoveElements, 1000)
let timerId = setInterval(displayTimer, 1000)





document.addEventListener('keydown', moveFrog)

button.addEventListener('click', start)

function displayTimer() {
    timeLeftDisplay.innerHTML = timeLeft
    timeLeft--
}
function moveFrog(e) {

     squares[currentIndex].classList.remove('frog')

     switch(e.key) {
          case 'ArrowLeft':
               console.log('left')
              if (currentIndex % width > 0) {
                   currentIndex--
              }
               break
          case 'ArrowRight':
               console.log('right')
              if (currentIndex % width < width - 1) {
                   currentIndex++
              }
               break
          case 'ArrowDown':
               console.log('down')
              if (Math.floor(currentIndex / height) < height - 1) {
                   currentIndex += width
              }
               break
          case 'ArrowUp':
               console.log('up')
              if (Math.floor(currentIndex / height) > 0) {
                   currentIndex -= width
              }
               break
     }
     squares[currentIndex].classList.add('frog')
    win()
}


function autoMoveElements() {
    logLefts.forEach(leftLog => moveLogLeft(leftLog))
    logRights.forEach(rightLog => moveLogRight(rightLog))
    carLefts.forEach(carLeft => moveCarLeft(carLeft))
    carRights.forEach(carRight => moveCarRight(carRight))
    lose()
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    const classList = carRight.classList
    switch(true) {
        case classList.contains('c1'):
            classList.remove('c1')
            classList.add('c3')
            break
        case classList.contains('c2'):
            classList.remove('c2')
            classList.add('c1')
            break
        case classList.contains('c3'):
            classList.remove('c3')
            classList.add('c2')
            break
    }
}
function moveLogRight(rightLog) {
    switch(true) {
        case rightLog.classList.contains('l1'):
            rightLog.classList.remove('l1')
            rightLog.classList.add('l5')
            break
        case rightLog.classList.contains('l2'):
            rightLog.classList.remove('l2')
            rightLog.classList.add('l1')
            break
        case rightLog.classList.contains('l3'):
            rightLog.classList.remove('l3')
            rightLog.classList.add('l2')
            break
        case rightLog.classList.contains('l4'):
            rightLog.classList.remove('l4')
            rightLog.classList.add('l3')
            break
        case rightLog.classList.contains('l5'):
            rightLog.classList.remove('l5')
            rightLog.classList.add('l4')
            break
    }
}

function moveLogLeft(leftLog) {
    switch(true) {
        case leftLog.classList.contains('l1'):
            leftLog.classList.remove('l1')
            leftLog.classList.add('l2')
            break
        case leftLog.classList.contains('l2'):
            leftLog.classList.remove('l2')
            leftLog.classList.add('l3')
            break
        case leftLog.classList.contains('l3'):
            leftLog.classList.remove('l3')
            leftLog.classList.add('l4')
            break
        case leftLog.classList.contains('l4'):
            leftLog.classList.remove('l4')
            leftLog.classList.add('l5')
            break
        case leftLog.classList.contains('l5'):
            leftLog.classList.remove('l5')
            leftLog.classList.add('l1')
            break
    }
}

function lose() {
    const currentFrogSquare = squares[currentIndex]
    if (currentFrogSquare.classList.contains('c1') ||
        currentFrogSquare.classList.contains('c2') ||
        currentFrogSquare.classList.contains('l1') ||
        currentFrogSquare.classList.contains('l2') ||
        currentFrogSquare.classList.contains('l3') ||
        timeLeft == 0) {
        resultDisplay.textContent = "You lost!"
        clearInterval(intervalId)
        currentFrogSquare.classList.remove('frog')
        document.removeEventListener('keydown', moveFrog)
        clearInterval(timerId)

    }
}

function win() {
    const currentFrogSquare = squares[currentIndex]
    if (currentFrogSquare.classList.contains('ending-block')) {
        resultDisplay.textContent = "You win!"
        clearInterval(intervalId)
        currentFrogSquare.classList.remove('frog')
        document.removeEventListener('keydown', moveFrog)
        clearInterval(timerId)
    }
}

function start() {
    clearInterval(timerId)
    clearInterval(intervalId)
    intervalId = setInterval(autoMoveElements, 1000)
    resultDisplay.textContent = ""
    document.addEventListener('keydown', moveFrog)
    currentIndex = 76
    timeLeft = 20
    timerId = setInterval(displayTimer, 1000)
}