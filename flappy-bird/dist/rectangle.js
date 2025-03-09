import { ctx } from "./canvas.js";
export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(color) {
        ctx.fillStyle = color; // Set color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
