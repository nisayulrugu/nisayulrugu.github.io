const canvas_width = 400 ;
const canvas_height = 800 ;
const  boxSize = 40 ;
const rows = canvas_height/boxSize;
const columns = canvas_width/boxSize;
const empty = "white"

var canvas = document.getElementById("canvas") ;
var context = canvas.getContext("2d") ;

let board = [] ;

const z = [
[[1,1,0], [0,1,1] , [0,0,0]],
[[0,0,1], [0,1,1] , [0,1,0]],
[[0,0,0], [1,1,0] , [0,1,1]],
[[0,1,0], [1,1,0] , [1,0,0]]]

for(let i=0 ; i<rows ; i++)
{
    board[i] = [];
    for(let j=0 ; j<columns ; j++)
    {
        board[i][j] = empty ;
        create_square(j,i,board[i][j]);
    }   
}


function create_square(column, row, color)
{
    context.strokeStyle  = "black" ;
    context.strokeRect(column*boxSize,row*boxSize,boxSize,boxSize);
    context.fillStyle = color ;
    context.fillRect (column*boxSize,row*boxSize,boxSize,boxSize);
}

class piece
{
    constructor(piece_style, color)
    {
        this.pieceStyle = piece_style;
        this.color = color;
        this.pieceInd = Math.floor(Math.random()*4);
        this.piece = this.pieceStyle[this.pieceInd];
        this.offsetX = Math.floor(Math.random()*5);
        this.offsetY = 0;
    }

    create()
    {
        for(let r=0 ; r < this.piece.length ; r++)
        {
            for(let c = 0; c<this.piece[0].length ; c++)
            {
                if(this.piece[r][c]==1)
                {
                    create_square(c+this.offsetX,r+this.offsetY,this.color);
                }
            }
        }
    }

    destroy()
    {
        for(let r=0 ; r < this.piece.length ; r++)
        {
            for(let c = 0; c<this.piece[0].length ; c++)
            {
                if(this.piece[r][c]==1)
                {
                    create_square(c+this.offsetX,r+this.offsetY,empty);
                }
            }
        }
    }
    
    move_down()
    {
        if(!this.bound_check(0,1,this.piece))
        {
            this.destroy();
            this.offsetY++;
            this.create();
        }
        
    }

    move_left()
    {
        if(!this.bound_check(-1,0,this.piece))
        {
            this.destroy();
            this.offsetX--;
            this.create();
        }
    }

    move_right()
    {
        if(!this.bound_check(1,0,this.piece))
        {
            this.destroy();
            this.offsetX++;
            this.create();
        }
    }

    rotate()
    {
        var nextInd = (this.pieceInd+1) % this.pieceStyle.length
        var nextPiece = this.pieceStyle[nextInd];

        if(!this.bound_check(0,0,nextPiece))
        {
            this.destroy();
            this.pieceInd = nextInd;
            this.piece = this.pieceStyle[this.pieceInd];
            this.create();
        }
    }

    bound_check(x,y,piece)
    {
        for(let r=0 ; r < piece.length ; r++)
        {
            for(let c = 0; c<piece.length ; c++)
            {
                if(piece[r][c]==1)
                {
                    var newX = c+x+this.offsetX;
                    var newY = r+y+this.offsetY;

                    if(newX>=columns || newX<0 || newY >= rows)
                    {
                        return true;
                    }

                    if(board[newY][newX]!=empty)
                    {
                        return true;
                    }
                    
                }
            }
        }
        return false;
    }
}

var cur_piece = new piece(z,"red");
var direction;


function screen_update()
{
    cur_piece.move_down();
}


document.addEventListener("keydown",function(e)
{
    switch(e.code)
    {
        case "ArrowDown":
            direction="Down";
            cur_piece.move_down();
            break;

        case "ArrowUp":
            direction="Up";
            cur_piece.rotate();
            break;

        case "ArrowLeft":
            direction="Left";
            cur_piece.move_left();
            break;
    
        case "ArrowRight":
            direction="Right";
            cur_piece.move_right();
            break;
    }
})

var game = setInterval(screen_update,500);

