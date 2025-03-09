import { ctx } from "./canvas.js";
import { Vector2 } from "./math.js";

export class Rectangle
{
    x : number;
    y : number;
    width : number;
    height : number;

    constructor(pos : Vector2, width : number)
    {
        
        this.x = pos.x;
        this.y = pos.y;
        this.width = width;
        this.height = width;
    }

    draw(color : string): void 
    {
        ctx!.fillStyle = color; // Set color
        ctx!.fillRect(this.x, this.y, this.width, this.height);
    }
}