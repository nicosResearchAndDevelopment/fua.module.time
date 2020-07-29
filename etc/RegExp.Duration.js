console.log("\nDURATION:\n");

/** {@link http://www.datypic.com/sc/xsd/t-xsd_duration.html xsd:duration} */
/** {@link https://stackoverflow.com/questions/52644699/validate-a-xsduration-using-a-regular-expression-in-javascript} */

// const origRegex = /^(-?)P(?=.)((\d+)Y)?((\d+)M)?((\d+)D)?(T(?=.)((\d+)H)?((\d+)M)?(\d*(\.\d+)?S)?)?$/;
const durationRegex = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/i;

function duration2Array(durationStr) {
    let result = durationRegex.exec(durationStr);
    return result ? [
        result[1] || "+",
        ...(result.slice(2, 7).map(val => parseInt(val || 0))),
        parseFloat(result[7] || 0)
    ] : null;
}

console.log("-P0Y3MT12.042S ->", duration2Array("-P0Y3MT12.042S"));

console.log("\nValid values:");
console.log("P2Y6M5DT12H35M30S ->", duration2Array("P2Y6M5DT12H35M30S"));
console.log("P1DT2H ->", duration2Array("P1DT2H"));
console.log("P20M ->", duration2Array("P20M"));
console.log("PT20M ->", duration2Array("PT20M"));
console.log("P0Y20M0D ->", duration2Array("P0Y20M0D"));
console.log("P0Y ->", duration2Array("P0Y"));
console.log("-P60D ->", duration2Array("-P60D"));
console.log("PT1M30.5S ->", duration2Array("PT1M30.5S"));

console.log("\nInvalid values:");
console.log("P-20M ->", duration2Array("P-20M"));
console.log("P20MT ->", duration2Array("P20MT"));
console.log("P1YM5D ->", duration2Array("P1YM5D"));
console.log("P15.5Y ->", duration2Array("P15.5Y"));
console.log("P1D2H ->", duration2Array("P1D2H"));
console.log("1Y2M ->", duration2Array("1Y2M"));
console.log("P2M1Y ->", duration2Array("P2M1Y"));
console.log("P ->", duration2Array("P"));
console.log("PT15.S ->", duration2Array("PT15.S"));

debugger;