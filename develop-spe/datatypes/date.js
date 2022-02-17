const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function date(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.date && param['@type'] !== util.xsdURI.date)
            throw new Error('expected param to be an ' + util.xsdIRI.date);
        if (!util.isXsdDate(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.date);
        return param['@value'];
    } else {
        if (!util.isXsdDate(param))
            throw new Error('expected param to be an ' + util.xsdIRI.date);
        return param;
    }
} // date

module.exports = date;
