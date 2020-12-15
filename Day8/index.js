const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
const DEBUG = false;

function emulate(program) {
	var g_val = 0;
	var instruct_ptr = 0;
	var prev_pos = [];
	while(true) {
		if(program[instruct_ptr] == undefined) return [0, g_val];
		if(prev_pos.includes(instruct_ptr)) return [-1, g_val];
		prev_pos.push(instruct_ptr);

		var line = program[instruct_ptr].split(" ");
		switch(line[0]) {
			case "acc":
				g_val += parseInt(line[1]);
				instruct_ptr++;
				break;
			case "jmp":
				instruct_ptr += parseInt(line[1]);
				break;
			case "nop":
				instruct_ptr++;
				break;
		}
	}
}

function solve_part2(array) {
	const program_length = array.length;
	for(var i=0;i<program_length;i++) {
		var inst = array[i].split(" ")[0];
		if((inst!="jmp")&&(inst!="nop")) continue;
		var temp_prog = [...array];
		temp_prog[i] = `${(inst=="jmp")?"nop":"jmp"} ${array[i].split(" ")[1]}`;
		var res = emulate(temp_prog);
		if(res[0]==0) return res[1];
	}
	return -1;
}

console.log("Solution 1",emulate(data)[1]);
console.log("Solution 2",solve_part2(data));