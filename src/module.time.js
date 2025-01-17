const
    time           = exports,
    _              = require('./module.time.util.js'),
    C              = require('./module.time.constants.js'),
    op             = require('./module.time.operators.js'),
    method         = require('./module.time.methods.js'),
    Time           = require('./module.time.time.js'),
    Instant        = require('./module.time.Instant.js'),
    ProperInterval = require('./module.time.ProperInterval.js'),
    //Year           = require('./module.time.Year.js')
    {
        Year, Century, Millennium
    }              = require('./module.time.Year.js')
;

time.Time           = Time;
time.Instant        = Instant;
time.ProperInterval = ProperInterval;
time.Year           = Year;
time.Century        = Century;
time.Millennium     = Millennium;

time.from           = method.from;
time.fromXsdLiteral = method.fromXsdLiteral;
time.fromPeriod     = method.fromPeriod

time.now       = method.now;
time.today     = method.today;
time.tomorrow  = method.tomorrow;
time.yesterday = method.yesterday;
time.stamp     = method.stamp;

time.PREFIX = "time";
time.URI    = "http://www.w3.org/2006/time#";

time.XSD_PREFIX = "xsd";
time.XSD_URI    = "http://www.w3.org/2001/XMLSchema#";

time.GREGORIAN_PREFIX        = "greg";
time.GREGORIAN_URI           = "https://www.w3.org/ns/time/gregorian#";
time.XsdgMonthGregorianMonth = Object.freeze({
    '--01': 'greg:January',
    '--02': 'greg:February',
    '--03': 'greg:March',
    '--04': 'greg:April',
    '--05': 'greg:May',
    '--06': 'greg:June',
    '--07': 'greg:July',
    '--08': 'greg:August',
    '--09': 'greg:September',
    '--10': 'greg:October',
    '--11': 'greg:November',
    '--12': 'greg:December'
});

time.iso_dayOfWeekToTimeWeek = Object.freeze([
    'time:Monday',
    'time:Tuesday',
    'time:Wednesday',
    'time:Thursday',
    'time:Friday',
    'time:Saturday',
    'time:Sunday'
]);

time.us_dayOfWeekToTimeWeek = Object.freeze([
    time.iso_dayOfWeekToTimeWeek[6],
    ...time.iso_dayOfWeekToTimeWeek.slice(0, 6)
]);

time.Before       = op.Before;
time.After        = op.After;
time.Meets        = op.Meets;
time.MetBy        = op.MetBy;
time.Overlaps     = op.Overlaps;
time.OverlappedBy = op.OverlappedBy;
time.Starts       = op.Starts;
time.StartedBy    = op.StartedBy;
time.During       = op.During;
time.Contains     = op.Contains;
time.Finishes     = op.Finishes;
time.FinishedBy   = op.FinishedBy;
time.Equals       = op.Equals;
time.In           = op.In;
time.Disjoint     = op.Disjoint;

time.$minuteInSeconds      = C.minuteInSeconds;
time.$hourInSeconds        = C.hourInSeconds;
time.$dayInSeconds         = C.dayInSeconds;
time.$minuteInMilliseconds = C.minuteInMilliseconds;
time.$hourInMilliseconds   = C.hourInMilliseconds;
time.$dayInMilliseconds    = C.dayInMilliseconds;
time.$durationZeroPeriod   = C.durationZeroPeriod;

time.$buildDate                        = _.buildDate;
time.$getGMonthDayFromDateTime         = _.getGMonthDayFromDateTime;
time.$getTemporalEntity                = _.getTemporalEntity;
time.$getNumberOfLeapDaysFromInterval  = _.getNumberOfLeapDaysFromInterval;
time.$xsdDuration2durationArray        = _.xsdDuration2durationArray;
time.$durationArray2xsdDuration        = _.durationArray2xsdDuration;
time.$durationFromInstants2xsdDuration = _.durationFromInstants2xsdDuration;
time.$isLeapYear                       = _.isLeapYear;
