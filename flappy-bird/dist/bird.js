import { Rectangle } from "./rectangle.js";
import { isMousePressed } from "./input.js";
import { Vector2 } from "./math.js";
export class Bird {
    constructor(x, y, width) {
        this.jumpTimer = 0;
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.mass = 1;
        this.dt = 0.1;
        this.rectnagle = new Rectangle(x, y, width, width);
    }
    update() {
        if (isMousePressed(0)) {
            this.applyForce(0, -100);
        }
        this.applyForce(0, 9.8);
        this.vel.x = this.acc.x * this.dt;
        this.vel.y = this.acc.y * this.dt;
        this.rectnagle.x += this.vel.x * this.dt;
        this.rectnagle.y += this.vel.y * this.dt;
        this.rectnagle.draw("red");
    }
    applyForce(x, y) {
        this.acc.x += x / this.mass;
        this.acc.y += y / this.mass;
    }
}
