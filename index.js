const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.3

class sprite {
    constructor({position,velocity,color,offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 200
        this.lastkey
        this.attackbox = {
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width:100,
            height:50,
        }
        this.color = color
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(
                this.attackbox.position.x,
                this.attackbox.position.y,
                this.attackbox.width,
                this.attackbox.height,
                this.isAttacking
                )
            }
    }

    update(){
        this.draw()
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        },100)
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
},
offset: {
    x:0,
    y:0
},
color:'red'
})


const enemy = new sprite({
    position: {
    x:900,
    y:100
},

velocity: {
    x:0,
    y:5
},
offset: {
    x:-50,
    y:0
},
color:'blue'
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

function collision({box1,box2}){
    return (box1.attackbox.position.x + box1.attackbox.width >= box2.position.x
        && box1.attackbox.position.x <= box2.position.x + box2.width
        && box1.attackbox.position.y + box1.attackbox.height >= box2.position.y
        && box1.attackbox.position.y <= box2.position.y + box2.height
        )

}

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
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
            console.log('potato')
        }
    
        if ( collision({
        box1:enemy,
        box2:player
    })
        && enemy.isAttacking
        ){
            enemy.isAttacking = false
            console.log('nigga')
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
  
