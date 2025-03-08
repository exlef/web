const keys: { [key: string]: boolean } = {};

window.addEventListener("keydown", (event) => 
{
    keys[event.key] = true;
});

window.addEventListener("keyup", (event) => 
{
    keys[event.key] = false;
});

export function isKeyPressed(key: string): boolean 
{
    return keys[key] === true;
}