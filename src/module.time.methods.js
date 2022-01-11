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

method.fromXsdLiteral = function (literal) {
    let xsdValue = '', xsdType = '';
    if (_.isString(literal)) {
        const match = /^["']([0-9\-.:+TZ]+)["']\^\^(?:xsd?:|http:\/\/www\.w3\.org\/2001\/XMLSchema#)(\w+)$/.exec(literal);
        _.assert(match, 'fromXsdLiteral : invalid string pattern');
        xsdValue = match[1];
        xsdType  = match[2];
    } else if (_.isObject(literal)) {
        if (literal['@value'] && literal['@type']) literal = {value: literal['@value'], datatype: literal['@type']};
        _.assert(_.isString(literal.value) && /^[0-9\-.:+TZ]+$/.test(literal.value), 'fromXsdLiteral : invalid literal value');
        _.assert(_.isString(literal.datatype), 'fromXsdLiteral : invalid literal datatype');
        const match = /^(?:xsd?:|http:\/\/www\.w3\.org\/2001\/XMLSchema#)(\w+)$/.exec(literal.datatype);
        _.assert(match, 'fromXsdLiteral : invalid literal datatype');
        xsdValue = literal.value;
        xsdType  = match[1];
    }

    _.assert(xsdValue && xsdType, 'fromXsdLiteral : invalid xsd data');
    let result = null, now = new Date(), temp = {};

    switch (xsdType) {

        case 'time':
            // SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
            temp.match = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9](?:\.[0-9]+)?)(?:([+-])(1[0-2]|0[0-9]):([0-5][0-9])|(Z))?$/.exec(xsdValue);
            _.assert(temp.match, 'fromXsdLiteral : invalid xsd:time format');
            if (temp.match[4] || temp.match[7]) {
                temp.utc  = true;
                temp.YYYY = now.getUTCFullYear();
                temp.MM   = now.getUTCMonth();
                temp.DD   = now.getUTCDate();
            } else {
                temp.utc  = false;
                temp.YYYY = now.getFullYear();
                temp.MM   = now.getMonth();
                temp.DD   = now.getDate();
            }
            temp.hh = parseInt(temp.match[1]);
            temp.mm = parseInt(temp.match[2]);
            temp.ss = parseInt(temp.match[3]);
            temp.ms = 1000 * (parseFloat(temp.match[3]) - temp.ss);
            if (temp.match[4] === '+') {
                temp.hh += parseInt(temp.match[5]);
                temp.mm += parseInt(temp.match[6]);
            } else if (temp.match[4] === '-') {
                temp.hh -= parseInt(temp.match[5]);
                temp.mm -= parseInt(temp.match[6]);
            }
            if (temp.utc) {
                temp.utc  = Date.UTC(temp.YYYY, temp.MM, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
                temp.date = new Date(temp.utc);
            } else {
                temp.date = new Date(temp.YYYY, temp.MM, temp.DD, temp.hh, temp.mm, temp.ss, temp.ms);
            }
            result = new time.Instant(temp.date);
            break; // case 'time'

        default:
            _.assert(false, 'fromXsdLiteral : unknown type xsd:' + xsdType);

    } // switch

    return result;
}; // method.fromXsdLiteral

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
