console.log("\nDATE:\n");

// YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)

const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)Z$/i;

function date2Array(dateStr) {
    let result = dateRegex.exec(dateStr);
    return result ? [
        parseInt(result[1]),
        parseInt(result[2]) - 1,
        parseInt(result[3]),
        parseInt(result[4]),
        parseInt(result[5]),
        parseFloat(result[6])
    ] : null;
}

console.log("2018-01-01T13:40:41.042043Z ->", date2Array("2018-01-01T13:40:41.042043Z"));

console.log("1997 ->", date2Array("1997"));
console.log("1997-07 ->", date2Array("1997-07"));
console.log("1997-07-16 ->", date2Array("1997-07-16"));
console.log("1997-07-16T19:20Z ->", date2Array("1997-07-16T19:20Z"));
console.log("1997-07-16T19:20:30Z ->", date2Array("1997-07-16T19:20:30Z"));
console.log("1997-07-16T19:20:30.45Z ->", date2Array("1997-07-16T19:20:30.45Z"));

debugger;