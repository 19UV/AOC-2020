const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

function solve_part1(array) {
	var x = 0;
	var y = 0;
	var dir = 0;
	array.forEach(s=>{
		var action = s[0];
		var amount = parseInt(s.slice(1));

		switch(action) {
			case "N":
				y += amount;
				break;
			case "S":
				y -= amount;
				break;
			case "E":
				x += amount;
				break;
			case "W":
				x -= amount;
				break;
			case "R":
				dir -= amount;
				break;
			case "L":
				dir += amount;
				break;
			case "F":
				while(dir<0) dir+=360;
				dir=dir%360;

				if(![0,90,180,270].includes(dir)) {
					console.log("ERROR Unexpected Direction");
					break;
				}

				switch(dir) {
					case 0:
						x += amount;
						break;
					case 90:
						y += amount;
						break;
					case 180:
						x -= amount;
						break;
					case 270:
						y -= amount;
						break;
				}
				break;
		}
	});
	return Math.abs(x)+Math.abs(y);
}

function solve_part2(array) {
	var wx = 10;
	var wy = 1;
	var sx = 0;
	var sy = 0;

	array.forEach(str=>{
		var cmd = str[0];
		var amt = parseInt(str.slice(1));

		switch(cmd) {
			case "N":
				wy += amt;
				break;
			case "S":
				wy -= amt;
				break;
			case "E":
				wx += amt;
				break;
			case "W":
				wx -= amt;
				break;
			case "R":
				while(amt<0) amt+=360;
				amt = amt%360;

				for(var i=0;i<amt;i+=90) {
					var ox = wx;
					var oy = wy;
					wx = oy;
					wy = -ox;
				}
				break;
			case "L":
				while(amt<0) amt+=360;
				amt = amt%360;
				
				for(var i=0;i<amt;i+=90) {
					var ox = wx;
					var oy = wy;
					wx = -oy;
					wy = ox;
				}
				break;
			case "F":
				sx += wx*amt;
				sy += wy*amt;
				break;
		}
	});
	return Math.abs(sx)+Math.abs(sy);
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));