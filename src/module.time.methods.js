const
    method = exports,
    _      = require('./module.time.util.js'),
    C      = require('./module.time.constants.js'),
    time   = require('./module.time.js');

method.now = function () {
    return new time.Instant(new Date);
}; // method.now

method.from = function ({temporalEntity = new time.Instant(new Date), offset = "P0Y"}) {
    let
        interval,
        result
    ;
    switch (temporalEntity['@type']) {
        case "time:Instant":
            result = new time.ProperInterval(temporalEntity.date, offset);
            result = result.hasEnd;
            //debugger;
            break;
        default: // Intervall
            interval = new time.ProperInterval(
                temporalEntity.dateBeginning,
                offset
            );
            result   = new time.ProperInterval(
                interval.dateEnd,
                temporalEntity.hasXSDDuration['@value']
            );
            break;
    } // switch()
    return result;
}; // method.from

const xsdRegExp = {
    literalString: /^["']([0-9\-.:+TZPYMDHS]+)["']\^\^(?:xsd?:|http:\/\/www\.w3\.org\/2001\/XMLSchema#)(\w+)$/,
    literalValue:  /^[0-9\-.:+TZPYMDHS]+$/,
    literalType:   /^(?:xsd?:|http:\/\/www\.w3\.org\/2001\/XMLSchema#)(\w+)$/,
    time:          /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    date:          /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    dateTime:      /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    gDay:          /^---(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    gMonth:        /^--(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    gMonthDay:     /^--(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    gYear:         /^(-?[1-9][0-9]*)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    gYearMonth:    /^(-?[1-9][0-9]*)-(1[0-2]|0[1-9])(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/,
    duration:      /^(-?)P(?=.)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?=.)(?:(\d+)H)?(?:(\d+)M)?(?:(\d*(?:\.\d+)?)S)?)?$/
};

method.fromXsdLiteral = function (literal, referenceDate) {
    if (!referenceDate) referenceDate = new Date();
    else referenceDate = _.buildDate(referenceDate);
    _.assert(_.isDate(referenceDate), 'fromXsdLiteral : invalid referenceDate');

    let xsdValue = '', xsdType = '';
    if (_.isString(literal)) {
        const match = xsdRegExp.literalString.exec(literal);
        _.assert(match, 'fromXsdLiteral : invalid string pattern');
        xsdValue = match[1];
        xsdType  = match[2];
    } else if (_.isObject(literal)) {
        if (literal['@value'] && literal['@type']) literal = {
            value:    literal['@value'],
            datatype: {value: literal['@type']}
        };
        _.assert(_.isString(literal.value) && xsdRegExp.literalValue.test(literal.value), 'fromXsdLiteral : invalid literal value');
        _.assert(_.isString(literal.datatype?.value), 'fromXsdLiteral : invalid literal datatype');
        const match = xsdRegExp.literalType.exec(literal.datatype.value);
        _.assert(match, 'fromXsdLiteral : invalid literal datatype');
        xsdValue = literal.value;
        xsdType  = match[1];
    }

    _.assert(xsdValue && xsdType, 'fromXsdLiteral : invalid xsd data');
    let result = null, now = referenceDate, temp = {};

    switch (xsdType) {

        case 'date':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-date
            temp.match = xsdRegExp.date.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:date format');
            // check for timezone marker
            temp.utc  = !!(temp.match[4] || temp.match[7]);
            // parse times
            temp.YYYY = parseInt(temp.match[1]);
            temp.MM   = parseInt(temp.match[2]);
            temp.DD   = parseInt(temp.match[3]);
            // calculate timezone offset
            if (temp.match[4] === '+') {
                temp.hh = -parseInt(temp.match[5]);
                temp.mm = -parseInt(temp.match[6]);
            } else if (temp.match[4] === '-') {
                temp.hh = parseInt(temp.match[5]);
                temp.mm = parseInt(temp.match[6]);
            } else if (temp.match[7]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1, temp.DD);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1D');
            break; // case 'date'

        case 'time':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
            temp.match = xsdRegExp.time.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:time format');
            // check for timezone marker
            temp.utc = !!(temp.match[4] || temp.match[7]);
            // set current date
            if (temp.utc) {
                temp.YYYY = now.getUTCFullYear();
                temp.MM   = now.getUTCMonth() + 1;
                temp.DD   = now.getUTCDate();
            } else {
                temp.YYYY = now.getFullYear();
                temp.MM   = now.getMonth() + 1;
                temp.DD   = now.getDate();
            }
            // parse times
            temp.hh = parseInt(temp.match[1]);
            temp.mm = parseInt(temp.match[2]);
            temp.ss = parseInt(temp.match[3]);
            temp.ms = 1000 * (parseFloat(temp.match[3]) - temp.ss);
            // calculate timezone offset
            if (temp.match[4] === '+') {
                temp.hh -= parseInt(temp.match[5]);
                temp.mm -= parseInt(temp.match[6]);
            } else if (temp.match[4] === '-') {
                temp.hh += parseInt(temp.match[5]);
                temp.mm += parseInt(temp.match[6]);
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
            }
            // create instant
            result = new time.Instant(temp.date);
            break; // case 'time'

        case 'dateTime':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime
            temp.match = xsdRegExp.dateTime.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:dateTime format');
            // check for timezone marker
            temp.utc  = !!(temp.match[7] || temp.match[10]);
            // parse times
            temp.YYYY = parseInt(temp.match[1]);
            temp.MM   = parseInt(temp.match[2]);
            temp.DD   = parseInt(temp.match[3]);
            temp.hh   = parseInt(temp.match[4]);
            temp.mm   = parseInt(temp.match[5]);
            temp.ss   = parseInt(temp.match[6]);
            temp.ms   = 1000 * (parseFloat(temp.match[6]) - temp.ss);
            // calculate timezone offset
            if (temp.match[7] === '+') {
                temp.hh -= parseInt(temp.match[8]);
                temp.mm -= parseInt(temp.match[9]);
            } else if (temp.match[7] === '-') {
                temp.hh += parseInt(temp.match[8]);
                temp.mm += parseInt(temp.match[9]);
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
            }
            // create instant
            result = new time.Instant(temp.date);
            break; // case 'dateTime'

        case 'gDay':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gday
            temp.match = xsdRegExp.gDay.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:gDay format');
            // check for timezone marker
            temp.utc = !!(temp.match[2] || temp.match[5]);
            // set current date
            if (temp.utc) {
                temp.YYYY = now.getUTCFullYear();
                temp.MM   = now.getUTCMonth() + 1;
            } else {
                temp.YYYY = now.getFullYear();
                temp.MM   = now.getMonth() + 1;
            }
            // parse times
            temp.DD = parseInt(temp.match[1]);
            // calculate timezone offset
            if (temp.match[2] === '+') {
                temp.hh = -parseInt(temp.match[3]);
                temp.mm = -parseInt(temp.match[4]);
            } else if (temp.match[2] === '-') {
                temp.hh = parseInt(temp.match[3]);
                temp.mm = parseInt(temp.match[4]);
            } else if (temp.match[5]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1, temp.DD);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1D');
            break; // case 'gDay'

        case 'gMonth':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonth
            temp.match = xsdRegExp.gMonth.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:gMonth format');
            // check for timezone marker
            temp.utc = !!(temp.match[2] || temp.match[5]);
            // set current date
            if (temp.utc) {
                temp.YYYY = now.getUTCFullYear();
            } else {
                temp.YYYY = now.getFullYear();
            }
            // parse times
            temp.MM = parseInt(temp.match[1]);
            // calculate timezone offset
            if (temp.match[2] === '+') {
                temp.hh = -parseInt(temp.match[3]);
                temp.mm = -parseInt(temp.match[4]);
            } else if (temp.match[2] === '-') {
                temp.hh = parseInt(temp.match[3]);
                temp.mm = parseInt(temp.match[4]);
            } else if (temp.match[5]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, 1, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1M');
            break; // case 'gMonth'

        case 'gMonthDay':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gmonthday
            temp.match = xsdRegExp.gMonthDay.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:gMonthDay format');
            // check for timezone marker
            temp.utc = !!(temp.match[3] || temp.match[6]);
            // set current date
            if (temp.utc) {
                temp.YYYY = now.getUTCFullYear();
            } else {
                temp.YYYY = now.getFullYear();
            }
            // parse times
            temp.MM = parseInt(temp.match[1]);
            temp.DD = parseInt(temp.match[2]);
            // calculate timezone offset
            if (temp.match[3] === '+') {
                temp.hh = -parseInt(temp.match[4]);
                temp.mm = -parseInt(temp.match[5]);
            } else if (temp.match[3] === '-') {
                temp.hh = parseInt(temp.match[4]);
                temp.mm = parseInt(temp.match[5]);
            } else if (temp.match[6]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, temp.DD, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1, temp.DD);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1D');
            break; // case 'gMonthDay'

        case 'gYear':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyear
            temp.match = xsdRegExp.gYear.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:gYear format');
            // check for timezone marker
            temp.utc  = !!(temp.match[2] || temp.match[5]);
            // parse times
            temp.YYYY = parseInt(temp.match[1]);
            // calculate timezone offset
            if (temp.match[2] === '+') {
                temp.hh = -parseInt(temp.match[3]);
                temp.mm = -parseInt(temp.match[4]);
            } else if (temp.match[2] === '-') {
                temp.hh = parseInt(temp.match[3]);
                temp.mm = parseInt(temp.match[4]);
            } else if (temp.match[5]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, 0, 1, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, 0);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1Y');
            break; // case 'gYear'

        case 'gYearMonth':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-gyearmonth
            temp.match = xsdRegExp.gYearMonth.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:gYearMonth format');
            // check for timezone marker
            temp.utc  = !!(temp.match[3] || temp.match[6]);
            // parse times
            temp.YYYY = parseInt(temp.match[1]);
            temp.MM   = parseInt(temp.match[2]);
            // calculate timezone offset
            if (temp.match[3] === '+') {
                temp.hh = -parseInt(temp.match[4]);
                temp.mm = -parseInt(temp.match[5]);
            } else if (temp.match[3] === '-') {
                temp.hh = parseInt(temp.match[4]);
                temp.mm = parseInt(temp.match[5]);
            } else if (temp.match[6]) {
                temp.hh = 0;
                temp.mm = 0;
            }
            // create date object
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM - 1, 1, temp.hh, temp.mm);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM - 1);
            }
            // create proper interval
            result = new time.ProperInterval(temp.date, 'P1M');
            break; // case 'gYearMonth'

        case 'duration':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-duration
            temp.match = xsdRegExp.duration.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:duration format');
            if (xsdValue.startsWith('-')) result = new time.ProperInterval(xsdValue.substr(1), now);
            else result = new time.ProperInterval(now, xsdValue);
            break; // case 'duration'

        default:
            _.assert(false, 'fromXsdLiteral : unknown type xsd:' + xsdType);

    } // switch

    return result;
}; // method.fromXsdLiteral

method.fromPeriod = function (periodString) {
    // SEE https://datatracker.ietf.org/doc/html/rfc3339#appendix-A
    // period          = period-explicit / period-start / period-end
    // period-explicit = iso-date-time "/" iso-date-time
    // period-start    = iso-date-time "/" duration
    // period-end      = duration "/" iso-date-time
    const [beginning, end] = periodString.split('/');
    return new time.ProperInterval(beginning, end);
}; // method.fromPeriod

method.today = function () {
    let
        _date_ = new Date
    ;
    return new time.ProperInterval(
        `${_date_.getUTCFullYear()}-${(_date_.getUTCMonth() + 1)}-${_date_.getDate()}`,
        `P1D`
    );
}; // method.today

method.tomorrow = function () {
    let
        _date_ = new Date
    ;
    _date_.setDate(_date_.getDate() + 1);
    return new time.ProperInterval(
        `${_date_.getUTCFullYear()}-${(_date_.getUTCMonth() + 1)}-${_date_.getDate()}`,
        `P1D`
    );
}; // method.tomorrow

method.yesterday = function () {
    let
        _date_ = new Date
    ;
    _date_.setDate(_date_.getDate() - 1);
    return new time.ProperInterval(
        `${_date_.getUTCFullYear()}-${(_date_.getUTCMonth() + 1)}-${_date_.getDate()}`,
        `P1D`
    );
}; // method.yesterday

method.stamp = function (dateTimestamp, to, floor) {
    dateTimestamp = dateTimestamp || method.now();
    to            = to || 'xsd:dateTimestamp';
    switch (to.toLowerCase()) {

        case 'in milliseconds':
        case 'inmilliseconds':
        case 'milliseconds':
        case 'ms':
            return floor
                ? Math.floor(dateTimestamp.beginning * C.secondInMilliseconds)
                : dateTimestamp.beginning * C.secondInMilliseconds;

        case 'in seconds':
        case 'inseconds':
        case 'seconds':
        case 'sec':
            return floor
                ? Math.floor(dateTimestamp.beginning)
                : dateTimestamp.beginning;

        case 'in minutes':
        case 'inminutes':
        case 'minutes':
        case 'min':
            return floor
                ? Math.floor(dateTimestamp.beginning * C.secondInMinutes)
                : dateTimestamp.beginning * C.secondInMinutes;

        case 'in hours':
        case 'inhours':
        case 'hours':
        case 'h':
            return floor
                ? Math.floor(dateTimestamp.beginning * C.secondInHours)
                : dateTimestamp.beginning * C.secondInHours;

        case 'in days':
        case 'indays':
        case 'days':
        case 'd':
            return floor
                ? Math.floor(dateTimestamp.beginning * C.secondInDays)
                : dateTimestamp.beginning * C.secondInDays;

        case 'time:datetimedescription':
            return dateTimestamp.$serialize().inDateTime;

        case 'xsd:datetimestamp':
        case 'datetimestamp':
        default:
            return dateTimestamp.$serialize().inXSDDateTimeStamp;

    } // switch
}; // method.stamp

method.stamp.inXsdDateTimestamp = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'xsd:dateTimestamp', floor);
}; // method.stamp.inXsdDateTimestamp

method.stamp.inMilliseconds = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'ms', floor);
}; // method.stamp.inMilliseconds

method.stamp.inSeconds = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'sec', floor);
}; // method.stamp.inSeconds

method.stamp.inMinutes = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'min', floor);
}; // method.stamp.inMinutes

method.stamp.inHours = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'h', floor);
}; // method.stamp.inHours

method.stamp.inDays = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'd', floor);
}; // method.stamp.inDays

method.stamp.inTimeDatetimeDescription = function (dateTimestamp, floor) {
    return method.stamp(dateTimestamp, 'time:DateTimeDescription', floor);
}; // method.stamp.inTimeDatetimeDescription
