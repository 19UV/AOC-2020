const fs = require("fs");

const sort_func = (a,b)=>{
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
}

var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
data=data.map(v=>parseInt(v));
data=data.sort(sort_func);

function valid_next(array,val) {
    return array.filter(v=>{
        var diff = Math.abs(v-val);
        return (diff<=3)&&(diff>0);
    });
}

function solve_part1(array) {
    var delt1 = 0;
    var delt3 = 1;
    
    var prev = 0;
    array.forEach(v=>{
        var del = v-prev;
        switch(del) {
            case 1:
                delt1++;
                break;
            case 3:
                delt3++;
                break;
        }
        prev=v;
        return 0;
    });
	return delt1*delt3;
}

function solve_part2(array) {
	return "";
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));