/**
 * Represents a rectangular bounding box for collision detection
 */
interface BoundingBox {
  x: number;      // x-coordinate of the top-left corner
  y: number;      // y-coordinate of the top-left corner
  width: number;  // width of the bounding box
  height: number; // height of the bounding box
}

/**
 * Checks if two axis-aligned bounding boxes are colliding
 * @param boxA The first bounding box
 * @param boxB The second bounding box
 * @returns True if the boxes are colliding, false otherwise
 */
function checkAABBCollision(boxA: BoundingBox, boxB: BoundingBox): boolean 
{
    // Check if boxA's right edge is to the left of boxB's left edge
    // or if boxA's left edge is to the right of boxB's right edge
    if (boxA.x + boxA.width < boxB.x || boxA.x > boxB.x + boxB.width) 
    {
        return false;
    }
  
    // Check if boxA's bottom edge is above boxB's top edge
    // or if boxA's top edge is below boxB's bottom edge
    if (boxA.y + boxA.height < boxB.y || boxA.y > boxB.y + boxB.height) 
    {
        return false;
    }
  
    // If we get here, the boxes are overlapping
    return true;
}

/**
 * Alternative implementation using the separating axis theorem logic
 * (Same result, just expressed differently)
 */
function checkAABBCollisionAlt(boxA: BoundingBox, boxB: BoundingBox): boolean 
{
    // Check for overlap on both axes
    return (
        boxA.x < boxB.x + boxB.width &&
    boxA.x + boxA.width > boxB.x &&
    boxA.y < boxB.y + boxB.height &&
    boxA.y + boxA.height > boxB.y
    );
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
