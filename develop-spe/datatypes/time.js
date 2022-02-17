const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function time(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.time && param['@type'] !== util.xsdURI.time)
            throw new Error('expected param to be an ' + util.xsdIRI.time);
        if (!util.isXsdTime(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.time);
        return param['@value'];
    } else {
        if (!util.isXsdTime(param))
            throw new Error('expected param to be an ' + util.xsdIRI.time);
        return param;
    }
} // time

module.exports = time;
