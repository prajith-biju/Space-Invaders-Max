const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');

let currentShooterIndex = 388;
const width = 21;
let goingRight = true;
let direction = 1;
let invadersId;
let aliensRemoved = [];
let result = 0;

for (let i = 0; i < 441; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = document.querySelectorAll('.grid div')
for(let j = 0; j < squares.length; j++) {
  squares[j].addEventListener('click', () => {
    console.log(j)
  })
}
const alienInvaders =[
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
  86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102
]

function draw() {
  for( let i = 0; i < alienInvaders.length; i++ ) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invaders');
    }
  }
}
draw();

function remove() {
  for ( let i = 0; i < alienInvaders.length; i++ ) {
    squares[alienInvaders[i]].classList.remove('invaders'); 
  }
}

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter');
  switch( e.key ) {
    case 'ArrowLeft':
      if ( currentShooterIndex % width !== 0) currentShooterIndex--;
      break;
    case 'ArrowRight':
      if ( currentShooterIndex % width < width -1 ) currentShooterIndex++;
  }
  squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

function moveInvaders() {
  const rightEdge = alienInvaders[0] % width === 0;
  const leftEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();
  if ( leftEdge && goingRight ) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if ( rightEdge && !goingRight ) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1;
      direction = 1;
      goingRight = true;
    }
  }
  for (let i = 0 ; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  draw()
  if (squares[currentShooterIndex].classList.contains('invaders', 'shooter')) {
    resultDisplay.innerHTML = 'GAME OVER!';
    clearInterval(invadersId);
  }
  for ( let i = 0 ; i < alienInvaders.length; i++ ) {
    if (alienInvaders[alienInvaders.length - 1] >= (squares.length - 1)) {
      resultDisplay.innerHTML = 'GAME OVER!';
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultDisplay.innerHTML = 'YOU WIN!';
    clearInterval(invadersId);
  }
}
invadersId =  setInterval(moveInvaders, 500);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');

    if (squares[currentLaserIndex].classList.contains('invaders')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('invaders');
      squares[currentLaserIndex].classList.add('boom');

      setInterval( () => squares[currentLaserIndex].classList.remove('boom'), 200 );
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      result++;
      resultDisplay.innerHTML = result;
    }
  }
  switch ( e.key ) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}
document.addEventListener('keydown', shoot);