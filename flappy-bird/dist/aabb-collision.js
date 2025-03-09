/**
 * Checks if two axis-aligned bounding boxes are colliding
 * @param boxA The first bounding box
 * @param boxB The second bounding box
 * @returns True if the boxes are colliding, false otherwise
 */
export function checkAABBCollisionAlt(boxA, boxB) {
    // Check for overlap on both axes
    return (boxA.x < boxB.x + boxB.width &&
        boxA.x + boxA.width > boxB.x &&
        boxA.y < boxB.y + boxB.height &&
        boxA.y + boxA.height > boxB.y);
}
/**
 * Example usage:
 *
 * const player = { x: 10, y: 20, width: 32, height: 32 };
 * const enemy = { x: 30, y: 25, width: 32, height: 32 };
 *
 * if (checkAABBCollision(player, enemy)) {
 *   console.log("Collision detected!");
 * }
 */
