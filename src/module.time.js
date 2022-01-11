const
    time           = exports,
    _              = require('./module.time.util.js'),
    C              = require('./module.time.constants.js'),
    op             = require('./module.time.operators.js'),
    method         = require('./module.time.methods.js'),
    Time           = require('./module.time.time.js'),
    Instant        = require('./module.time.Instant.js'),
    ProperInterval = require('./module.time.ProperInterval.js'),
    Year           = require('./module.time.Year.js');

time.Time           = Time;
time.Instant        = Instant;
time.ProperInterval = ProperInterval;
time.Year           = Year;

time.now            = method.now;
time.from           = method.from;
time.fromXsdLiteral = method.fromXsdLiteral;
time.today          = method.today;
time.tomorrow       = method.tomorrow;
time.yesterday      = method.yesterday;
time.stamp          = method.stamp;

time.PREFIX = "time";
time.URI    = "http://www.w3.org/2006/time#";

time.XSD_PREFIX = "xsd";
time.XSD_URI    = "http://www.w3.org/2001/XMLSchema#";

time.GREGORIAN_PREFIX        = "greg";
time.GREGORIAN_URI           = "https://www.w3.org/ns/time/gregorian#";
time.XsdgMonthGregorianMonth = {
    "--01": "greg:January",
    "--02": "greg:February",
    "--03": "greg:March",
    "--04": "greg:April",
    "--05": "greg:May",
    "--06": "greg:June",
    "--07": "greg:July",
    "--08": "greg:August",
    "--09": "greg:September",
    "--10": "greg:October",
    "--11": "greg:November",
    "--12": "greg:December"
};
Object.freeze(time.XsdgMonthGregorianMonth);

time.dayOfWeekToTimeWeek = {
    0: "time:Sunday",
    1: "time:Monday",
    2: "time:Tuesday",
    3: "time:Wednesday",
    4: "time:Thursday",
    5: "time:Friday",
    6: "time:Saturday"

};
Object.freeze(time.dayOfWeekToTimeWeek);

//TODO: maybe (?!?) wrong...
//time.xsdgDayToTimeWeek = {
//    '---01': "time:Monday",
//    '---02': "time:Tuesday",
//    '---03': "time:Wednesday",
//    '---04': "time:Thursday",
//    '---05': "time:Friday",
//    '---06': "time:Saturday",
//    '---07': "time:Sunday"
//};
//Object.freeze(time.xsdgDayToTimeWeek);

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
