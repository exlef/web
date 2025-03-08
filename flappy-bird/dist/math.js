// Random number between min (inclusive) and max (exclusive)
export function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
