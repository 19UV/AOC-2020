const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/[(\r).]/g,"").split("\n");
data = data.filter(s=>s!="");
const data_length = data.length;
data = data.map(s=>s.split(" contain "));
for(var i=0;i<data_length;i++) {
	data[i][0] = data[i][0].split(" ").slice(0,2).join(" ");
	data[i][1] = data[i][1].split(", ");
}

function check_bags_upward(array, type) {
	var bags = [];
	array.forEach(r=>{
		r[1].forEach(b=>{
			if(b.includes(type)) bags.push(r[0]);
		});
	});
	return bags||[];
}

function check_bags_downward(array, type) {
	var found = [];
	array.forEach(v=>{
		if(v[0].includes(type)) {
			v[1].forEach(a=>{
				var cnt = parseInt(a);
				var type = a.split(" ").slice(1,3).join(" ");
				for(var i=0;i<cnt;i++) found.push(type);
			});
		}
	});
	return found;
}

// This is a really awkward solution because I assumed I was supposed to remove previously processed bags
function check_all_bags_downward(array, type) {
	var found = [type];
	var all_found = 0;
	var iter = 0;
	while(true) {
		iter++;
		var change=0;
		var found_length = found.length;
		for(var i=0;i<found_length;i++) {
			var res = check_bags_downward(array, found[i]);
			var res_len = res.length;
			for(var j=0;j<res_len;j++) {
				all_found++;
				change++;
				found.push(res[j]);
			}
			found.splice(i,1);
		}
		if(change==0) break;
	}
	return all_found;
}

function check_all_bags_upward(array, type) {
	var found = [type];
	var iterations = 0;
	while(true) {
		iterations++;
		var found_length = found.length;
		var new_found = 0;
		for(var i=0;i<found_length;i++) {
			var f = check_bags_upward(array, found[i]);
			const f_length = f.length;
			for(var j=0;j<f_length;j++) {
				if(!found.includes(f[j])) {
					found.push(f[j]);
					new_found++;
				}
			}
		}
		if(new_found==0) break;
		if(iterations>100) {console.log("Bad Break");break;}
	}
	return found.slice(1);
}

function solve_part1(array, type) {
	return check_all_bags_upward(array,type).length;
}

function solve_part2(array, type) {
	return check_all_bags_downward(array,type);
}

console.log("Solution 1",solve_part1(data,"shiny gold"));
console.log("Solution 2",solve_part2(data,"shiny gold"));