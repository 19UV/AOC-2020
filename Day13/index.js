const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

function get_next_bus(time, buses) {
	var bus_id = 0;
	var bus_arrive = Infinity;
	buses.forEach(bus=>{
		var t = Math.ceil(time/bus)*bus;
		if(t<bus_arrive) {
			bus_arrive = t;
			bus_id = bus;
		}
	});
	return [bus_id, bus_arrive];
}

function solve_part1(array) {
	var time = parseInt(array[0]);
	var buses = array[1].split(",").filter(v=>v!="x").map(v=>parseInt(v));
	var next_bus = get_next_bus(time, buses);
	return next_bus[0]*(next_bus[1]-time);
}

/*
If you have a number that is divisible by 5, and you add 15. It will still be divisible by 5
If you have a number that is divisible by 3, and you add 15. It will still be divisible by 3
You want to find the largest number that is divisible by the entire data set and increment by that
*/

function solve_part2(array) { // Based off of code by Ryan Palo (https://dev.to/rpalo)
	array = array[1].split(",");
	var ids = array.map(v=>parseInt(v)).filter(v=>v+1);
	var offsets = array.map((v,i)=>{
		if(v!="x") return i;
	}).filter(v=>v+1);

    var step = ids[0];
    var search_idx = 1;
    for(var t=step;t<Number.MAX_SAFE_INTEGER;t+=step) {
        var success = true;
        for(var i=0;i<=search_idx;i++) {
            if((t+offsets[i])%ids[i]!=0) {
                success = false;
                break;
            }
        }
        if(success && search_idx == ids.length-1) return t;
        if(success) {
            step *= ids[search_idx];
            search_idx++;
        }
    }
    return -1;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));