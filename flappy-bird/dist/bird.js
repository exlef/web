import { Rectangle } from "./rectangle.js";
import { isMousePressed } from "./input.js";
export class Bird {
    constructor(x, y, width) {
        this.jumpTimer = 0;
        this.rectnagle = new Rectangle(x, y, width, width);
    }
    update() {
        this.jumpTimer += 0.1;
        if (isMousePressed(0)) {
            this.jumpTimer = 0;
        }
        if (this.jumpTimer < 1) {
            this.rectnagle.y -= 8;
        }
        else {
            this.addGravity();
        }
        this.rectnagle.x += 5;
        this.rectnagle.draw("red");
    }
    addGravity() {
        this.rectnagle.y += 10;
    }
}
