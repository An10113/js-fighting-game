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
      y: 104
    },
    sprites: {
      idle: {
        imageSrc: './Martial Hero/Sprites/Idle.png',
        FramesMax: 8
      },
      run: {
        imageSrc: './Martial Hero/Sprites/Run.png',
        FramesMax: 8
      },
      jump: {
        imageSrc: './Martial Hero/Sprites/Jump.png',
        FramesMax: 2
      },
      fall: {
        imageSrc: './Martial Hero/Sprites/Fall.png',
        FramesMax: 2
      },
      attack1: {
        imageSrc: './Martial Hero/Sprites/Attack1.png',
        FramesMax: 6
      },
      takeHit: {
        imageSrc: './Martial Hero/Sprites/Take Hit - white silhouette.png',
        FramesMax: 4
      },
      death: {
        imageSrc: './Martial Hero/Sprites/Death.png',
        FramesMax: 6
      }
    },
    attackbox: {
      offset: {
        x: 100,
        y: 70
      },
      width: 150,
      height: 120
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
    imageSrc: './Martial Hero 2/Sprites/Idle.png',
    FramesMax: 4,
    scale: 2.4,
    offset: {
      x: 215,
      y: 104
    },
    sprites: {
      idle: {
        imageSrc: './Martial Hero 2/Sprites/Idle.png',
        FramesMax: 4
      },
      run: {
        imageSrc: './Martial Hero 2/Sprites/Run.png',
        FramesMax: 8
      },
      jump: {
        imageSrc: './Martial Hero 2/Sprites/Jump.png',
        FramesMax: 2
      },
      fall: {
        imageSrc: './Martial Hero 2/Sprites/Fall.png',
        FramesMax: 2
      },
      attack1: {
        imageSrc: './Martial Hero 2/Sprites/Attack1.png',
        FramesMax: 4
      },
      takeHit: {
        imageSrc: './Martial Hero 2/Sprites/Take hit.png',
        FramesMax: 3
      },
      death: {
        imageSrc: './Martial Hero 2/Sprites/Death.png',
        FramesMax: 7
      }
    },
    attackbox: {
      offset: {
        x: -190,
        y: 70
      },
      width: 150,
      height: 120
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
    enemy.velocity.x = 0
    if (keys.a.pressed 
        && player.lastkey === 'a'
        ){
        player.velocity.x = -4
        player.switchSprite('run')
      }
      else if( keys.d.pressed 
        && player.lastkey === 'd'
        ){
          player.velocity.x = 4
          player.switchSprite('run')
        }else {
          player.switchSprite('idle')
        }
        
        enemy.velocity.x = 0
        if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
          enemy.velocity.x = -4
          enemy.switchSprite('run')
        }
        else if( keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
          enemy.velocity.x = 4
          enemy.switchSprite('run')
    }else {
      enemy.switchSprite('idle')
    }


    if (player.velocity.y < 0) {
      player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
      player.switchSprite('fall')
    }
    if (enemy.velocity.y < 0) {
      enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite('fall')
    }
  
    // detect collision
    if ( collision({
        box1: player,
        box2:enemy
    })
        && player.isAttacking && player.Frame === 4
        ){
          enemy.takeHit()
          player.isAttacking =false
          gsap.to ('#enemyHealth',{
            width: enemy.health + '%'
          })
        }
        if (player.isAttacking && player.Frame === 4){
          player.isAttacking =false
        }
        if ( collision({
        box1:enemy,
        box2:player
    })
        && enemy.isAttacking
        && player.Frame === 2
        ){
          player.takeHit()
          enemy.isAttacking = false
          gsap.to ('#playerHealth',{
            width: player.health + '%'
          })
        }

        if (enemy.isAttacking && enemy.Frame === 2){
          enemy.isAttacking =false
        }

        // end game
        if (enemy.health <= 0 || player.health <= 0){
            winner({player,enemy,timeID})
        }
       
}

animation()



window.addEventListener('keydown',(event) => {
       
  if (player.dead === false){
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
            if(player.position.y + player.height + player.velocity.y > canvas.height - 200 ){
              player.velocity.y = -12
            }
            break
            case 't':
              player.attack()
              break
              
            }
    }

    if(enemy.dead === false){
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
              if(enemy.position.y + enemy.height + enemy.velocity.y > canvas.height - 200 ){
                enemy.velocity.y = -12
              }
              break
              case 'j':
                enemy.attack()
                break
              }
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