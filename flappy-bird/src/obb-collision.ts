interface Point {
    x: number;
    y: number;
}

interface OrientedBoundingBox 
{
    center: Point;  // center of the bounding box
    halfWidth: number;  // half the width of the bounding box
    halfHeight: number; // half the height of the bounding box
    angle: number;  // rotation angle in radians
}

function getVertices(box: OrientedBoundingBox): Point[]
{
    const { center, halfWidth, halfHeight, angle } = box;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return [
        { x: center.x + halfWidth * cos - halfHeight * sin, y: center.y + halfWidth * sin + halfHeight * cos },
        { x: center.x - halfWidth * cos - halfHeight * sin, y: center.y - halfWidth * sin + halfHeight * cos },
        { x: center.x - halfWidth * cos + halfHeight * sin, y: center.y - halfWidth * sin - halfHeight * cos },
        { x: center.x + halfWidth * cos + halfHeight * sin, y: center.y + halfWidth * sin - halfHeight * cos }
    ];
}

function project(vertices: Point[], axis: Point): [number, number]
{
    let min = Infinity;
    let max = -Infinity;

    for (const vertex of vertices)
    {
        const projection = (vertex.x * axis.x + vertex.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);
        min = Math.min(min, projection);
        max = Math.max(max, projection);
    }

    return [min, max];
}

function overlap(proj1: [number, number], proj2: [number, number]): boolean
{
    return proj1[0] <= proj2[1] && proj2[0] <= proj1[1];
}

export function checkOBBCollision(boxA: OrientedBoundingBox, boxB: OrientedBoundingBox): boolean
{
    const verticesA = getVertices(boxA);
    const verticesB = getVertices(boxB);

    const axes = [
        { x: verticesA[1].x - verticesA[0].x, y: verticesA[1].y - verticesA[0].y },
        { x: verticesA[3].x - verticesA[0].x, y: verticesA[3].y - verticesA[0].y },
        { x: verticesB[1].x - verticesB[0].x, y: verticesB[1].y - verticesB[0].y },
        { x: verticesB[3].x - verticesB[0].x, y: verticesB[3].y - verticesB[0].y }
    ];

    for (const axis of axes) 
    {
        const projA = project(verticesA, axis);
        const projB = project(verticesB, axis);

        if (!overlap(projA, projB)) 
        {
            return false;
        }
    }

    return true;
}