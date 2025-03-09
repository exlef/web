import { Game } from "./game.js";
const game = new Game();
function gameLoop() {
    game.update();
    requestAnimationFrame(gameLoop);
}
gameLoop();
