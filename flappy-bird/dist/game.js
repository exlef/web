import { Bird } from "./bird.js";
import { canvas, ctx } from "./canvas.js";
export class Game {
    constructor() {
        this.deltaTime = 0;
        this.lastTime = performance.now();
        this.bird = new Bird(100, 100, 100);
    }
    update() {
        this.calcDt();
        this.clearCanvas();
        this.bird.update();
    }
    calcDt() {
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
    }
    get dt() {
        return this.deltaTime;
    }
    clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
