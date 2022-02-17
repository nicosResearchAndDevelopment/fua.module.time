const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function gMonth(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.gMonth && param['@type'] !== util.xsdURI.gMonth)
            throw new Error('expected param to be an ' + util.xsdIRI.gMonth);
        if (!util.isXsdGMonth(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.gMonth);
        return param['@value'];
    } else {
        if (!util.isXsdGMonth(param))
            throw new Error('expected param to be an ' + util.xsdIRI.gMonth);
        return param;
    }
} // gMonth

module.exports = gMonth;
