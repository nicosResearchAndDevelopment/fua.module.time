const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function decimal(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.decimal && param['@type'] !== util.xsdURI.decimal)
            throw new Error('expected param to be an ' + util.xsdIRI.decimal);
        if (!util.isXsdDecimal(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.decimal);
        return param['@value'];
    } else {
        if (!util.isXsdDecimal(param))
            throw new Error('expected param to be an ' + util.xsdIRI.decimal);
        return param;
    }
} // decimal

module.exports = decimal;
