const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function gYearMonth(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.gYearMonth && param['@type'] !== util.xsdURI.gYearMonth)
            throw new Error('expected param to be an ' + util.xsdIRI.gYearMonth);
        if (!util.isXsdGYearMonth(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.gYearMonth);
        return param['@value'];
    } else {
        if (!util.isXsdGYearMonth(param))
            throw new Error('expected param to be an ' + util.xsdIRI.gYearMonth);
        return param;
    }
} // gYearMonth

module.exports = gYearMonth;
