// Random number between min (inclusive) and max (exclusive)
export function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
// Random integer between min (inclusive) and max (inclusive)
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
}
