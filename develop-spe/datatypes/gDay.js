const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function gDay(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.gDay && param['@type'] !== util.xsdURI.gDay)
            throw new Error('expected param to be an ' + util.xsdIRI.gDay);
        if (!util.isXsdGDay(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.gDay);
        return param['@value'];
    } else {
        if (!util.isXsdGDay(param))
            throw new Error('expected param to be an ' + util.xsdIRI.gDay);
        return param;
    }
} // gDay

module.exports = gDay;
