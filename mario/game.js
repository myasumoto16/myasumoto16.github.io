kaboom({
    global: true,
    fullscreen: true,
    scale: 1.5,
    debug: true,
    clearColor: [0, 0.4, 3, 1],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 400
let currentJumpForce = JUMP_FORCE
const BIG_JUMP_FORCE = 430
let isJumping = true

const FALL_DEATH = 400

loadRoot("https://i.imgur.com/")
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'pogC9x5.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')




scene("game", ({level, score, marioIsBig}) => {
    layers(['bg', 'bog','ui'], 'obj')

    const maps = [
        [
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '                                  ',
        '   %  =*=%=         =======               ',
        '                                  ',
        '                            []     ',
        '                       ^  ^ ()      ',
        '============================== =====',
        ],

        [
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?                                       ?',
            '?         @@@@@            x x          ?',
            '?                        x x x          ?',
            '?                      x x x x   x  []  ?',
            '?             s   s  x x x x x   x  ()  ?',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],


    ]
    const levelCfg = {
        width: 20,
        height: 20,
        '=' :[sprite('block'), solid()],
        '$' :[sprite('coin'), solid(), 'coin'], //tag at the end
        '*' :[sprite('surprise'), solid(), 'mushroom-surprise'],
        '^' :[sprite('evil-shroom'), solid(), body(), 'danger'],
        '%' :[sprite('surprise'), solid(), 'coin-surprise'],
        '}' :[sprite('unboxed'), solid()],
        '(' :[sprite('pipe-bottom-left'), solid(),  scale(0.5)],
        ')' :[sprite('pipe-bottom-right'), solid(),  scale(0.5)],
        '[' :[sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        ']' :[sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '#' : [sprite('mushroom'), solid(), 'mushroom', body(), 'danger'],
        '?' : [sprite('blue-block'), solid(), scale(0.7)],
        '!' : [sprite('blue-brick'), solid(), scale(0.7)],
        's' : [sprite('blue-evil-shroom'), solid(), scale(0.7), body(), 'danger'],
        '@': [sprite('blue-surprise'), solid(), scale(0.7), 'coin-surprise'],
        'x': [sprite('blue-steel'), solid(), scale(0.7)],


    }
    //


    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text('score: ' + score),
        pos(100, 6),
        layer('ui'),
        {
            value: 0,
        }
    ])

    add([
        text('level: ' + level + 1),
        pos(100, 30)
    ])

    action('mushroom', (m) => {
        m.move(30, 0)
    })
    const DANGER_SPEED = 20
    action('danger', (d) => {
        d.move(-DANGER_SPEED, 0)
    })

    const player = add([
        sprite('mario'), solid(),
        pos(50, 0),
        body(), //full gravity
        big(marioIsBig),
        origin('bot') //get rid of funny things when using body
    ])

    if (marioIsBig == null) {
        marioIsBig = false
        console.log("marioIsBig was changed from undefined to false")
    } else if (marioIsBig) {
        player.biggify()
        console.log('biggerfy mario')
    }

    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        } else if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify()
        marioIsBig = true
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = 'score: ' + scoreLabel.value
    })

    player.collides('danger', (d) => {

        if (isJumping || !player.grounded()) {
            destroy(d)
        } else {
        // go to a different scene
            go('lose', {score: scoreLabel.value})
        }

    })

    player.action(() => {
        camPos(player.pos)

        if (player.pos.y >= FALL_DEATH) {
            go('lose', {score: scoreLabel.value})
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            console.log('next scene')
            console.log('marioIsBig: ' + marioIsBig)
            go('game', {
                level: parseInt(level + 1) % maps.length,
                score: scoreLabel.value,
                marioIsBig: marioIsBig
            })
        })
    })


    keyDown("left", () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown("right", () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()) {
            isJumping = false
        }
    })

    keyPress('space', () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(currentJumpForce)
        }
    })
})

scene('lose', ({score}) => {
    add([
        text('Score: ' + score, 32),
        origin('center'),
        pos(width() / 2, height() / 2)
    ])
})

start("game", {level: 0, score: 0})

function big(marioIsBig) {
    let timer = 0
    let isBig = marioIsBig
    if (isBig) {
        console.log('start big')
    } else {
        console.log('start small')
    }
    return {
        update() {
            if (isBig) {
                timer -= dt()
                if (timer <=  0) {
                    this.smallify()
                }
            }
        },
        isBig() {
            return isBig
        },
        smallify() {
            this.scale = vec2(1)
            timer = 0
            marioIsBig = false
            currentJumpForce = JUMP_FORCE
        },
        biggify(time) {
            this.scale = vec2(1.5)
            timer = time
            marioIsBig = true
            currentJumpForce = BIG_JUMP_FORCE
        }
    }
}