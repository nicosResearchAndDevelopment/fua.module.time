const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function nonNegativeInteger(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.nonNegativeInteger && param['@type'] !== util.xsdURI.nonNegativeInteger)
            throw new Error('expected param to be an ' + util.xsdIRI.nonNegativeInteger);
        if (!util.isXsdNonNegativeInteger(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.nonNegativeInteger);
        return param['@value'];
    } else {
        if (!util.isXsdNonNegativeInteger(param))
            throw new Error('expected param to be an ' + util.xsdIRI.nonNegativeInteger);
        return param;
    }
} // nonNegativeInteger

module.exports = nonNegativeInteger;
