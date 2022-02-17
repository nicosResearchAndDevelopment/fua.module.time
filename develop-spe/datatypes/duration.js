const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

function duration(param) {
    if (util.isObject(param)) {
        if (param['@type'] !== util.xsdIRI.duration && param['@type'] !== util.xsdURI.duration)
            throw new Error('expected param to be an ' + util.xsdIRI.duration);
        if (!util.isXsdDuration(param['@value']))
            throw new Error('expected param to be an ' + util.xsdIRI.duration);
        return param['@value'];
    } else {
        if (!util.isXsdDuration(param))
            throw new Error('expected param to be an ' + util.xsdIRI.duration);
        return param;
    }
} // duration

module.exports = duration;
