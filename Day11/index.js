const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
data=data.map(v=>{
	return v.split("").map(a=>{
		switch(a) {
			case ".":
				return 0;
			case "L":
				return 1;
			case "#":
				return 2;
		}
	});
});

const width = data[0].length;
const height = data.length;

function get_val(array, x, y) {
	if((x<0)||(y<0)) return 0;
	if((x>=width)||(y>=height)) return 0;
	return array[y][x];
}

function count_occupied(array, x, y) {
	var cnt=0;
	for(var i=-1;i<=1;i++) {
		for(var j=-1;j<=1;j++) {
			if((i==0)&&(j==0)) continue;
			if(get_val(array,x+i,y+j)==2) cnt++; 
		}
	}
	return cnt;
}

function count_see_occupied(array, x, y) {
	var cnt=0;
	for(var i=-1;i<=1;i++) {
		for(var j=-1;j<=1;j++) {
			if((i==0)&&(j==0)) continue;
			var px = x;
			var py = y;
			while(true) {
				if((px<0)||(px>width)) break;
				if((py<0)||(py>height)) break;

				px+=i; py+=j;

				var val = get_val(array,px,py);
				if(val==0) continue;
				if(val==2) cnt++;
				break;
			}
		}
	}
	return cnt;
}

function progress(array) {
	var buffer = array.map(a=>a.slice());
	for(var x=0;x<width;x++) {
		for(var y=0;y<height;y++) {
			var count = count_occupied(array,x,y);
			switch(get_val(array,x,y)) {
				case 1: // Seat Empty
					if(count == 0) {
						buffer[y][x] = 2;
					}
					break;
				case 2: // Seat Occupied
					if(count >= 4) {
						buffer[y][x] = 1;
					}
					break;
			}
		}
	}
	return buffer;
}

function progress2(array) {
	var buffer = array.map(a=>a.slice());
	for(var x=0;x<width;x++) {
		for(var y=0;y<height;y++) {
			var count = count_see_occupied(array,x,y);
			switch(get_val(array,x,y)) {
				case 1: // Seat Empty
					if(count == 0) {
						buffer[y][x] = 2;
					}
					break;
				case 2: // Seat Occupied
					if(count >= 5) {
						buffer[y][x] = 1;
					}
					break;
			}
		}
	}
	return buffer;
}

function get_hash(array) {
	return array.flat().join("");
}

function to_text(array) {
	var res = [];
	array.forEach(line=>{
		var part = [];
		line.forEach(num=>{
			part.push([".","L","#","█"][num]);
		});
		res.push(part.join(""));
	});
	return res.join("\n");
}

function solve_part1(array) {
	var mirror = array.map(a=>a.slice());
	var hash = get_hash(mirror);
	var prev_hash = hash;
	while(true) {
		mirror = progress(mirror);
		hash = get_hash(mirror);
		if(hash==prev_hash) break;
		prev_hash = hash;
	}
	return hash.split("").filter(v=>v==2).length;
}

function solve_part2(array) {
	var mirror = array.map(a=>a.slice());
	var hash = get_hash(mirror);
	var prev_hash = hash;
	while(true) {
		mirror = progress2(mirror);
		hash = get_hash(mirror);
		if(hash==prev_hash) break;
		prev_hash = hash;
	}
	return hash.split("").filter(v=>v==2).length;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));