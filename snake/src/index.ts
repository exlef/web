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

class Square {
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    update() : void
    {
        console.log("he");
        if (isKeyPressed("w")) {
            square.move(0, -1);
        }
        if (isKeyPressed("s")) {
            square.move(0, 1);
        }
        if (isKeyPressed("a")) {
            square.move(-1, 0);
        }
        if (isKeyPressed("d")) {
            square.move(1, 0);
        }

        square.draw();
    }

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    draw(): void {
        ctx!.fillStyle = "red"; // Set color
        ctx!.fillRect(this.x, this.y, this.width, this.height);
    }
}

const square = new Square(100, 100, (canvas.width - 100) / 2, (canvas.height - 100) / 2);

function gameLoop(): void {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    
    square.update();

    requestAnimationFrame(gameLoop);
}

gameLoop();
