const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Failed to get canvas context");
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
export { canvas, ctx };
