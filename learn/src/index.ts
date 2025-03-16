import { match, P } from "ts-pattern";

function tryAdd(a: number, b: any): number | boolean {
    if (typeof b === "number") {
        return a + b;
    }
    return false;
}

let result = match(tryAdd(3,3))
    .with(P.number, (value) => {
        console.log("Addition successful:", value);
    })
    .with(P.boolean, (value) => {
        console.log("Addition failed:", value);
    })
    .exhaustive(); // Ensures all cases are handled


    // next : https://www.youtube.com/watch?v=9dw2ik9N8wo&list=PL0Zuz27SZ-6NS8GXt5nPrcYpust89zq_b&index=3