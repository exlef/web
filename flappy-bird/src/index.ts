import { isKeyPressed } from "./input.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) 
{
    throw new Error("Failed to get canvas context");
}

function resizeCanvas(): void 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


function checkSquareCollision(squareA: Square, squareB: Square): boolean 
{
    // Check for overlap on both axes
    return (
        squareA.pos.x < squareB.pos.x + squareB.width &&
    squareA.pos.x + squareA.width > squareB.pos.x &&
    squareA.pos.y < squareB.pos.y + squareB.width &&
    squareA.pos.y + squareA.width > squareB.pos.y
    );
}

// Random integer between min (inclusive) and max (inclusive)
function getRandomInt(min: number, max: number): number 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Vector2 
{
    x: number;
    y: number;

    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2 
    {
        return new Vector2(this.x, this.y);
    }
}

class Square
{
    pos : Vector2;
    width : number;

    constructor(pos : Vector2, width : number)
    {
        this.pos = pos;
        this.width = width;
    }

    draw(color : string): void 
    {
        ctx!.fillStyle = color; // Set color
        ctx!.fillRect(this.pos.x, this.pos.y, this.width, this.width);
    }
}

class Snake 
{
    squares : Array<Square>;
    width : number;
    direction: Vector2;
    movementInterval: number;
    moveTimer: number;
    isAlive : boolean;

    constructor(width: number, x: number, y: number) 
    {
        this.squares = new Array<Square>;
        this.squares.push(new Square(new Vector2(x,y), width));
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
                this.squares[i].pos = this.squares[i - 1].pos.clone();
                // this.squares[i].pos.x = this.squares[i - 1].pos.x;
                // this.squares[i].pos.y = this.squares[i - 1].pos.y;
            }
            else if(i == 0)
            {
                this.squares[i].pos.x += this.direction.x * this.width;
                this.squares[i].pos.y += this.direction.y * this.width;
            }
        }
    }

    checkCollisions() : void
    {
        const head = this.squares[0];
        for (let i = 1; i < this.squares.length; i++) 
        {
            const tail = this.squares[i];
            if(checkSquareCollision(head, tail))
            {
                this.isAlive = false;
            }
        }
    }

    addSegment()
    {
        const lastSquare = this.squares[this.squares.length - 1];
        this.squares.push(new Square(
            new Vector2(lastSquare.pos.x, lastSquare.pos.y), 
            this.width
        ));
    }
}

const snakeSquareWidth = 20;
const snake = new Snake(snakeSquareWidth, (canvas.width - snakeSquareWidth) / 2, (canvas.height - snakeSquareWidth) / 2);
const food = new Square(new Vector2((canvas.width - snakeSquareWidth ) / 2, canvas.height / 2 - 100), snakeSquareWidth);

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

    if(checkSquareCollision(snake.squares[0], food))
    {
        snake.addSegment();
        food.pos.x = getRandomInt(0, canvas.width);
        food.pos.y = getRandomInt(0, canvas.height);
    }

    
    const head = snake.squares[0];
    const check = (head.pos.x > canvas.width || head.pos.x < 0 || head.pos.y > canvas.height || head.pos.y <0);
    if(!check)
    {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
