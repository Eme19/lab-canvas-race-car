 window.addEventListener("load", () => {

   const myButton= document.getElementById('start-button');
    const canvasid= document.getElementById('canvas-game');
    const titlescreen = document.querySelector('.game-intro');


    myButton.addEventListener("click", () => {
       if ( canvasid.classList.contains("hidden")){
           canvasid.classList.remove("hidden");
           titlescreen.classList.add("hidden");
       }
       startGame()
       })
      
       document.onkeydown = (e) => {
        let whereToGo = e.keyCode;
        currentGame.car.moveCar(whereToGo);
    }
    

  const canvas = document.getElementById('canvas-game');
  const ctx= canvas.getContext('2d');




class GameboardImg{
  constructor(x,y,width,height,imagsrc){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.speedy=-9;
    this.imgsrc=imagsrc;
    this.boardImge= new Image();
    this.boardImge.src=imagsrc;
  }

  move (){
    this.x++
    this.y -= this.speedy;
    this.y %= canvas.height;
  }

  draw(){
    ctx.drawImage(this.boardImge, 0, this.y, canvas.width, canvas.height);
    ctx.drawImage(this.boardImge, 0, this.y - canvas.height, canvas.width, canvas.height);
  }
}

const gameBoard = new GameboardImg (0, 0, canvas.width, canvas.height,'../images/road.png');

    


 let currentGame;
 let currentCar;


 function startGame() {
  document.getElementById('game-board').style.display = 'block';
  currentGame = new Game();
  currentCar = new Car();
  currentGame.car = currentCar;
   currentGame.car.drawCar();
  updateCanvas();
}


	
function crash(obstacle) {
  return !((currentCar.y > obstacle.y + obstacle.height) || 
  (currentCar.x + currentCar.width < obstacle.x) || 
  (currentCar.x - currentCar.width  > obstacle.x + obstacle.width))
}
 
 

  let obstaclesFrequency = 0;

  function updateCanvas() {
    gameBoard.move()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameBoard.draw()
  currentGame.car.drawCar();
  obstaclesFrequency++;

   if(obstaclesFrequency %100 === 1){
    let randomObstacleX = Math.floor(Math.random() * 450);
    let randomObstacleY = 0;
    let randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
    let randomObstacleHeight = Math.floor(Math.random() * 50) + 20;
    let newObstacle = new Obstacle(
        randomObstacleX, 
        randomObstacleY, 
        randomObstacleWidth, 
        randomObstacleHeight);

    currentGame.obstacles.push(newObstacle);
    
}
// // gameBoard.move()
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// currentGame.car.drawCar();
// // gameBoard.draw()

for(let i = 0; i<currentGame.obstacles.length; i++) { 
  currentGame.obstacles[i].y += 1; currentGame.obstacles[i].drawObstacle();
   if (crash(currentGame.obstacles[i])) { 
    alert('BOOOOMMM!') 
   obstaclesFrequency = 0; currentGame.score = 0; 
   document.getElementById('score').innerHTML = 0;
    currentGame.obstacles = [];
     document.getElementById('game-board').style.display = 'none';
     }
     if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 600) {
       currentGame.obstacles.splice(i, 1); 
       currentGame.score++; document.getElementById('score').innerHTML = currentGame.score; 
      } 
}
     requestAnimationFrame(updateCanvas);
  }
});
