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