const fs = require("fs");
const { join } = require("path");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

function apply_mask_v1(number, mask) {
	mask = ("X".repeat(36) + mask).slice(-36);
	number = ("0".repeat(36) + number.toString(2)).slice(-36);
	return parseInt(number.split("").map((c,i)=>{
		if(mask[i]=="X") return c;
		return mask[i];
	}).join(""),2);
}

function solve_part1(array) {
	var memory = [];
	var mask = "X".repeat(36);
	array.forEach(line=>{
		line = line.split(" ");
		var cmd = line[0];
		var val = line[2];
		if(cmd == "mask") {
			mask = val;
		} else {
			cmd = parseInt(cmd.slice(4,-1));
			val = parseInt(line[2]);
			while(memory.length<cmd) memory.push(0);
			memory[cmd] = apply_mask_v1(val,mask);
		}
	});
	memory=memory.filter(v=>v!=0);
	return memory.reduce((a,v)=>a+v);
}

function apply_mask_v2(number, mask) {
	mask = ("X".repeat(36) + mask).slice(-36);
	number = ("0".repeat(36) + number.toString(2)).slice(-36);
	return number.split("").map((c,i)=>{
		if(mask[i]=="0") return c;
		if(mask[i]=="1") return "1";
		return "X";
	}).join("");
}

function BigArray() {
	this.data = new Object();
	this.indicies = [];
	this.set = function(index, value) {
		if(!this.indicies.includes(index)) this.indicies.push(index);
		this.data[index.toString()] = value;
	}
	this.get = function(index) {
		return this.data[index.toString()]||0;
	}
}

const DEBUG_V2 = false;

function to_bin(number, length) {
	return ("0".repeat(length||36)+number.toString(2)).slice(-(length||36));
}

function solve_part2(array) {
	var memory = new BigArray();
	var mask = "X".repeat(36);
	array.forEach(line=>{
		line = line.split(" ");
		var cmd = line[0];
		if(cmd=="mask") {
			mask = line[2];
		} else {
			cmd = parseInt(cmd.slice(4,-1));
			if(DEBUG_V2) {
				console.log("");
				console.log("address:",to_bin(cmd));
				console.log("mask:   ",mask);
				console.log("result: ",apply_mask_v2(cmd,mask));
				console.log("");
			}
			var val = parseInt(line[2]);
			cmd = apply_mask_v2(cmd,mask);
			var possible = mask.split("").filter(v=>v=="X").length;
			for(var i=0;i<2**(possible);i++) {
				var path = ("0".repeat(possible) + i.toString(2)).slice(-possible);
				var tmp_mask = cmd.split("");
				var i0 = 0;
				for(var j=0;j<36;j++) {
					if(tmp_mask[j]!="X") continue;
					tmp_mask[j] = path[i0];
					i0++
				}
				var address = parseInt(tmp_mask.join(""),2);
				if(DEBUG_V2) console.log(("0".repeat(36)+address.toString(2)).slice(-36),"|",address);
				memory.set(address, val);
			}
		}
	});
	if(DEBUG_V2) console.log(" --- MEMORY DUMP ---");
	var sum = 0;
	memory.indicies.forEach(v=>{
		sum += memory.get(v);
		if(DEBUG_V2) console.log(v,":",memory.get(v));
	});
	return sum;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));