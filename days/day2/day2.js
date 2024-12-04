var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
function part_one(input) {
    // Given:   An array of reports representing "levels" as a space delimited string of numbers ( i.e. "99 20 42" )
    //          This list of numbers denotes "lab reports". There is one report per index of input.
    //
    // Task:    Determine which of the reports are "safe"
    //          "Safe" lab reports are either only increasing or only decreasing in numeric value from left to right
    //          Furthermore, starting from the initial number, each subsequent number should be +/- 3 from its predecessor
    //          If the value is the same as its predecessor, the number did not increase or decrease, so it is not safe.
    //
    // Return:  A number value denoting the total number of safe reports
    var count = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var report = input_1[_i];
        var r = report.split(' ').map(Number);
        if (r.length === 1)
            continue;
        var inc = r[0] < r[1];
        for (var i = 0; i < r.length - 1; i++) {
            var t = (r[i + 1] - r[i]);
            if ((inc && (t > 3 || t < 1)) || (!inc && (t < -3 || t > -1))) {
                count--;
                break;
            }
        }
        count++;
    }
    return count;
}
function part_two(input) {
    // Given:   An array of reports representing "levels" as a space delimited string of numbers ( i.e. "99 20 42" )
    //          This list of numbers denotes "lab reports". There is one report per index of input.
    //
    // Task:    Determine which of the reports are "safe"
    //          "Safe" lab reports are either only increasing or only decreasing in numeric value from left to right
    //          Furthermore, starting from the initial number, each subsequent number should be +/- 3 from its predecessor
    //          If the value is the same as its predecessor, the number did not increase or decrease, so it is not safe.
    //          However, if there is only 1 value within the report that would make it unsafe, the report is still considered safe
    //          This would require the removal of one value from the list, and the contiguous safety of the remaining values.
    //
    // Return:  A number value denoting the total number of safe reports
    var count = 0;
    var check = function (diff) {
        for (var i = 0; i < diff.length - 1; i++) {
            var curr = diff[i];
            var next = diff[i + 1];
            if (curr === 0 || next === 0)
                return false;
            // Check if all decreasing or increasing
            if (curr > 0 && next < 0)
                return false;
            if (curr < 0 && next > 0)
                return false;
            // Check if values are within bounds
            if (Math.abs(curr) > 3 || Math.abs(next) > 3)
                return false;
        }
        return true;
    };
    var diff = function (report) {
        var ret = [];
        for (var i = 0; i < report.length - 1; i++) {
            var t = report[i + 1] - report[i];
            ret.push(t);
        }
        return ret;
    };
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var report = input_2[_i];
        var original = report.split(' ').map(Number);
        if (original.length === 1) {
            continue;
        }
        var d = diff(original);
        if (check(d)) {
            count++;
            continue;
        }
        var safe = false;
        for (var i = 0; i < original.length; i++) {
            var modified = __spreadArray([], original, true);
            modified.splice(i, 1);
            if (check(diff(modified))) {
                safe = true;
                break;
            }
        }
        console.log(report, safe);
        if (safe)
            count++;
    }
    return count; //463 too low 509 too high
}
function main() {
    var input = fs.readFileSync('input', 'utf-8').split('\n');
    console.log('Part one:', part_one(input));
    console.log('Part two:', part_two(input));
}
main();
