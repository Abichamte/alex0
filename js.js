const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");

function StartGame(){
   const gridSize = 30;
   const snake = [ { x: 120, y: 120 } ]
   let direction = "down"
   let food = foodPosition();


   pic = new Image();
   pic.src  = 'https://foni.papik.pro/uploads/posts/2024-09/foni-papik-pro-o0ub-p-kartinki-yabloko-krasnoe-na-prozrachnom-fo-20.png'
   function foodPosition(){
      //кол-во клеток
      max_x = (canvas.width / gridSize) - 1
      max_y = (canvas.height / gridSize) -1

      //выбор случайной клетки
      grid_x = Math.floor(Math.random() * max_x) - 0;
      grid_y = Math.floor(Math.random() * max_y) - 0;

      //перевод в координатные данные
      const x = grid_x*gridSize;
      const y = grid_y*gridSize;

      //возврат в food
      return { x, y }
   }

   function draw(){
      context.clearRect(0 ,0 ,canvas.width, canvas.height) // Rect

      context.fillStyle = "green";

      snake.forEach( function(segment){
         context.fillRect(segment.x, segment.y, gridSize, gridSize);
      });

      //отрисовка фрукта
      // context.fillStyle = "red";
      // context.fillRect(food.x, food.y, gridSize, gridSize);


      context.drawImage(pic,food.x, food.y, gridSize, gridSize );

   }

   function move(){
      const head = {...snake[0]}
      switch(direction){
         case "up":
            head.y -= gridSize;
            break;
         case "down":
            head.y += gridSize;
            break;
         case "left":
            head.x -= gridSize;
            break;
         case "right":
            head.x += gridSize;
            break;
      }

      //касание змейки с фруктом
      if (head.x === food.x && head.y === food.y) {
         snake.unshift(food);
         food = foodPosition();
      }
      else{
         snake.pop();
      }

      if(head.x < 0){
         head.x = canvas.width;
      }
      if (head.x > canvas.width){
         head.x = 0;
      }
      if(head.y < 0){
         head.y = canvas.height;
      }
      if(head.y > canvas.height){
         head.y = 0;
      }

      //код поедания самого себя и завершение игры 
      if (collisionItself(head)){
         alert("GAME OVER");
         location.reload();
      }


      snake.unshift(head)
      
   }

    function collisionItself(head){
      return snake.slice(1).some( segment=> segment.x === head.x && segment.y === head.y);
    }



function onKeyPress(event){
   const key = event.key.toLowerCase();

     if(["w", "a", "s", "d"]. includes(key)){
      if( key === "w" && direction !=="down"){ direction = "up"; }
      if( key === "s" && direction !=="up"){ direction = "down"; }
      if( key === "a" && direction !=="right"){ direction = "left"; }
      if( key === "d" && direction !=="left"){ direction = "right"; }
     } 
}

window.addEventListener('keydown', onKeyPress);

 function LoopGame(){
    move();
    draw();
 }

setInterval(LoopGame, 150);

}