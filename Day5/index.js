const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

function getSeatData(string) {
	var y_min = 0;
	var y_max = 127;
	var x_min = 0;
	var x_max = 7;
	for(var i=0;i<10;i++) {
		var char = string[i].toUpperCase();
		switch(char) {
			case "F":
				y_max -= Math.ceil((y_max-y_min)/2);
				break;
			case "B":
				y_min += Math.ceil((y_max-y_min)/2);
				break;
			case "L":
				x_max -= Math.ceil((x_max-x_min)/2);
				break;
			case "R":
				x_min += Math.ceil((x_max-x_min)/2);
				break;
		}
	}
	var x = x_min;
	var y = y_min;
	var id = (y*8)+x;
	return [x,y,id];
}

function solve_part1(array) {
	var highest_id = 0;
	array.forEach(d=>{
		var info = getSeatData(d);
		var x = info[0];
		var y = info[1];
		var id = info[2];
		highest_id = Math.max(highest_id,id);
	});
	return highest_id;
}

function solve_part2(array) {
	var highest_id = solve_part1(array);
	var seats = [...new Array(highest_id).keys()].fill(true);
	array.forEach(s=>{
		var id = getSeatData(s)[2];
		seats[id] = false;
	});
	seats =seats.map((v,i)=>v?i:"").filter(v=>v!="");
	var prev = seats[0];
	for(var i=1;i<seats.length;i++) {
		if((seats[i]-prev)>1) return seats[i];
		prev=seats[i];
	}
	return -1;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));