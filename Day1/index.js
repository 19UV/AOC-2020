const fs = require("fs");

var arr = fs.readFileSync("input.txt",{"encoding":"utf8"}).split("\n").map(v=>parseInt(v));

function find_part1(array) {
    const array_length = array.length;
    for(var i=0;i<array_length;i++) {
        for(var j=0;j<array_length;j++) {
            if((array[i]+array[j])==2020) {
                return array[i]*array[j];
            }
        }
    }
    return 0;
}

function find_part2(array) {
    const array_length = array.length;
    for(var i=0;i<array_length;i++) {
        for(var j=0;j<array_length;j++) {
            for(var k=0;k<array_length;k++) {
                if((array[i]+array[j]+array[k])==2020) {
                    return array[i]*array[j]*array[k];
                }
            }
        }
    }
    return 0;
}

console.log("Part 1 Answer:",find_part1(arr));
console.log("Part 2 Answer:",find_part2(arr));