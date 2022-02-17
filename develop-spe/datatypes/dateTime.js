const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function dateTime(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.dateTime && param['@type'] !== util.xsdURI.dateTime)
            throw new Error('expected param to be an ' + util.xsdIRI.dateTime);
        if (!util.isXsdDateTime(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.dateTime);
        return param['@value'];
    } else {
        if (!util.isXsdDateTime(param))
            throw new Error('expected param to be an ' + util.xsdIRI.dateTime);
        return param;
    }
} // dateTime

module.exports = dateTime;
