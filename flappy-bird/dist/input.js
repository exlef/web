const keys = {};
window.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});
export function isKeyPressed(key) {
    return keys[key] === true;
}
