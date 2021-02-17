const
    _              = exports,
    C              = require('./module.time.constants.js'),
    time           = require('./module.time.js'),
    MODULE_NAME    = 'module.time',
    RE_xsdDuration = /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/i;

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

_.hideProp = function (obj, ...keys) {
    const hide = {enumerable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, hide);
    }
};

_.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

_.isInteger = function (value) {
    return _.isNumber(value) && value === Math.floor(value);
};

_.isString = function (value) {
    return typeof value === 'string';
};

_.isDate = function (value) {
    return value && value instanceof Date
        && !isNaN(value.valueOf())
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
    return C.millisecondInSeconds * date.valueOf();
};

_.getTimeFromDateTimeInSeconds = function (dateTimeInSeconds) {
    return dateTimeInSeconds % C.dayInSeconds;
};

_.moduloAndRest = function (value, divisor) {
    const
        result = Math.floor(value / divisor),
        rest   = value - result;

    return [result, rest];
};

_.getTemporalEntity = function (parameter) {
    switch (typeof parameter) {

        case 'object':
            if (!parameter) {
                return;
            } else if (parameter instanceof Date) {
                return new time.Instant(parameter);
            }
            if (parameter instanceof time.Instant) {
                return parameter;
            } else if (parameter instanceof time.ProperInterval) {
                return parameter;
            } else if (parameter['@type'] === 'xsd:dateTimeStamp') {
                return new time.Instant(parameter['@value']);
            } else if (parameter['@type'] === "time:ProperInterval") {
                return new time.ProperInterval(parameter['@value'].hasBeginning, parameter['@value'].hasEnd);
            } else {
                return;
            }

        case 'string':
        default:
            return new time.Instant(parameter);

    } // switch
};

_.getGMonthDayFromDateTime = function (dateTime, resultType) {
    let date = _.buildDate(dateTime);
    switch (resultType) {

        case 'gMonthDayArray':
            return [date.getUTCMonth() + 1, (date.getUTCDate())];

        case 'xsd:gMonthDay':
        default:
            return '--' + (date.getUTCMonth() + 1).toString().padStart(2, '0')
                + '-' + date.getUTCDate().toString().padStart(2, '0')

    } // switch
};

_.isLeapYear = function (year) {
    return ((year % 4 === 0) && (year % 100 !== 0))
        || (year % 400 === 0);
};

_.getNumberOfLeapDaysFromInterval = function (interval) {
    // TODO: das sollte man DEFINITIV anders, intelligenter machen...
    let
        feb        = (interval['dateBeginning']['getMonth']() <= 1),
        afterFeb   = (interval['dateEnd']['getMonth']() > 1),
        start_year = ((interval['dateBeginning']['getMonth']() < 2) ? interval['dateBeginning']['getFullYear']() : (interval['dateBeginning']['getFullYear']() + 1)),
        end_year   = ((interval['dateEnd']['getMonth']() > 1) ? interval['dateEnd']['getFullYear']() : (interval['dateEnd']['getFullYear']() - 1)),
        result     = ((feb && afterFeb) ? 1 : 0)
    ;
    //for (let i = start_year; i <= end_year; i++) {
    for (let i = start_year; i < end_year; i++) {
        if (_.isLeapYear(i))
            result++;
    } // for (i)
    return result;
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
};

_.durationArray2xsdDuration = function (durationArray) {
    let result = `${((durationArray[0] === "-") ? "-" : "")}P${((durationArray[1] !== 0) ? `${durationArray[1]}Y` : "")}${((durationArray[2] !== 0) ? `${durationArray[2]}M` : "")}${((durationArray[3] !== 0) ? `${durationArray[3]}D` : "")}T${((durationArray[4] !== 0) ? `${durationArray[4]}H` : "")}${((durationArray[5] !== 0) ? `${durationArray[5]}M` : "")}${((durationArray[6] !== 0) ? `${durationArray[6]}S` : "")}`;
    result     = (result.endsWith("T") ? result.slice(0, -1) : result);
    return ((result === "P") ? C.durationZeroPeriod : result);
};

_.durationFromDates2xsdDuration = function (beginning, end) {
    let
        diffInMilliseconds = (end - beginning),
        calc,
        durationArray      = ["+", 0, 0, 0, 0, 0, 0];

    if (diffInMilliseconds !== 0) {
        calc             = _.moduloAndRest(diffInMilliseconds, C.dayInMilliseconds);
        durationArray[3] = calc[0];
        if (calc[1] !== 0) {
            calc             = _.moduloAndRest(calc[1], C.hourInMilliseconds);
            durationArray[4] = calc[0];
            if (calc[1] !== 0) {
                calc             = _.moduloAndRest(calc[1], C.minuteInMilliseconds);
                durationArray[5] = calc[0];
                if (calc[1] !== 0) {
                    calc             = _.moduloAndRest(calc[1], C.secondInMilliseconds);
                    durationArray[6] = (calc[0] + (calc[1] / 1000));
                } // if
            } // if
        } // if
    } // if

    return _.durationArray2xsdDuration(durationArray);
};

_.durationFromInstants2xsdDuration = function (beginning, end) {
    return _.durationFromDates2xsdDuration(beginning.date, end.date);
};