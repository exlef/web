function getVertices(box) {
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
function project(vertices, axis) {
    let min = Infinity;
    let max = -Infinity;
    for (const vertex of vertices) {
        const projection = (vertex.x * axis.x + vertex.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);
        min = Math.min(min, projection);
        max = Math.max(max, projection);
    }
    return [min, max];
}
function overlap(proj1, proj2) {
    return proj1[0] <= proj2[1] && proj2[0] <= proj1[1];
}
export function checkOBBCollision(boxA, boxB) {
    const verticesA = getVertices(boxA);
    const verticesB = getVertices(boxB);
    const axes = [
        { x: verticesA[1].x - verticesA[0].x, y: verticesA[1].y - verticesA[0].y },
        { x: verticesA[3].x - verticesA[0].x, y: verticesA[3].y - verticesA[0].y },
        { x: verticesB[1].x - verticesB[0].x, y: verticesB[1].y - verticesB[0].y },
        { x: verticesB[3].x - verticesB[0].x, y: verticesB[3].y - verticesB[0].y }
    ];
    for (const axis of axes) {
        const projA = project(verticesA, axis);
        const projB = project(verticesB, axis);
        if (!overlap(projA, projB)) {
            return false;
        }
    }
    return true;
}
