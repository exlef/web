"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_pattern_1 = require("ts-pattern");
function tryAdd(a, b) {
    if (typeof b === "number") {
        return a + b;
    }
    return false;
}
let result = (0, ts_pattern_1.match)(tryAdd(3, 3))
    .with(ts_pattern_1.P.number, (value) => {
    console.log("Addition successful:", value);
})
    .with(ts_pattern_1.P.boolean, (value) => {
    console.log("Addition failed:", value);
})
    .exhaustive(); // Ensures all cases are handled
// next : https://www.youtube.com/watch?v=9dw2ik9N8wo&list=PL0Zuz27SZ-6NS8GXt5nPrcYpust89zq_b&index=3
