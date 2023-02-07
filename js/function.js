function collision({box1,box2}){
  return (box1.attackbox.position.x + box1.attackbox.width >= box2.position.x
      && box1.attackbox.position.x <= box2.position.x + box2.width
      && box1.attackbox.position.y + box1.attackbox.height >= box2.position.y
      && box1.attackbox.position.y <= box2.position.y + box2.height
      )

}

function winner({player,enemy,timeID}){
  clearTimeout(timeID)
  document.querySelector('.tie').style.display = 'flex'
  if(player.health === enemy.health){
      document.querySelector('.tie').innerHTML = 'Tie'
  }
  else if (player.health > enemy.health){
      document.querySelector('.tie').innerHTML = 'P1 wins'
  }
  else if (player.health < enemy.health){
      document.querySelector('.tie').innerHTML = 'P2 wins'
  }
}


let time = 60
let timeID
function timer(){
  timeID = setTimeout(timer, 1000);
  if( time > 0 ){
      time = time - 1
      document.querySelector('.timer').innerHTML = time
  }

  if(time === 0 ){
      winner({player,enemy,timeID})
  }
}

