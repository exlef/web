import { canvas, ctx } from "./canvas.js";
import { isKeyPressed } from "./input.js";
import { getRandomInt, Vector2 } from "./math.js";
import { checkAABBCollisionAlt } from "./aabb-collision.js";
import { Rectangle } from "./rectangle.js";

class Snake 
{
    squares : Array<Rectangle>;
    width : number;
    direction: Vector2;
    movementInterval: number;
    moveTimer: number;
    isAlive : boolean;

    constructor(width: number, x: number, y: number) 
    {
        this.squares = new Array<Rectangle>;
        this.squares.push(new Rectangle(new Vector2(x,y), width));
        this.width = width;
        this.direction = new Vector2(0, -1);
        this.movementInterval = 0.2;
        this.moveTimer = 0;
        this.isAlive = true;
    }

    update(): void 
    {
        if (isKeyPressed("w") && this.direction.y != 1) 
        {
            this.direction.x = 0;
            this.direction.y = -1;
        }
        if (isKeyPressed("s") && this.direction.y != -1) 
        {
            this.direction.x = 0;
            this.direction.y = 1;
        }
        if (isKeyPressed("a") && this.direction.x != 1) 
        {
            this.direction.x = -1;
            this.direction.y = 0;
        }
        if (isKeyPressed("d") && this.direction.x != -1) 
        {
            this.direction.x = 1;
            this.direction.y = 0;
        }

        this.moveTimer += deltaTime;
        if (this.moveTimer > this.movementInterval && this.isAlive) 
        {
            this.move();
            this.moveTimer = -deltaTime;

            this.checkCollisions();
        }
        for (let i = 0; i < this.squares.length; i++) 
        {
            const element = this.squares[i];
            element.draw("red");
        }
    }

    move(): void 
    {
        for (let i = this.squares.length - 1; i >= 0; i--)
        {
            if(i > 0)
            {
                this.squares[i].x = this.squares[i - 1].x;
                this.squares[i].y = this.squares[i - 1].y;
            }
            else if(i == 0)
            {
                this.squares[i].x += this.direction.x * this.width;
                this.squares[i].y += this.direction.y * this.width;
            }
        }
    }

    checkCollisions() : void
    {
        const head = this.squares[0];
        
        for (let i = 1; i < this.squares.length; i++) 
        {
            const tail = this.squares[i];
            
            if(checkAABBCollisionAlt(head, tail))
            {
                this.isAlive = false;
            }
        }
    }

    addSegment()
    {
        const lastSquare = this.squares[this.squares.length - 1];
        this.squares.push(new Rectangle(
            new Vector2(lastSquare.x, lastSquare.y), 
            this.width
        ));
    }
}

const snakeSquareWidth = 20;
const snake = new Snake(snakeSquareWidth, (canvas.width - snakeSquareWidth) / 2, (canvas.height - snakeSquareWidth) / 2);
const food = new Rectangle(new Vector2((canvas.width - snakeSquareWidth ) / 2, canvas.height / 2 - 100), snakeSquareWidth);

let lastTime = performance.now();
let deltaTime: number;
function gameLoop(): void 
{
    const currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    if (isKeyPressed(" ")) 
    {
        snake.addSegment();
    }

    snake.update();
    food.draw("green");

    if(checkAABBCollisionAlt(snake.squares[0], food))
    {
        snake.addSegment();
        food.x = getRandomInt(0, canvas.width);
        food.y = getRandomInt(0, canvas.height);
    }

    const head = snake.squares[0];
    const check = (head.x > canvas.width || head.x < 0 || head.y > canvas.height || head.y <0);
    if(!check)
    {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
