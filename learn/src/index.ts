let x: number | string;

x = 3;
x = "hey";

///

function tryAdd(a: number, b: any) : number | boolean
{
    if(typeof b === "number")
    {
        return a + b;
    }
    return false;
}

console.log(tryAdd(3, "a"));
console.log(tryAdd(3,3));
