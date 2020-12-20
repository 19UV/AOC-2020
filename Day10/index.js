const fs = require("fs");

const sort_func = (a,b)=>{
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
}

var data = fs.readFileSync("input.txt",{"encoding":"utf-8"}).replace(/(\r)/g,"").split("\n");
data=data.map(v=>parseInt(v));
data=data.sort(sort_func);
data=[0].concat(data);
data.push(Math.max(...data)+3);

function solve_part1(array) {
    var delt1 = 0;
    var delt3 = 0;
    
    var prev = 0;
    array.forEach(v=>{
        var del = v-prev;
        switch(del) {
            case 1:
                delt1++;
                break;
            case 3:
                delt3++;
                break;
        }
        prev=v;
        return 0;
    });
	return delt1*delt3;
}

// Slow
var valid_next = (array, value) => array.filter(v=>{var diff = v-value;return (diff>=1)&&(diff<=3);});
function count_possible(array, number) {
    var cnt = 0;
    var branches = valid_next(array, number);
    if(branches.length==0) return 1;
    branches.forEach(b=>{
        cnt += count_possible(array, b);
    });
    return cnt;
}

function find_back(tree, value) {
    var res = [];
    tree.forEach((v,i)=>{
        if(v.includes(value)) res.push(i);
    });
    return res;
}

function count_tree(tree, value) {
    var counts = [...new Array(tree.length).keys()].fill(1);
    for(var i=value-1;i>=0;i--) {
        var c = 0;
        for(var j=0;j<tree[i].length;j++) {
            c += counts[tree[i][j]];
        }
        counts[i] = c;
    }
    return counts[0];
}

function solve_part2(array) {
    var tree = [];
    const arr_len = array.length;
    for(var i=0;i<arr_len;i++) {
        var dat = [];
        for(var j=i+1;j<arr_len;j++) {
            if((array[j]-array[i])>3) break;
            dat.push(j);
        }
        tree.push(dat);
    }
    // tree.forEach((v,i)=>console.log(i,"->",v));
    return count_tree(tree, arr_len-1);
}

console.log("Solution 1",solve_part1(data));
console.log("Solution 2",solve_part2(data));

/*
          2 (1)
         /  \
        /    \
 0 (3)- 1 (3) <--- 4 (1) <----- 5 (1)
        \    /
         \ /
          3 (1)
*/