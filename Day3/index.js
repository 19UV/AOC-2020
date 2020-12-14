const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

const width = data[0].length;
const height = data.length;

function solve_part1(array,right,down) {
    var cnt = 0;
    var x = 0;
    var y = 0;
    while(y<height) {
        if(array[y%height][x%width]=='#') cnt++;
        x+=right;
        y+=down;
    }
    return cnt;
}
function solve_part2(array) {
    var cnt = 1;
    var set = [[1,1],[3,1],[5,1],[7,1],[1,2]];
    set.forEach(v=>{
        cnt *= solve_part1(array,v[0],v[1]);
    });
    return cnt;
}
console.log("Count 1:",solve_part1(data,3,1));
console.log("Count 2:",solve_part2(data));