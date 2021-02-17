const
    time           = exports,
    _              = require('./module.time.util.js'),
    C              = require('./module.time.constants.js'),
    op             = require('./module.time.operators.js'),
    method         = require('./module.time.methods.js'),
    Instant        = require('./module.time.Instant.js'),
    ProperInterval = require('./module.time.ProperInterval.js'),
    Year           = require('./module.time.Year.js');

time.Instant        = Instant;
time.ProperInterval = ProperInterval;
time.Year           = Year;

time.now   = method.now;
time.stamp = method.stamp;

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