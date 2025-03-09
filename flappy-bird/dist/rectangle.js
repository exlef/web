import { ctx } from "./canvas.js";
export class Rectangle {
    constructor(pos, width) {
        this.x = pos.x;
        this.y = pos.y;
        this.width = width;
        this.height = width;
    }
    draw(color) {
        ctx.fillStyle = color; // Set color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
