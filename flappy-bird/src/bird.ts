import { Rectangle } from "./rectangle.js";
import { isMousePressed } from "./input.js";

export class Bird 
{
    rectnagle: Rectangle;
    jumpTimer: number = 0;

    constructor(x: number, y: number, width: number) 
    {
        this.rectnagle = new Rectangle(x, y, width, width);
    }

    update(): void 
    {
        this.jumpTimer += 0.1;

        if(isMousePressed(0))
        {
            this.jumpTimer = 0;
        }

        if(this.jumpTimer < 1)
        {
            this.rectnagle.y -= 8;
        }
        else 
        {
            this.addGravity();
        }

        this.rectnagle.x += 5;

        this.rectnagle.draw("red");
    }

    addGravity(): void
    {
        this.rectnagle.y += 10;
    }
}