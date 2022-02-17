const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function gMonthDay(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.gMonthDay && param['@type'] !== util.xsdURI.gMonthDay)
            throw new Error('expected param to be an ' + util.xsdIRI.gMonthDay);
        if (!util.isXsdGMonthDay(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.gMonthDay);
        return param['@value'];
    } else {
        if (!util.isXsdGMonthDay(param))
            throw new Error('expected param to be an ' + util.xsdIRI.gMonthDay);
        return param;
    }
} // gMonthDay

module.exports = gMonthDay;
