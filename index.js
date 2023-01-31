const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.3

class sprite {
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 200
        this.lastkey
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,50,this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }
    }
}

const player = new sprite({
    position: {
    x:100,
    y:0
},
velocity: {
    x:0,
    y:5
}
})


const enemy = new sprite({
    position: {
    x:900,
    y:100
},
velocity: {
    x:0,
    y:5
}
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    if (keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -4
    }
    else if( keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 4
    }
    else if( keys.w.pressed && player.lastkey === 'w'){
        if(player.position.y + player.height + player.velocity.y > canvas.height - 120 ){
            player.velocity.y = -10
        }
    }

    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -4
    }
    else if( keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 4
    }
    else if( keys.ArrowUp.pressed && enemy.lastkey === 'ArrowUp'){
        if(enemy.position.y + enemy.height + enemy.velocity.y > canvas.height - 120 ){
            enemy.velocity.y = -10
              }
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
              keys.w.pressed = true
              player.lastkey = 'w'
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
                keys.ArrowUp.pressed = true
                enemy.lastkey = 'ArrowUp'
              break
    }
    console.log(event.key)
})



window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
      case 'w':
        keys.w.pressed = false
        break
    }
  
    // enemy keys
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
      case 'ArrowUp':
        keys.ArrowUp.pressed = false
        break
    }
  })