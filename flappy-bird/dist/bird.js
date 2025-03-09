import { Rectangle } from "./rectangle.js";
export class Bird {
    constructor(x, y, width) {
        this.rectnagle = new Rectangle(x, y, width, width);
    }
    update() {
        this.rectnagle.draw("red");
    }
}
