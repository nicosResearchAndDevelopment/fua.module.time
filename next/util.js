const
    _              = exports,
    time           = require('./module.time.js'),
    MODULE_NAME    = 'module.time',
    RE_xsdDuration = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/i;

_.UNIX_TIME = 'http://dbpedia.org/resource/Unix_time';
_.CONSTANTS = Object.create(null);

_.CONSTANTS.secondInMilliseconds  = 1000;
_.CONSTANTS.minuteInSeconds       = 60;
_.CONSTANTS.hourInMinutes         = 60;
_.CONSTANTS.dayInHours            = 24;
_.CONSTANTS.weekInDays            = 7;
_.CONSTANTS.millisecondInSeconds  = 1 / _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.minuteInMilliseconds  = _.CONSTANTS.minuteInSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.secondInMinutes       = 1 / _.CONSTANTS.minuteInSeconds;
_.CONSTANTS.hourInSeconds         = _.CONSTANTS.hourInMinutes * _.CONSTANTS.minuteInSeconds;
_.CONSTANTS.hourInMilliseconds    = _.CONSTANTS.hourInSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.secondInHours         = 1 / _.CONSTANTS.hourInSeconds;
_.CONSTANTS.dayInMinutes          = _.CONSTANTS.dayInHours * _.CONSTANTS.hourInMinutes;
_.CONSTANTS.dayInSeconds          = _.CONSTANTS.dayInMinutes * _.CONSTANTS.minuteInSeconds;
_.CONSTANTS.dayInMilliseconds     = _.CONSTANTS.dayInSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.weekInSeconds         = _.CONSTANTS.weekInDays * _.CONSTANTS.dayInSeconds;
_.CONSTANTS.weekInMinutes         = _.CONSTANTS.weekInDays * _.CONSTANTS.dayInMinutes;
_.CONSTANTS.weekInHours           = _.CONSTANTS.weekInDays * _.CONSTANTS.dayInHours;
_.CONSTANTS.weekInMilliseconds    = _.CONSTANTS.weekInSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.month28inSeconds      = 28 * _.CONSTANTS.dayInSeconds;
_.CONSTANTS.month28inMilliseconds = _.CONSTANTS.month28inSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.month29inSeconds      = 29 * _.CONSTANTS.dayInSeconds;
_.CONSTANTS.month29inMilliseconds = _.CONSTANTS.month29inSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.month30inSeconds      = 30 * _.CONSTANTS.dayInSeconds;
_.CONSTANTS.month30inMilliseconds = _.CONSTANTS.month30inSeconds * _.CONSTANTS.secondInMilliseconds;
_.CONSTANTS.month31inSeconds      = 31 * _.CONSTANTS.dayInSeconds;
_.CONSTANTS.month31inMilliseconds = _.CONSTANTS.month31inSeconds * _.CONSTANTS.secondInMilliseconds;

_.assert = function (value, errMsg = 'undefined error', errType = Error) {
    if (!value) {
        const err = new errType(`${MODULE_NAME} : ${errMsg}`);
        Error.captureStackTrace(err, _.assert);
        throw err;
    }
};

_.lockProp = function (obj, ...keys) {
    const lock = {writable: false, configurable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, lock);
    }
};

_.strValidator = function (pattern) {
    return (value) => _.isString(value) && pattern.test(value);
};

_.arrValidator = function (checker) {
    return (value) => _.isArray(value) && value.every(checker);
};

_.isBoolean = function (value) {
    return typeof value === 'boolean';
};

_.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

_.isString = function (value) {
    return typeof value === 'string';
};

_.isFunction = function (value) {
    return typeof value === 'function';
};

_.isObject = function (value) {
    return value && typeof value === 'object';
};

_.isArray = Array.isArray;

_.isDate = function (value) {
    return value && value instanceof Date
        && !isNaN(value.valueOf())
};

_.isTemporalEntity = function (value) {
    return value instanceof time.Instant
        || value instanceof time.ProperInterval;
};

_.buildDate = function (value) {
    let result;
    switch (typeof value) {
        case 'string':
            result = new Date(value);
            break;
        case 'number':
            result = new Date(1e3 * value);
            break;
        case 'object':
            if (value instanceof Date) {
                result = value;
            } else if (value instanceof time.Instant) {
                result = value.date;
            }
    }

    if (_.isDate(result)) {
        return result;
    }
};

_.dateToSeconds = function (date) {
    return _.CONSTANTS.millisecondInSeconds * date.valueOf();
};

_.getTimeFromDateTimeInSeconds = function (dateTimeInSeconds) {
    return dateTimeInSeconds % _.CONSTANTS.dayInSeconds;
};

_.xsdDuration2durationArray = function (xsdDuration) {
    let result = RE_xsdDuration.exec(xsdDuration);
    if (result) {
        return [
            result[1] || "+",
            ...(result.slice(2, 7).map(val => parseInt(val || 0))),
            parseFloat(result[7] || 0)
        ];
    }
}