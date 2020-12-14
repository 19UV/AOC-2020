const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

function find_part1(array) {
    var cnt = 0;
    array.forEach(str=>{
        var data = str.replace(/[-:]/g," ").split(" ");
        data[0] = parseInt(data[0]);
        data[1] = parseInt(data[1]);

        var exp = new RegExp(data[2],"g");
        var char_cnt = (data[4].match(exp) || []).length;
        if((char_cnt>=data[0]) && (char_cnt<=data[1])) cnt++;
    });
    return cnt;
}

function find_part2(array) {
    var cnt = 0;
    array.forEach(str=>{
        var data = str.replace(/[-:]/g," ").split(" ");
        data[0] = parseInt(data[0])-1;
        data[1] = parseInt(data[1])-1;

        var char1_valid = (data[4][data[0]] == data[2])?1:0;
        var char2_valid = (data[4][data[1]] == data[2])?1:0;
        if((char1_valid+char2_valid)==1) cnt++;
    });
    return cnt;
}

console.log("Correct Passwords 1:",find_part1(data));
console.log("Correct Passwords 2:",find_part2(data));