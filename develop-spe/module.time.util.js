const
    _util = require('@nrd/fua.core.util'),
    util  = {
        ..._util,
        assert:  _util.Assert('module.time'),
        timeIRI: (prop) => 'time:' + prop,
        timeURI: (prop) => 'http://www.w3.org/2006/time#' + prop,
        gregIRI: (prop) => 'greg:' + prop,
        gregURI: (prop) => 'http://www.w3.org/ns/time/gregorian/' + prop
    };

util.getProperty = function (target, property) {
    if (!util.isObject(target)) return null;
    switch (property) {
        case 'id':
        case 'type':
        case 'value':
            return target[property] || target['@' + property] || null;
        default:
            return target[property] || target[util.timeIRI(property)] || target[util.timeURI(property)] || null;
    }
}; // getProperty

util.cleanupProperties = function (target) {
    if (!util.isObject(target)) return null;
    for (let key of Object.keys[target]) {
        if (!target[key]) delete target[key];
    }
    return target;
}; // cleanupProperties

util.isIRIString   = new util.StringValidator(/^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i);
util.isXsdDuration = _util.StringValidator(/^-?P(?=.)(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?=.)(?:\d+H)?(?:\d+M)?(?:\d*(?:\.\d+)?S)?)?$/);

// util.datePattern       = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.timePattern       = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.dateTimePattern   = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.gDayPattern       = /^---(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.gMonthPattern     = /^--(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.gMonthDayPattern  = /^--(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.gYearPattern      = /^(-?[1-9][0-9]*)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.gYearMonthPattern = /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/;
// util.durationPattern   = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/;

// isIRIString:        new util.StringValidator(/^[a-z][a-z0-9+.-]*:[^\s"<>\\^`{|}]*$/i),
// isPrefixString:     new util.StringValidator(/^[a-z][a-z0-9+.-]*$/i),
// isIdentifierString: new util.StringValidator(/^\S+$/),
// isLanguageString:   new util.StringValidator(/^[a-z]{1,3}(?:-[a-z0-9]{1,8})*$/i)

module.exports = util;
