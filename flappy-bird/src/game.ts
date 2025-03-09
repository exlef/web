import { Bird } from "./bird.js";
import { canvas, ctx } from "./canvas.js";

export class Game
{
    private deltaTime: number = 0;
    private lastTime: number = performance.now();
    bird: Bird;


    constructor()
    {
        this.bird = new Bird(100, 100, 100);
    }

    update(): void
    {
        this.calcDt();
        this.clearCanvas();

        this.bird.update();
    }

    private calcDt(): void
    {
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
    }

    get dt(): number
    {
        return this.deltaTime;
    }

    private clearCanvas(): void
    {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
    }
}