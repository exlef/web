// Random number between min (inclusive) and max (exclusive)
export function getRandomNumber(min: number, max: number): number 
{
    return Math.random() * (max - min) + min;
}