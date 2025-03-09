import { Game } from "./game.js";


const game = new Game();

function gameLoop(): void 
{
    game.update();
    requestAnimationFrame(gameLoop);
    
}

gameLoop();
