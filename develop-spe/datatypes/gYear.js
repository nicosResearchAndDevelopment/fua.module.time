const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function gYear(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.gYear && param['@type'] !== util.xsdURI.gYear)
            throw new Error('expected param to be an ' + util.xsdIRI.gYear);
        if (!util.isXsdGYear(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.gYear);
        return param['@value'];
    } else {
        if (!util.isXsdGYear(param))
            throw new Error('expected param to be an ' + util.xsdIRI.gYear);
        return param;
    }
} // gYear

module.exports = gYear;
