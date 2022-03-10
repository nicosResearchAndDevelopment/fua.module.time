const C = exports;

C.trsUnixTime          = 'http://dbpedia.org/resource/Unix_time';
C.trsGregorianTime     = 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian';
C.durationZero         = 0;
C.durationZeroPeriod   = 'P0Y';
C.tolerance            = Number.EPSILON;
C.firstDayOfWeekMonday = true;

C.secondInMilliseconds           = 1000;
C.millisecondInSeconds           = 1 / C.secondInMilliseconds;
C.minuteInSeconds                = 60;
C.minuteInMilliseconds           = C.minuteInSeconds * C.secondInMilliseconds;
C.secondInMinutes                = 1 / C.minuteInSeconds;
C.hourInMinutes                  = 60;
C.hourInSeconds                  = C.hourInMinutes * C.minuteInSeconds;
C.hourInMilliseconds             = C.hourInSeconds * C.secondInMilliseconds;
C.secondInHours                  = 1 / C.hourInSeconds;
C.dayInHours                     = 24;
C.dayInMinutes                   = C.dayInHours * C.hourInMinutes;
C.dayInSeconds                   = C.dayInMinutes * C.minuteInSeconds;
C.secondInDays                   = 1 / C.dayInSeconds;
C.dayInMilliseconds              = C.dayInSeconds * C.secondInMilliseconds;
C.weekInDays                     = 7;
C.weekInSeconds                  = C.weekInDays * C.dayInSeconds;
C.weekInMinutes                  = C.weekInDays * C.dayInMinutes;
C.weekInHours                    = C.weekInDays * C.dayInHours;
C.weekInMilliseconds             = C.weekInSeconds * C.secondInMilliseconds;
C.month28inSeconds               = 28 * C.dayInSeconds;
C.month28inMilliseconds          = C.month28inSeconds * C.secondInMilliseconds;
C.month29inSeconds               = 29 * C.dayInSeconds;
C.month29inMilliseconds          = C.month29inSeconds * C.secondInMilliseconds;
C.month30inSeconds               = 30 * C.dayInSeconds;
C.month30inMilliseconds          = C.month30inSeconds * C.secondInMilliseconds;
C.month31inSeconds               = 31 * C.dayInSeconds;
C.month31inMilliseconds          = C.month31inSeconds * C.secondInMilliseconds;
C.nonLeapYearInDays              = 365;
C.nonLeapYearInSeconds           = C.nonLeapYearInDays * C.dayInSeconds;
C.nonLeapYearInMilliseconds      = C.nonLeapYearInDays * C.dayInMilliseconds;
C.monthsWithoutFebInSeconds      = 7 * C.month31inSeconds + 4 * C.month30inSeconds;
C.monthsWithoutFebInMilliseconds = C.monthsWithoutFebInSeconds * C.secondInMilliseconds;
C.leapYearInDays                 = 366;
C.leapYearInSeconds              = C.leapYearInDays * C.dayInSeconds;
C.leapYearInMilliseconds         = C.leapYearInDays * C.dayInMilliseconds;

Object.freeze(C);
