const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
data=data.map(n=>parseInt(n));

const preamble_length = 25;

function solve_part1(array) {
	const arr_len = array.length;
	var invalid = [];
	for(var i=preamble_length;i<arr_len;i++) {
		var found = false;
		for(var a=1;a<=preamble_length;a++) {
			for(var b=1;b<=preamble_length;b++) {
				if((array[i-a]+array[i-b])==array[i]) {
					found = true;
					break;
				}
			}
		}
		if(!found) {
			invalid.push(array[i]);
		}
	}
	if(invalid.length>1) {
		console.log("Found More Than One Invalid Number");
	}
	return invalid[0];
}

function solve_part2(array, number) {
	const array_len = array.length;
	var first, last;
	for(var i=0;i<array_len;i++) {
		var cnt = array[i];
		for(var j=1;j<array_len-i;j++) {
			cnt += array[i+j];
			if(cnt == number) {
				first = i;
				last = i+j;
			}
		}
	}
	if((first==undefined)||(last==undefined)) return "";
	var preslice = array.slice(first, last+1);
	var min = Math.min(...preslice);
	var max = Math.max(...preslice);
	return min+max;
}

var sol1 = solve_part1(data);

console.log("Solution 1",sol1);
console.log("Solution 2",solve_part2(data,sol1));