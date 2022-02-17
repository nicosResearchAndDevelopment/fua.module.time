const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function string(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.string && param['@type'] !== util.xsdURI.string)
            throw new Error('expected param to be an ' + util.xsdIRI.string);
        if (!util.isString(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.string);
        return param['@value'];
    } else {
        if (!util.isString(param))
            throw new Error('expected param to be an ' + util.xsdIRI.string);
        return param;
    }
} // string

module.exports = string;
