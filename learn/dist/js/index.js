"use strict";
let x;
x = 3;
x = "hey";
///
function tryAdd(a, b) {
    if (typeof b === "number") {
        return a + b;
    }
    return false;
}
console.log(tryAdd(3, "a"));
console.log(tryAdd(3, 3));
