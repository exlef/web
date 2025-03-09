// Random number between min (inclusive) and max (exclusive)
export function getRandomNumber(min: number, max: number): number 
{
    return Math.random() * (max - min) + min;
}

// Random integer between min (inclusive) and max (inclusive)
export function getRandomInt(min: number, max: number): number 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Vector2 
{
    x: number;
    y: number;

    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2 
    {
        return new Vector2(this.x, this.y);
    }
}