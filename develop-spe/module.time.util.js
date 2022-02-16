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

// util.DatatypeError = _util.createErrorClass('DatatypeError', 'FUA_ERROR_TIME_DATATYPE');
// util.PatternError  = _util.createErrorClass('PatternError', 'FUA_ERROR_TIME_PATTERN');
// util.RangeError    = _util.createErrorClass('RangeError', 'FUA_ERROR_TIME_RANGE');

util.timeIRI.after                  = util.timeIRI('after');
util.timeIRI.before                 = util.timeIRI('before');
util.timeIRI.day                    = util.timeIRI('day');
util.timeIRI.dayOfWeek              = util.timeIRI('dayOfWeek');
util.timeIRI.dayOfYear              = util.timeIRI('dayOfYear');
util.timeIRI.days                   = util.timeIRI('days');
util.timeIRI.generalDay             = util.timeIRI('generalDay');
util.timeIRI.generalMonth           = util.timeIRI('generalMonth');
util.timeIRI.generalYear            = util.timeIRI('generalYear');
util.timeIRI.hasBeginning           = util.timeIRI('hasBeginning');
util.timeIRI.hasDateTimeDescription = util.timeIRI('hasDateTimeDescription');
util.timeIRI.hasDuration            = util.timeIRI('hasDuration');
util.timeIRI.hasDurationDescription = util.timeIRI('hasDurationDescription');
util.timeIRI.hasEnd                 = util.timeIRI('hasEnd');
util.timeIRI.hasTRS                 = util.timeIRI('hasTRS');
util.timeIRI.hasTemporalDuration    = util.timeIRI('hasTemporalDuration');
util.timeIRI.hasTime                = util.timeIRI('hasTime');
util.timeIRI.hasXSDDuration         = util.timeIRI('hasXSDDuration');
util.timeIRI.hour                   = util.timeIRI('hour');
util.timeIRI.hours                  = util.timeIRI('hours');
util.timeIRI.inDateTime             = util.timeIRI('inDateTime');
util.timeIRI.inTemporalPosition     = util.timeIRI('inTemporalPosition');
util.timeIRI.inTimePosition         = util.timeIRI('inTimePosition');
util.timeIRI.inXSDDate              = util.timeIRI('inXSDDate');
util.timeIRI.inXSDDateTimeStamp     = util.timeIRI('inXSDDateTimeStamp');
util.timeIRI.inXSDgYear             = util.timeIRI('inXSDgYear');
util.timeIRI.inXSDgYearMonth        = util.timeIRI('inXSDgYearMonth');
util.timeIRI.inside                 = util.timeIRI('inside');
util.timeIRI.intervalAfter          = util.timeIRI('intervalAfter');
util.timeIRI.intervalBefore         = util.timeIRI('intervalBefore');
util.timeIRI.intervalContains       = util.timeIRI('intervalContains');
util.timeIRI.intervalDisjoint       = util.timeIRI('intervalDisjoint');
util.timeIRI.intervalDuring         = util.timeIRI('intervalDuring');
util.timeIRI.intervalEquals         = util.timeIRI('intervalEquals');
util.timeIRI.intervalFinishedBy     = util.timeIRI('intervalFinishedBy');
util.timeIRI.intervalFinishes       = util.timeIRI('intervalFinishes');
util.timeIRI.intervalIn             = util.timeIRI('intervalIn');
util.timeIRI.intervalMeets          = util.timeIRI('intervalMeets');
util.timeIRI.intervalMetBy          = util.timeIRI('intervalMetBy');
util.timeIRI.intervalOverlappedBy   = util.timeIRI('intervalOverlappedBy');
util.timeIRI.intervalOverlaps       = util.timeIRI('intervalOverlaps');
util.timeIRI.intervalStartedBy      = util.timeIRI('intervalStartedBy');
util.timeIRI.intervalStarts         = util.timeIRI('intervalStarts');
util.timeIRI.minute                 = util.timeIRI('minute');
util.timeIRI.minutes                = util.timeIRI('minutes');
util.timeIRI.month                  = util.timeIRI('month');
util.timeIRI.monthOfYear            = util.timeIRI('monthOfYear');
util.timeIRI.months                 = util.timeIRI('months');
util.timeIRI.nominalPosition        = util.timeIRI('nominalPosition');
util.timeIRI.numericDuration        = util.timeIRI('numericDuration');
util.timeIRI.numericPosition        = util.timeIRI('numericPosition');
util.timeIRI.second                 = util.timeIRI('second');
util.timeIRI.seconds                = util.timeIRI('seconds');
util.timeIRI.timeZone               = util.timeIRI('timeZone');
util.timeIRI.unitType               = util.timeIRI('unitType');
util.timeIRI.week                   = util.timeIRI('week');
util.timeIRI.weeks                  = util.timeIRI('weeks');
util.timeIRI.year                   = util.timeIRI('year');
util.timeIRI.years                  = util.timeIRI('years');

