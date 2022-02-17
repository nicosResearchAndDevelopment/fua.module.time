const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function dateTimeStamp(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.dateTimeStamp && param['@type'] !== util.xsdURI.dateTimeStamp)
            throw new Error('expected param to be an ' + util.xsdIRI.dateTimeStamp);
        if (!util.isXsdDateTimeStamp(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.dateTimeStamp);
        return param['@value'];
    } else {
        if (!util.isXsdDateTimeStamp(param))
            throw new Error('expected param to be an ' + util.xsdIRI.dateTimeStamp);
        return param;
    }
} // dateTimeStamp

module.exports = dateTimeStamp;
