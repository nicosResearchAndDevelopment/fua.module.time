const
    easter          = exports,
    spencer_formula = require('./spencer_easter_formula.js'),
    gauss_formula   = require('./gauss_easter_formula.js'),
    minYear         = 0,
    maxYear         = 3000,
    differences     = [];

for (let year = minYear; year <= maxYear; year++) {
    const
        spencer = spencer_formula(year),
        gauss   = gauss_formula(year);
    if (spencer !== gauss) {
        differences.push({year, spencer, gauss});
    }
}

console.log(differences);

easter.spencer_formula = spencer_formula;
easter.gauss_formula   = gauss_formula;
