document.addEventListener('DOMContentLoaded', ()=>{
  const squares = document.querySelectorAll('.grid div')
  const resultDisplay = document.querySelector('#result')
  let width = 15
  let currentShooterIndex =  202 //the width of grid is 15 and the shooter starts at 202
  let currentInvaderIndex = 0
  let invadersTakenDown = []
  let result = 0
  let direction = 0
  let invaderId

   //define alien invaders
   const alienInvaders = [
     0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
     15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
     30,31, 32,33,34,35,36,37,38,39
   ]


  //draw the alien invaders
  alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))


  //shooter
  squares[currentShooterIndex].classList.add('shooter')


  // moving shooter along the grid (left-right, not up-down)
  function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode){
      case 37:
        if(currentShooterIndex % width !== 0) currentShooterIndex -=1 //если есть остаток при делении позиции на 15, shooter может двигаться влево. Когда он достигнет безостаточного деления (30), это будет самая левая граница
        break
      case 39:
        if(currentShooterIndex % width < width - 1) currentShooterIndex +=1 //same for moving right
        break
    }
    squares[currentShooterIndex].classList.add('shooter') //remove и add позволяют создавать эффект  перемещения объекта из места в место за счет того, что удаляют его класс из предыдущей локации и добавляют в новую
  }

document.addEventListener('keydown', moveShooter) //когда клавиши нажаты, shooter двигется

//move the invaders
function moveInvaders(){ //works with the time loop
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1

  if((leftEdge && direction=== -1)||(rightEdge && direction === 1)){
    direction = width //so the block moves over a whole row in a grid
  } else if (direction === width){
    if(leftEdge) direction = 1
    else direction = -1
  }

  for (let i = 0; i <= alienInvaders.length -1; i++){
    squares[alienInvaders[i]].classList.remove('invader')
  }
  for (let i = 0; i <= alienInvaders.length -1; i++){
    alienInvaders[i] += direction
  }
  for (let i = 0; i <= alienInvaders.length -1; i++){
    squares[alienInvaders[i]].classList.add('invader')
  }

//decide if game is over or not (based on collision of class names 'Invader' and 'Shooter')
  if(squares[currentShooterIndex].classList.contains('invader', 'shooter'))  {
    resultDisplay.textContent = 'Game Over'
    squares[currentShooterIndex].classList.add('boom')
    clearInterval(invaderId)
  }

  for(let i = 0; i <= alienInvaders.length -1; i++){
    if(alienInvaders[i] > (squares.length - (width-1))){
      resultDisplay.textContent = 'Game Over'
      clearInterval(invaderId)
    }
  }
}
invaderId = setInterval(moveInvaders, 500) //pursue the function within every 0.5 secs

//shooting
function shoot(e){
  let laser
  let currentLaserIndex = currentShooterIndex
  //move the laser from the shooter to the alien Invader
  function moveLaser(){
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserInsex -= width
    squares[currentLaserIndex].classList.add('laser')
    if(squares[currentLaserIndex].contains('invader')){
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeOut(() => squares[currentLaserIndex].classList.remove('boom'), 250)
      clearInterval(laserId)

      const invadersTakenDown = alienInvaders.indexOf(currentLaserIndex)
    }
  }
}




})
