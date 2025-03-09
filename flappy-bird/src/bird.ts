import { Rectangle } from "./rectangle.js";

export class Bird
{
    rectnagle : Rectangle;

    constructor(x: number, y: number, width: number)
    {
        this.rectnagle = new Rectangle(x, y, width, width);
    }

    update(): void
    {
        this.rectnagle.draw("red");
    }
}