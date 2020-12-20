const fs = require("fs");
var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");

const BENCHMARK = true;

function solve_part1(array) {
	if(BENCHMARK) var start = (new Date()).getTime();
	array=array[0].split(",").map(v=>parseInt(v));
	for(var i=array.length-1;i<2019;i++){
		var value=array[i];
		var times=array.filter(v=>v==value).length;
		if(times==1) {
			array.push(0);
		}else{
			const arr_len=array.length-1;
			for(var j=arr_len-1;j>=0;j--){
				if(array[j]==value) break;
			}
			array.push(arr_len-j);
		}
	}
	if(BENCHMARK) {
		var end = (new Date()).getTime();
		console.log("Unoptimized Milliseconds:",end-start);
	}
	return array[array.length-1];
}

function solve_part2(arr) {
	if(BENCHMARK) var start = (new Date()).getTime();
	arr=arr[0].split(",").map(v=>parseInt(v));
	var cnts=[];
	arr.forEach(v=>{
		while(cnts.length<=v) cnts.push(0);
		cnts[v]++;
	});
	var last = arr[arr.length-1];
	const reps = (BENCHMARK?2020:30000000)-arr.length
	for(var i=0;i<reps;i++) {
		if(cnts[last]==1) {
			arr.push(0);
			cnts[0]++;
			last = 0;
		} else {
			for(var j=arr.length-2;j>=0;j--) {
				if(arr[j]==last) {
					last = arr.length-1-j;
					while(cnts.length<=last) cnts.push(0);
					cnts[last]++;
					arr.push(last);
					break;
				}
			}
		}
	}
	if(BENCHMARK) {
		var end = (new Date()).getTime();
		console.log("Optimized 1 Milliseconds:",end-start);
	}
	return last;
}

function solve_part2_v2(arr) {
	if(BENCHMARK) var start = (new Date()).getTime();
	arr=arr[0].split(",").map(v=>parseInt(v));
	var cnts=[]; // [value] : cnt
	var inds=[]; // [value] : last index
	arr.forEach((v,i)=>{
		while(cnts.length<=v){cnts.push(0);inds.push(0);}
		cnts[v]++;
		inds[v]=i;
	});
	var last = arr[arr.length-1];
	const reps = 10-arr.length;
	// const reps = (BENCHMARK?2020:30000000)-arr.length;
	for(var i=0;i<reps;i++) {
		if(cnts[last]==1) {
			cnts[0]++;
			inds[0] = i;
			last = 0;
			console.log(0);
		} else {
			console.log(last);
		}
	}

	if(BENCHMARK) {
		var end = (new Date()).getTime();
		console.log("Optimized 2 Milliseconds:",end-start);
	}
	return last;
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));
console.log("Solution 3",solve_part2_v2(data));