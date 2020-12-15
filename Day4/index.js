const fs = require("fs");
var file = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
var data = [""];
var ptr = 0;

file.forEach(v=>{
	if(v=="") {data.push("");ptr++;return;}
	data[ptr] += " " + v;
});
data=data.map(s=>s.trim());

function solve_part1(array) {
	var cnt = 0;
	array.forEach(str => {
		var passport = str.split(" ");
		var attrib = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];
		var valid = true;
		attrib.forEach(a=>{
			for(var i=0;i<passport.length;i++) {
				if(passport[i].slice(0,3)==a) return;
			}
			valid = false;
			return;
		});
		if(valid) cnt++;
	});
	return cnt;
}

function solve_part2(array) {
	var cnt = 0;
	var attrib = "byr,iyr,eyr,hgt,hcl,ecl,pid".split(',');
	array.forEach(p=>{
		var valid = true;
		var keys = p.split(" ").map(v=>v.split(":"));
		var key_ids = keys.map(k=>k[0]);
		attrib.forEach(a=>{if(!key_ids.includes(a)) valid = false;});
		keys.forEach(k=>{
			switch(k[0]) {
				case "byr":
					k[1]=parseInt(k[1]);
					if(!((1920<=k[1])&&(k[1]<=2002))) valid=false;
					break;
				case "iyr":
					k[1]=parseInt(k[1]);
					if(!((2010<=k[1])&&(k[1]<=2020))) valid=false;
					break;
				case "eyr":
					k[1]=parseInt(k[1]);
					if(!((2020<=k[1])&&(k[1]<=2030))) valid=false;
					break;
				case "hgt":
					var unit = k[1].slice(-2);
					k[1]=parseInt(k[1]);
					switch(unit) {
						case "cm":
							if(!((150<=k[1])&&(k[1]<=193))) valid=false;
							break;
						case "in":
							if(!((59<=k[1])&&(k[1]<=76))) valid=false;
							break;
						default:
							valid = false;
							break;
					}
					break;
				case "hcl":
					if(!(k[1].match(/^#[0-9a-fA-F]{6}$/))) valid=false; // Check if regex does the same in node as the browser
					break;
				case "ecl":
					if(!(["amb","blu","brn","gry","grn","hzl","oth"].includes(k[1]))) valid=false;
					break;
				case "pid":
					if(!(k[1].match(/^[0-9]{9}$/))) valid=false;
					break;
			}
		});
		if(valid) {
			cnt++;
		}
	});
	return cnt;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));