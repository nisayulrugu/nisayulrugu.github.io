const canvas_width = 800;
const canvas_height = 800;


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var scoreText = document.getElementById("score");

const partSize = 20;

var snake = [];
snake[0] =
{
    x : 300-(partSize/2)*2,
    y:  300-(partSize/2)*2
}

// Substracting 1 since the position is the top-left corner of the sqaure
let apple_pos = 
{
    x : Math.floor(Math.random()* ( (canvas_width/partSize) -1)) * partSize,
    y : Math.floor(Math.random()* ( (canvas_width/partSize) -1)) * partSize
}

var start=true;
isEaten = false;
var score = 0;
var direction ;
var curDirection;
var counter = 0;


function screen_update()
{
    //Firstly make all background black and then change the color of  the pixels
    // that are used by the snake
    context.fillStyle = "black";
    context.fillRect(0,0,canvas_width,canvas_height);

    // console.log(snake.length);
    // Updating positions for every part of the snake
    // When score is 0 this shouldnt work
    // The order of the functions should change???-instead of adding to the tail
    // adding to the head can be another option
    for(let i=snake.length-1; i>0;i--)
    {
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

    switch(direction)
    {
        case "Down":
            if(curDirection !="Up")
            {
                snake[0].y += partSize;
                curDirection = "Down";
            }
            else
            {
                snake[0].y -= partSize; 
            }
            break;

        case "Up":
            if(curDirection !="Down")
            {
                snake[0].y -= partSize;
                curDirection = "Up";
            }
            else
            {
                snake[0].y += partSize;
            }
            break;

        case "Left":
            if(curDirection !="Right")
            {
                snake[0].x -= partSize;
                curDirection = "Left";
            }
            else
            {
                snake[0].x += partSize;
            }
            break;
        
        case "Right":
            if(curDirection !="Left")
            {
                snake[0].x += partSize;
                curDirection = "Right";
            }
            else
            {
                snake[0].x -= partSize;
            }
            break;
    }

    //The pixels used by the snake are coloured with white
    for (let i=0; i<snake.length;i++)
    {
        context.fillStyle = "white";
        context.fillRect(snake[i].x,snake[i].y,partSize,partSize);
    }
    

    //Checking for wall collision
    if(snake[0].x <=0 + partSize/2 || snake[0].x >= canvas_width-partSize/2||
    snake[0].y <=0 +partSize/2 || snake[0].y >= canvas_height-partSize/2 ||
    selfCollCheck(snake))
    {
        clearInterval(game);
    }

    // The apple position should be calculated once until it is eaten
    context.fillStyle = "red";
    context.fillRect(apple_pos.x, apple_pos.y,partSize,partSize)

    // Simple check whether the snake eats the apple
    // Since the apples and the snakes coordinates are multiple of 20s
    // no need to check further

    // Add a square to the tail
    if(snake[0].x ==apple_pos.x && snake[0].y==apple_pos.y)
    {
        score++;
        scoreText.innerText = `Score : ${score}`
        var newone = 
        {
            x:snake[snake.length-1].x,
            y:snake[snake.length-1].y
        };

        snake.push(newone);

        apple_pos = 
        {
            x : Math.floor(1+ Math.random()* ( (canvas_width/partSize) -2)) * partSize,
            y : Math.floor(1+ Math.random()* ( (canvas_height/partSize) -2)) * partSize
        }
    }
}


// Collison check of the body with the other parts of the snake
function selfCollCheck(snake)
{
    var head = snake[0];
    for(let i=1;i<snake.length;i++)
    {
        if(head.x == snake[i].x && head.y == snake[i].y)
        {
            return true;
        }
    }
    return false;
}

// Listening the keyboard events
document.addEventListener("keydown",function(e)
{
    switch(e.code)
    {
        case "ArrowDown":
            direction="Down";
            break;

        case "ArrowUp":
            direction="Up";
            break;

        case "ArrowLeft":
            direction="Left";
            break;
    
        case "ArrowRight":
            direction="Right";
            break;
    }
}
)

// Game Loop 
// Calling the screen update function every 100ms
var game = setInterval(screen_update, 100);
    




