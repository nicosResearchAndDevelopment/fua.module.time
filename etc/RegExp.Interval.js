console.log("\nINTERVAL:\n");

// YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)
const intervalRegex = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}(?:\.\d+)?))?Z)?)?)?)$/i;

function date2Interval(dateStr) {
    let result = intervalRegex.exec(dateStr);
    return result ? [
        parseInt(result[1]),
        result[2] ? parseInt(result[2]) - 1 : null,
        result[3] ? parseInt(result[3]) : null,
        result[4] ? parseInt(result[4]) : null,
        result[5] ? parseInt(result[5]) : null,
        result[6] ? parseFloat(result[6]) : null
    ]/*.filter(val => val !== null)*/ : null;
}

console.log(date2Interval("2018-01-01T13:40:41.042043Z"));

console.log("1997 ->", date2Interval("1997"));
console.log("1997-07 ->", date2Interval("1997-07"));
console.log("1997-07-16 ->", date2Interval("1997-07-16"));
console.log("1997-07-16T19:20Z ->", date2Interval("1997-07-16T19:20Z"));
console.log("1997-07-16T19:20:30Z ->", date2Interval("1997-07-16T19:20:30Z"));
console.log("1997-07-16T19:20:30.45Z ->", date2Interval("1997-07-16T19:20:30.45Z"));

debugger;