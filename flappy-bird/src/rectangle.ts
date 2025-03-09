import { ctx } from "./canvas.js";

export class Rectangle
{
    x : number;
    y : number;
    width : number;
    height : number;

    constructor(x: number, y: number, width : number, height: number)
    {
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(color : string): void 
    {
        ctx!.fillStyle = color; // Set color
        ctx!.fillRect(this.x, this.y, this.width, this.height);
    }
}