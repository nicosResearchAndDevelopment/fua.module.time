const
    _      = require('./util.js'),
    time   = exports,
    decide = require('./module.time.decide');

time.Instant        = require('./module.time.Instant.js');
time.ProperInterval = require('./module.time.ProperInterval.js');

time.Before = decide.Before;
// TODO

time.$buildDate = _.buildDate;
// TODO

//Object.defineProperties(time, {
//    '$minuteInSeconds':       {enumerable: true, value: minuteInSeconds},
//    '$hourInSeconds':         {enumerable: true, value: hourInSeconds},
//    '$dayInSeconds':          {enumerable: true, value: dayInSeconds},
//    '$minuteInMilliseconds':  {enumerable: true, value: minuteInMilliseconds},
//    '$hourInMilliseconds':    {enumerable: true, value: hourInMilliseconds},
//    '$dayInMilliseconds':     {enumerable: true, value: dayInMilliseconds},
//    '$buildTemporalEntities': {enumerable: true, value: buildTemporalEntities},
//    '$buildDate':             {enumerable: true, value: buildDate},
//    '$getNumberOfLeapDaysFromInterval':  {enumerable: true, value: getNumberOfLeapDaysFromInterval},
//    '$durationZeroPeriod':               {enumerable: true, value: durationZeroPeriod},
//    '$xsdDuration2durationArray':        {enumerable: true, value: xsdDuration2durationArray},
//    '$durationArray2xsdDuration':        {enumerable: true, value: durationArray2xsdDuration},
//    '$durationFromInstants2xsdDuration': {enumerable: true, value: durationFromInstants2xsdDuration},
//    '$getGMonthDayFromDateTime': {enumerable: true, value: getGMonthDayFromDateTime},
//    '$getTemporalEntity':        {enumerable: true, value: getTemporalEntity},
//    'Instant': {enumerable: true, value: Instant},
//    'ProperInterval': {enumerable: true, value: ProperInterval},
//    'Before':       {enumerable: false, value: Before},
//    'After':        {enumerable: false, value: After},
//    'Meets':        {enumerable: false, value: Meets},
//    'MetBy':        {enumerable: false, value: MetBy},
//    'Overlaps':     {enumerable: false, value: Overlaps},
//    'OverlappedBy': {enumerable: false, value: OverlappedBy},
//    'Starts':       {enumerable: false, value: Starts},
//    'StartedBy':    {enumerable: false, value: StartedBy},
//    'During':       {enumerable: false, value: During},
//    'Contains':     {enumerable: false, value: Contains},
//    'Finishes':     {enumerable: false, value: Finishes},
//    'FinishedBy':   {enumerable: false, value: FinishedBy},
//    'Equals':       {enumerable: false, value: Equals},
//    'In':           {enumerable: false, value: In},
//    'Disjoint':     {enumerable: false, value: Disjoint},
//    'now':         {enumerable: false, value: now},
//    'stamp':       {enumerable: false, value: stamp},
//    'Year':        {enumerable: true, value: Year},
//    '$isLeapYear': {enumerable: true, value: isLeapYear},
//    'trs': {
//        'set': (trs) => {
//            if ((trs['@type'] === TRS) && !_trs.get(trs['@id']))
//                _trs.set(trs['@id'], trs);
//        } // set
//    }
//});