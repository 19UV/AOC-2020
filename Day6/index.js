const fs = require("fs");
// Day4 Input Code
var file = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
var data = [""];
var ptr = 0;

file.forEach(v=>{
	if(v=="") {data.push("");ptr++;return;}
	data[ptr] += " " + v;
});
data=data.map(s=>s.trim());

function chartoid(character) {
	return character.charCodeAt(0)-97;
}

function solve_part1(array) {
	var cnt = 0;
	array.forEach(v=>{
		v = v.split(" ").join(""); // Bad Code I Know
		cnt += (new Set(v)).size
	}); // array.reduce?
	return cnt;
}

function solve_part2(array) {
	var cnt = 0;
	array.forEach(s=>{
		var people = s.split(" ");
		var chars = [...new Array(26).keys()].fill(0);
		people.forEach(p=>{
			p.split("").forEach(c=>{
				chars[chartoid(c)]++;
			});
		});
		chars = chars.filter(c=>c==people.length);
		cnt += chars.length;
	});
	return cnt;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));