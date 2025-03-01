const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error("Failed to get canvas context");
}

function resizeCanvas(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const keys: { [key: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

function isKeyPressed(key: string): boolean {
    return keys[key] === true;
}

class Vector2 
{
    x : number;
    y : number;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }
}

class Square {
    width: number;
    height: number;
    x: number;
    y: number;
    direction : Vector2;
    moveTimer : number;
    speed : number;

    constructor(width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.direction = new Vector2(0, -1);
        this.moveTimer = 0;
        this.speed = 25;
    }

    update() : void
    {
        if (isKeyPressed("w") && this.direction.y != 1) {
            this.direction.x = 0;
            this.direction.y = -1;
        }
        if (isKeyPressed("s") && this.direction.y != -1) {
            this.direction.x = 0;
            this.direction.y = 1;
        }
        if (isKeyPressed("a") && this.direction.x != 1) {
            this.direction.x = -1;
            this.direction.y = 0;
        }
        if (isKeyPressed("d") && this.direction.x != -1) {
            this.direction.x = 1;
            this.direction.y = 0;
        }
        
        this.moveTimer += deltaTime;
        if(this.moveTimer > 1)
        {
            this.move();
            this.moveTimer = -deltaTime;
        }
        this.draw();
    }

    move(): void {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
    }

    draw(): void {
        ctx!.fillStyle = "red"; // Set color
        ctx!.fillRect(this.x, this.y, this.width, this.height);
    }
}

const square = new Square(100, 100, (canvas.width - 100) / 2, (canvas.height - 100) / 2);

let lastTime = performance.now();
let deltaTime : number;
function gameLoop(): void {
    const currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    
    square.update();

    requestAnimationFrame(gameLoop);
}

gameLoop();
