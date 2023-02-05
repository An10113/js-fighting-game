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
      sprites,
      attackbox = {offset:{},width:undefined,height:undefined}
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
          offset:attackbox.offset,
          width:attackbox.width,
          height:attackbox.height,
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
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y
          }
  }

  update(){
      this.draw()
      this.AnimationFrames()
      this.attackbox.position.x = this.position.x + this.attackbox.offset.x
      this.attackbox.position.y = this.position.y + this.attackbox.offset.y

      
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      
      if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
          this.velocity.y = 0
          this.position.y = 280
      }
      else{
          this.velocity.y += gravity
      }
  }

  attack(){
      this.isAttacking = true
      this.switchSprite('attack1')
  }
  switchSprite(sprite) {
    if (
    this.image === this.sprites.attack1.image &&
    this.Frame < this.sprites.attack1.FramesMax - 1
    )
    return
  switch (sprite) {

    case 'idle':
      if (this.image !== this.sprites.idle.image) {
        this.image = this.sprites.idle.image
        this.FramesMax = this.sprites.idle.FramesMax
        this.Frame = 0
      }
      break
    case 'run':
      if (this.image !== this.sprites.run.image) {
        this.image = this.sprites.run.image
        this.FramesMax = this.sprites.run.FramesMax
        this.Frame = 0
      }
      break
    case 'jump':
      if (this.image !== this.sprites.jump.image) {
        this.image = this.sprites.jump.image
        this.FramesMax = this.sprites.jump.FramesMax
        this.Frame = 0
      }
      break

    case 'fall':
      if (this.image !== this.sprites.fall.image) {
        this.image = this.sprites.fall.image
        this.FramesMax = this.sprites.fall.FramesMax
        this.Frame = 0
      }
      break

    case 'attack1':
      if (this.image !== this.sprites.attack1.image) {
        this.image = this.sprites.attack1.image
        this.FramesMax = this.sprites.attack1.FramesMax
        this.Frame = 0
      }
      break
    }
  }
}