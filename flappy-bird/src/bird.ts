import { Rectangle } from "./rectangle.js";
import { isMousePressed } from "./input.js";
import { Vector2 } from "./math.js";

export class Bird 
{
    rectnagle: Rectangle;
    jumpTimer: number = 0;
    vel: Vector2 = new Vector2(0,0);
    acc: Vector2 = new Vector2(0,0);
    mass: number = 1;
    dt: number = 0.1;

    constructor(x: number, y: number, width: number) 
    {
        this.rectnagle = new Rectangle(x, y, width, width);
    }

    update(): void 
    {
        if(isMousePressed(0))
        {
            this.applyForce(0, -100);
        }

        this.applyForce(0, 9.8);
        
        this.vel.x = this.acc.x * this.dt;
        this.vel.y = this.acc.y * this.dt;
        
        this.rectnagle.x += this.vel.x * this.dt;
        this.rectnagle.y += this.vel.y * this.dt;

        this.rectnagle.draw("red");
    }

    applyForce(x: number, y: number): void
    {
        this.acc.x += x / this.mass;
        this.acc.y += y / this.mass;
    }
}