var fs = require('fs');
function part_one(listA, listB) {
    // Given: 2 lists of numbers indicating Location ID'split
    // Task: For each number in sorted listA and sorted listB:
    //       sum the absolute value of distances listA[i] and listB[i]
    // Return: The sumation of differences between equal indecies in both lists
    var res = 0;
    for (var i = 0; i < listA.length; i++) {
        res += Math.abs(listA[i] - listB[i]);
    }
    console.log('Part one:', res);
}
function part_two(listA, listB) {
    // Given: 2 lists of numbers
    // Task: Identify the frequency of numbers from listA in listB
    // i.e. How many times does listA[i] appear in listB?
    // Then, multiply listA[i] by n times it appears in listB
    // Return: The total sum of listA[i] * n
    var b = listB;
    var a = listA;
    var len = a.length;
    var res = 0;
    for (var i = 0; i < len; i++) {
        var l = void 0, r = void 0, m = void 0;
        l = 0, r = len - 1, m = Math.floor((l + r) / 2);
        var t = a[i];
        var count = 0;
        while (l <= r) {
            m = Math.floor((l + r) / 2);
            if (b[m] === t) {
                l = m;
                r = m;
                while (l > 0 && b[l - 1] === t)
                    l--;
                while (r < b.length - 1 && b[r + 1] === t)
                    r++;
                count = r - l + 1;
                break;
            }
            if (b[m] < t) {
                l = m + 1;
                continue;
            }
            if (b[m] > t) {
                r = m - 1;
            }
        }
        res += t * count;
    }
    console.log('Part two:', res);
}
function main() {
    var input = fs.readFileSync('input', 'utf-8').split('\n');
    var listA = [];
    var listB = [];
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var row = input_1[_i];
        var temp = row.split(' ');
        var numA = Number(temp[0]);
        var numB = Number(temp[3]);
        if (isNaN(numA) || isNaN(numB))
            continue;
        listA.push(numA);
        listB.push(numB);
    }
    listA.sort(function (a, b) { return a - b; });
    listB.sort(function (a, b) { return a - b; });
    part_one(listA, listB);
    part_two(listA, listB);
}
main();
