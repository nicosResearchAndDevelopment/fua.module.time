const

    app_name = "module.time : test",
    // ---------------------------------------
    //crypto   = require('crypto'),
    //// ---------------------------------------
    //uuid     = require(`../../core.uuid/src/core.uuid.js`)({
    //    'mode':      "local",
    //    'parameter': {'crypto': crypto}
    //}),
    // ---------------------------------------
    //f_time   = require(`../src/module.time.js`)({
    //    'namespace': "time" // fua-t
    //})
    f_time   = require(`../src/module.time.js`)
; // const

// REM: pit = point in time

let
    probe,
    pit,
    pit_yesterday,
    now, // pit
    stamp,
    pit_tomorrow,
    properInterval,
    xsdDuration
;

//region fn
function correct(wanted, given) {
    //if (wanted !== given)
    //    //throw new Error();
    //    return false
    //return true;
    return (wanted === given)
}

//endregion fn

now = f_time['now']();

const
    leapYearInteger    = 2020,
    nonLeapYearInteger = 2021,
    currentYearInteger = now['date']['getUTCFullYear']()
;

// REM : something like (now - 24 hours)
pit_yesterday = new f_time['Instant'](new Date(now['date'].getTime() - f_time['$dayInMilliseconds']));
// REM : something like (now + 24 hours)
pit_tomorrow  = new f_time['Instant'](new Date(now['date'].getTime() + f_time['$dayInMilliseconds']));

//REM: get an instant from an instant... something like a copy ;-)
pit = new f_time['Instant'](now);

// now
probe = now['$time']();
probe = now['$serialize']();

//stamp
stamp = f_time['stamp'];
probe = stamp(); // xsd:dateTimestamp
probe = stamp(undefined, "time:dateTime");
probe = stamp['inXsdDateTimestamp']();

probe = stamp['inMilliseconds']();
probe = stamp['inMilliseconds'](undefined, /** floor */ true);
probe = stamp['inSeconds']();
probe = stamp['inSeconds'](undefined, /** floor */ true);
//probe = stamp['inMinutes']();
probe = stamp['inMinutes'](undefined, /** floor */ true);
probe = stamp['inHours']();
probe = stamp['inHours'](undefined, /** floor */ true);
probe = stamp['inDays']();
probe = stamp['inDays'](undefined, /** floor */ true);

probe = stamp['inTimeDatetimeDescription'](undefined);

probe = null;

probe = f_time['$xsdDuration2durationArray']("P0Y");
probe = f_time['$durationArray2xsdDuration'](probe);
probe = f_time['$durationFromInstants2xsdDuration'](now, now);
probe = f_time['$durationFromInstants2xsdDuration'](now, pit_tomorrow);

probe = f_time['$getGMonthDayFromDateTime'](now, /** default */ "xsd:gMonthDay");
probe = f_time['$getGMonthDayFromDateTime'](now, "gMonthDayArray");

//properInterval = new f_time['ProperInterval'](pit_yesterday, pit_tomorrow); // REM: timespan of two day, so 48 hours, 172800.0 seconds

const
    year1962                  = new f_time['Year'](1962),
    leapYear                  = new f_time['Year'](leapYearInteger),
    leapYearProperInterval    = leapYear['properInterval'],
    nonLeapYear               = new f_time['Year'](nonLeapYearInteger),
    nonLeapYearProperInterval = nonLeapYear['properInterval'],
    //
    currentYear               = new f_time['Year'](currentYearInteger),
    currentYearProperInterval = currentYear['properInterval'],
    lastYear                  = new f_time['Year']((currentYearInteger - 1)),
    lastYearProperInterval    = lastYear['properInterval'],
    nextYear                  = new f_time['Year']((currentYearInteger + 1)),
    nextYearProperInterval    = nextYear['properInterval']
;

probe = f_time['$isLeapYear'](leapYearInteger);     // true // time.test
probe = f_time['$isLeapYear'](leapYearInteger + 1); // false
probe = f_time['$isLeapYear'](leapYearInteger + 2); // false
probe = f_time['$isLeapYear'](leapYearInteger + 3); // false
probe = f_time['$isLeapYear'](leapYearInteger + 4); // true

probe = f_time['$getNumberOfLeapDaysFromInterval'](nonLeapYearProperInterval);

xsdDuration = leapYearProperInterval['xsd:duration'];    // P366D
xsdDuration = nonLeapYearProperInterval['xsd:duration']; // P365D
probe       = f_time['$getNumberOfLeapDaysFromInterval'](leapYearProperInterval);

properInterval = new f_time['ProperInterval'](
    leapYearProperInterval['dateBeginning'],
    new f_time['Year'](leapYearInteger + 5)['properInterval']['dateBeginning']
);
xsdDuration    = properInterval['xsd:duration']; // P5Y

properInterval = new f_time['ProperInterval'](
    leapYearProperInterval['dateBeginning'],
    new f_time['Year'](leapYearInteger + 8)['properInterval']['dateEnd']
);
xsdDuration    = properInterval['xsd:duration']; // P9Y

properInterval = new f_time['ProperInterval'](
    leapYearProperInterval['dateBeginning'],
    new f_time['Year'](leapYearInteger + 12)['properInterval']['dateEnd']
);
xsdDuration    = properInterval['xsd:duration']; // P13Y

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-01-01`,
    `${leapYearInteger}-01-02`
);
xsdDuration    = properInterval['xsd:duration']; // P1D

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-01-01`,
    `${leapYearInteger}-01-02T00:00:00.042Z`
);
xsdDuration    = properInterval['xsd:duration']; // P1DT0.042S

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-01-01T00:00:00.041Z`,
    `${leapYearInteger}-01-01T00:00:00.042Z`
);
xsdDuration    = properInterval['xsd:duration']; // PT0.001S

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-01-01`,
    `${leapYearInteger}-02-01`
);
xsdDuration    = properInterval['xsd:duration']; // P31D

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-02-01`,
    `${leapYearInteger}-03-01` // !!!!!!!!!!!!!!!!!! 30
);
xsdDuration    = properInterval['xsd:duration']; // P29D

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-02-01`,
    `${leapYearInteger}-03-02`
);
xsdDuration    = properInterval['xsd:duration']; // P30D

properInterval = new f_time['ProperInterval'](
    `${leapYearInteger}-02-01`,
    `${leapYearInteger}-03-03`
);
xsdDuration    = properInterval['xsd:duration']; // P31D

probe = new f_time['Year']((currentYearInteger + 2));
probe = new f_time['Year']((currentYearInteger + 3));
probe = new f_time['Year']((currentYearInteger + 4));
probe = new f_time['Year']((currentYearInteger + 5));

probe = currentYear['inSeconds'];

//region Months TODO
probe = currentYear.months;
probe = currentYear.months[0]['inSeconds']
//probe = currentYear.months[0]['label']("en"); // january
//endregion Months

//region Quarters (of a year)
// TODO: ERROR: 1/years/2020/q4/ >>> P92DT1H
probe = currentYear.quarters;
probe = probe[0]['quarter'];
//endregion Quarters (of a year)

//region HalfYear
//endregion HalfYear

//region Days
//probe = currentYear.months;
//probe = currentYear.months[0].days;
//probe = currentYear.months[11].days;
//endregion Days

console.log(`${app_name} : f_time.Before(${pit_yesterday['date']['toISOString']()}, ${now['date']['toISOString']()}) : ${correct(true, f_time.Before(pit_yesterday, now))}`);

//console.log(`${app_name} : uuid : ${uuid()}`);

throw new Error();