util.timeURI.after                  = util.timeURI('after');
util.timeURI.before                 = util.timeURI('before');
util.timeURI.day                    = util.timeURI('day');
util.timeURI.dayOfWeek              = util.timeURI('dayOfWeek');
util.timeURI.dayOfYear              = util.timeURI('dayOfYear');
util.timeURI.days                   = util.timeURI('days');
util.timeURI.generalDay             = util.timeURI('generalDay');
util.timeURI.generalMonth           = util.timeURI('generalMonth');
util.timeURI.generalYear            = util.timeURI('generalYear');
util.timeURI.hasBeginning           = util.timeURI('hasBeginning');
util.timeURI.hasDateTimeDescription = util.timeURI('hasDateTimeDescription');
util.timeURI.hasDuration            = util.timeURI('hasDuration');
util.timeURI.hasDurationDescription = util.timeURI('hasDurationDescription');
util.timeURI.hasEnd                 = util.timeURI('hasEnd');
util.timeURI.hasTRS                 = util.timeURI('hasTRS');
util.timeURI.hasTemporalDuration    = util.timeURI('hasTemporalDuration');
util.timeURI.hasTime                = util.timeURI('hasTime');
util.timeURI.hasXSDDuration         = util.timeURI('hasXSDDuration');
util.timeURI.hour                   = util.timeURI('hour');
util.timeURI.hours                  = util.timeURI('hours');
util.timeURI.inDateTime             = util.timeURI('inDateTime');
util.timeURI.inTemporalPosition     = util.timeURI('inTemporalPosition');
util.timeURI.inTimePosition         = util.timeURI('inTimePosition');
util.timeURI.inXSDDate              = util.timeURI('inXSDDate');
util.timeURI.inXSDDateTimeStamp     = util.timeURI('inXSDDateTimeStamp');
util.timeURI.inXSDgYear             = util.timeURI('inXSDgYear');
util.timeURI.inXSDgYearMonth        = util.timeURI('inXSDgYearMonth');
util.timeURI.inside                 = util.timeURI('inside');
util.timeURI.intervalAfter          = util.timeURI('intervalAfter');
util.timeURI.intervalBefore         = util.timeURI('intervalBefore');
util.timeURI.intervalContains       = util.timeURI('intervalContains');
util.timeURI.intervalDisjoint       = util.timeURI('intervalDisjoint');
util.timeURI.intervalDuring         = util.timeURI('intervalDuring');
util.timeURI.intervalEquals         = util.timeURI('intervalEquals');
util.timeURI.intervalFinishedBy     = util.timeURI('intervalFinishedBy');
util.timeURI.intervalFinishes       = util.timeURI('intervalFinishes');
util.timeURI.intervalIn             = util.timeURI('intervalIn');
util.timeURI.intervalMeets          = util.timeURI('intervalMeets');
util.timeURI.intervalMetBy          = util.timeURI('intervalMetBy');
util.timeURI.intervalOverlappedBy   = util.timeURI('intervalOverlappedBy');
util.timeURI.intervalOverlaps       = util.timeURI('intervalOverlaps');
util.timeURI.intervalStartedBy      = util.timeURI('intervalStartedBy');
util.timeURI.intervalStarts         = util.timeURI('intervalStarts');
util.timeURI.minute                 = util.timeURI('minute');
util.timeURI.minutes                = util.timeURI('minutes');
util.timeURI.month                  = util.timeURI('month');
util.timeURI.monthOfYear            = util.timeURI('monthOfYear');
util.timeURI.months                 = util.timeURI('months');
util.timeURI.nominalPosition        = util.timeURI('nominalPosition');
util.timeURI.numericDuration        = util.timeURI('numericDuration');
util.timeURI.numericPosition        = util.timeURI('numericPosition');
util.timeURI.second                 = util.timeURI('second');
util.timeURI.seconds                = util.timeURI('seconds');
util.timeURI.timeZone               = util.timeURI('timeZone');
util.timeURI.unitType               = util.timeURI('unitType');
util.timeURI.week                   = util.timeURI('week');
util.timeURI.weeks                  = util.timeURI('weeks');
util.timeURI.year                   = util.timeURI('year');
util.timeURI.years                  = util.timeURI('years');

// util.getProperty = function (target, property, default_value = null) {
//     if (!util.isObject(target)) return default_value;
//     switch (property) {
//         case 'id':
//         case 'type':
//         case 'value':
//             return target[property] || target['@' + property] || default_value;
//         default:
//             return target[property] || target[util.timeIRI(property)] || target[util.timeURI(property)] || default_value;
//     }
// }; // getProperty

// util.cleanupProperties = function (target) {
//     if (!util.isObject(target)) return null;
//     for (let key of Object.keys(target)) {
//         if (!target[key]) delete target[key];
//     }
//     return target;
// }; // cleanupProperties

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
