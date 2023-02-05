const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.5

  const background = new sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './oak_woods_v1.0/background.png'
  })
  const shop = new sprite({
    position: {
      x: 600,
      y: 160
    },
    imageSrc: './oak_woods_v1.0/shop.png',
    scale: 2.5,
    FramesMax: 6
  })

  const player = new Fighter({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 0
    },
    imageSrc: './Martial Hero/Sprites/Idle.png',
    FramesMax: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 157
    },
    sprites: {
      idle: {
        imageSrc: './Martial Hero/Sprites/Idle.png',
        framesMax: 8
      },
      run: {
        imageSrc: './Martial Hero/Sprites/Run.png',
        framesMax: 8
      },
      jump: {
        imageSrc: './Martial Hero/Sprites/Jump.png',
        framesMax: 2
      },
      fall: {
        imageSrc: './Martial Hero/Sprites/Fall.png',
        framesMax: 2
      },
      attack1: {
        imageSrc: './Martial Hero/Sprites/Attack1.png',
        framesMax: 6
      },
      takeHit: {
        imageSrc: './Martial Hero/Sprites/Take Hit - white silhouette.png',
        framesMax: 4
      },
      death: {
        imageSrc: './Martial Hero/Sprites/Death.png',
        framesMax: 6
      }
    },
    attackBox: {
      offset: {
        x: 100,
        y: 50
      },
      width: 160,
      height: 50
    }
  })
  
  const enemy = new Fighter({
    position: {
      x: 400,
      y: 100
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'blue',
    offset: {
      x: -50,
      y: 0
    },
    imageSrc: './Martial Hero 2/Sprites/Idle.png',
    FramesMax: 4,
    scale: 2.5,
    offset: {
      x: 215,
      y: 167
    },
    sprites: {
      idle: {
        imageSrc: './Martial Hero 2/Sprites/Idle.png',
        framesMax: 4
      },
      run: {
        imageSrc: './Martial Hero 2/Sprites/Run.png',
        framesMax: 8
      },
      jump: {
        imageSrc: './Martial Hero 2/Sprites/Jump.png',
        framesMax: 2
      },
      fall: {
        imageSrc: './Martial Hero 2/Sprites/Fall.png',
        framesMax: 2
      },
      attack1: {
        imageSrc: './Martial Hero 2/Sprites/Attack1.png',
        framesMax: 4
      },
      takeHit: {
        imageSrc: './Martial Hero 2/Sprites/Take hit.png',
        framesMax: 3
      },
      death: {
        imageSrc: './Martial Hero 2/Sprites/Death.png',
        framesMax: 7
      }
    },
    attackBox: {
      offset: {
        x: -170,
        y: 50
      },
      width: 170,
      height: 50
    }
  })

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    }
  }


timer()
    
function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    if (keys.a.pressed 
        && player.lastkey === 'a'
        ){
        player.velocity.x = -4
    }
    else if( keys.d.pressed 
        && player.lastkey === 'd'
        ){
        player.velocity.x = 4
    }

    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -4
    }
    else if( keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 4
    }


    // detect collision
    if ( collision({
        box1: player,
        box2:enemy
    })
        && player.isAttacking
        ){
            player.isAttacking =false
            enemy.health -= 20
            document.querySelector("#enemyHealth").style.width = enemy.health + '%'
        }
    
        if ( collision({
        box1:enemy,
        box2:player
    })
        && enemy.isAttacking
        ){
            enemy.isAttacking = false
            player.health -= 20
            document.querySelector("#playerHealth").style.width = player.health + '%'
        }

        // end game
        if (enemy.health <= 0 || player.health <= 0){
            winner({player,enemy,timeID})
        }
       
}

animation()



window.addEventListener('keydown',(event) => {
        switch (event.key.toLowerCase()) {
            case 'd':
              keys.d.pressed = true
              player.lastkey = 'd'
              break
            case 'a':
              keys.a.pressed = true
              player.lastkey = 'a'
              break
            case 'w':
                if(player.position.y + player.height + player.velocity.y > canvas.height - 120 ){
                    player.velocity.y = -10
                }
              break
            case 't':
                player.attack()
              break

        }
        switch (event.key) {
            case 'ArrowRight':
              keys.ArrowRight.pressed = true
              enemy.lastkey = 'ArrowRight'
              break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastkey = 'ArrowLeft'
              break
            case 'ArrowUp':
                if(enemy.position.y + enemy.height + enemy.velocity.y > canvas.height - 120 ){
                    enemy.velocity.y = -10
                      }
              break
              case 'j':
                enemy.attack()
              break
    }
    console.log(event.key)
})




window.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }
  
    // keys
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
  })