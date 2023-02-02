class sprite {
    constructor({position,imageSrc,scale = 1,FramesMax = 1}){
        this.position = position
        this.width = 50
        this.height = 200
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.FramesMax = FramesMax
        this.Frame = 0
        this.FrameElapsed = 0
        this.FrameHold = 10
    }
    draw(){
        c.drawImage(
            this.image,
            this.Frame * (this.image.width / this.FramesMax),
            0,
            this.image.width / this.FramesMax, 
            this.image.height, 
            this.position.x,
            this.position.y,
            (this.image.width/this.FramesMax) * this.scale,
            this.image.height * this.scale
            )

    }

    update(){
        this.draw()
        this.FrameElapsed++
        if(this.FrameElapsed % this.FrameHold === 0){
            if (this.Frame < this.FramesMax - 1){
                this.Frame++
            }
            else{
                this.Frame = 0
            }
        }
    }
}

class Fighter {
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
        this.health = 100
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
        
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
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

