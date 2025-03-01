const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rectangle properties
    const rectWidth = 100;
    const rectHeight = 100;
    const rectX = (canvas.width - rectWidth) / 2;
    const rectY = (canvas.height - rectHeight) / 2;

    // Draw the rectangle
    ctx.fillStyle = "red"; // Set color
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    requestAnimationFrame(gameLoop);
}

gameLoop();
