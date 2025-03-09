const keys: { [key: string]: boolean } = {};
const mouse: { [button: string]: boolean } = {};

window.addEventListener("keydown", (event) => 
{
    keys[event.key] = true;
});

window.addEventListener("keyup", (event) => 
{
    keys[event.key] = false;
});

window.addEventListener("mousedown", (event) => 
{
    mouse[event.button] = true;
});
    
window.addEventListener("mouseup", (event) => 
{
    mouse[event.button] = false;
});

export function isKeyPressed(key: string): boolean 
{
    return keys[key] === true;
}

export function isMousePressed(button: number): boolean 
{
    return mouse[button] === true;
}