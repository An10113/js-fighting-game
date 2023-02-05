class sprite {
  constructor({position,imageSrc,scale = 1,FramesMax = 1,offset = {x:0,y:0}}){
      this.position = position
      this.width = 50
      this.height = 200
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.FramesMax = FramesMax
      this.Frame = 0
      this.FrameElapsed = 0
      this.FrameHold = 7
      this.offset = offset
  }
  draw(){
      c.drawImage(
          this.image,
          this.Frame * (this.image.width / this.FramesMax),
          0,
          this.image.width / this.FramesMax, 
          this.image.height, 
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          (this.image.width/this.FramesMax) * this.scale,
          this.image.height * this.scale
          )

  }

  AnimationFrames(){
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
  update(){
      this.draw()
      this.AnimationFrames()
  }
}


class Fighter extends sprite{
  constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      FramesMax = 1,
      offset = {x:0,y:0},
      sprites
  })
      {
          super({
              position,FramesMax,scale,imageSrc,offset
          })
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
      this.Frame = 0
      this.FrameElapsed = 0
      this.FrameHold = 7
      this.sprites = sprites

      for(sprite in sprites){
          sprites[sprite].image = new Image()
          sprites[sprite].image.src = sprites[sprite].imageSrc

      }
  }
  draw(){
      c.drawImage(
          this.image,
          this.Frame * (this.image.width / this.FramesMax),
          0,
          this.image.width / this.FramesMax, 
          this.image.height, 
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          (this.image.width/this.FramesMax) * this.scale,
          this.image.height * this.scale
          )
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
      this.AnimationFrames()
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