const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

class Year {

    /**
     * @param {number} year
     */
    constructor(year) {
        _.assert(_.isInteger(year), 'Year#constructor : invalid year', TypeError);

        this['@type']        = 'time:Year';
        this.year            = year;
        this.isLeapYear      = _.isLeapYear(year);
        this.inDays          = this.isLeapYear ? C.leapYearInDays : C.nonLeapYearInDays;
        this.inSeconds       = this.isLeapYear ? C.leapYearInSeconds : C.nonLeapYearInSeconds;
        this['xsd:gYear']    = year.toString();
        this['xsd:duration'] = 'P1Y';
        this.properInterval  = new time.ProperInterval(
            new Date(year, 0, 1),
            new Date(year + 1, 0, 1)
        );

        _.lockProp(this, '@type', 'year', 'isLeapYear', 'inDays', 'inSeconds', 'xsd:gYear', 'xsd:duration', 'properInterval');

        this._weeks    = null;
        this._months   = null;
        this._quarters = null;
        this._halves   = null;
        this._seasons  = null;
        _.hideProp(this, '_weeks', '_months', '_quarters', '_halves', '_seasons');
    } // Year#constructor

    /**
     * @param {number} week
     * @returns {CalendarWeek}
     */
    week(week) {
        _.assert(_.isInteger(week), 'Year#week : invalid week', TypeError);
        _.assert(week >= 0 && week < this.weeks.length, 'Year#week : week out of range');
        return this.weeks[week];
    } // Year#week

    /** @type {Array<CalendarWeek>} */
    get weeks() {
        if (!this._weeks) {
            const
                // offset        = this.properInterval.dateBeginning.getDay(), // REM this offset calculates weeks from sunday to saturday
                offset        = (this.properInterval.dateBeginning.getDay() + 6) % 7, // REM this offset calculates weeks from monday to sunday
                beginningDays = 7 - offset,
                endDays       = (this.inDays - beginningDays) % 7 || 7,
                weeksCount    = 2 + (this.inDays - beginningDays - endDays) / 7,
                weeks         = new Array(weeksCount);
            for (let i = 0, length = weeks.length; i < length; i++) {
                weeks[i] = new CalendarWeek(this, i, offset);
            }
            this._weeks = Object.freeze(weeks);
            _.lockProp(this, '_weeks');
        }

        return this._weeks;
    } // Year#weeks

    /**
     * @param {number} month
     * @returns {Month}
     */
    month(month) {
        _.assert(_.isInteger(month), 'Year#month : invalid month', TypeError);
        _.assert(month >= 0 && month < this.months.length, 'Year#month : month out of range');
        return this.months[month];
    } // Year#month

    /** @type {Array<Month>} */
    get months() {
        if (!this._months) {
            const months = new Array(12);
            for (let i = 0, length = months.length; i < length; i++) {
                months[i] = new Month(this, i);
            } // for (i)
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // Year#months

    // TODO necessary?
    get months_BETA() {
        if (!this._months) {
            const months          = new Array(12);
            //months['xsd:gMonth']       = {};
            months['gMonth']      = {};
            //months['time:MonthOfYear'] = {};
            months['MonthOfYear'] = {};
            for (let i = 0, length = months.length; i < length; i++) {
                months[i] = new Month(this, i);
                //months[`_${i + 1}`] = months[i];
                //months['xsd:gMonth'][`${months[i]['xsd:gMonth']}`]        = months[i];
                months['gMonth'][`${months[i]['xsd:gMonth']}`]       = months[i];
                //months['time:MonthOfYear'][months[i]['time:MonthOfYear']] = months[i];
                months['MonthOfYear'][months[i]['time:MonthOfYear']] = months[i];
            } // for (i)
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // Year#months_BETA

    /**
     * @param {number} quarter
     * @returns {QuarterOfYear}
     */
    quarter(quarter) {
        _.assert(_.isInteger(quarter), 'Year#quarter : invalid quarter', TypeError);
        _.assert(quarter >= 0 && quarter < this.quarters.length, 'Year#quarter : quarter out of range');
        return this.quarters[quarter];
    } // Year#quarter

    /** @type {Array<QuarterOfYear>} */
    get quarters() {
        if (!this._quarters) {
            const quarters = new Array(4);
            for (let i = 0; i < quarters.length; i++) {
                quarters[i] = new QuarterOfYear(this, i);
            }
            this._quarters = Object.freeze(quarters);
            _.lockProp(this, '_quarters');
        }

        return this._quarters;
    } // Year#quarters

    /**
     * @param {number} half
     * @returns {HalfOfYear}
     */
    half(half) {
        _.assert(_.isInteger(half), 'Year#half : invalid half', TypeError);
        _.assert(half >= 0 && half < this.halves.length, 'Year#half : half out of range');
        return this.halves[half];
    } // Year#half

    /** @type {Array<HalfOfYear>} */
    get halves() {
        if (!this._halves) {
            const halves = new Array(2);
            for (let i = 0; i < halves.length; i++) {
                halves[i] = new HalfOfYear(this, i)
            }
            this._halves = Object.freeze(halves);
            _.lockProp(this, '_halves');
        }

        return this._halves;
    } // Year#halves

    /**
     * @param {number} season
     * @returns {Season}
     */
    season(season) {
        _.assert(_.isInteger(season), 'Year#season : invalid season', TypeError);
        _.assert(season >= 0 && season < this.seasons.length, 'Year#season : season out of range');
        return this.seasons[season];
    } // Year#season

    /** @type {Array<Season>} */
    get seasons() {
        if (!this._seasons) {
            const seasons = new Array(4);
            for (let i = 0; i < seasons.length; i++) {
                seasons[i] = new Season(this, i)
            }
            this._seasons = Object.freeze(seasons);
            _.lockProp(this, '_seasons');
        }

        return this._seasons;
    } // Year#seasons

} // Year

class Season {

    /**
     * @param {Year} year
     * @param {number} season
     * @see https://en.wikipedia.org/wiki/Season#Meteorological
     */
    constructor(year, season) {
        _.assert(year instanceof Year, 'Season#constructor : invalid year', TypeError);
        _.assert(_.isInteger(season) && season >= 0 && season < 4, 'Season#constructor : invalid season', TypeError);

        this['@type']     = 'time:Season';
        this.year         = year;
        this.season       = season;
        this.northernName = ['Spring', 'Summer', 'Autumn', 'Winter'][season];
        this.southernName = ['Autumn', 'Winter', 'Spring', 'Summer'][season];

        this.properInterval = new time.ProperInterval(
            new Date(year.year, 2 + 3 * season, 1),
            new Date(year.year, 5 + 3 * season, 1)
        );

        _.lockProp(this, '@type', 'year', 'season', 'seasonName', 'properInterval');
    } // Season#constructor

} // Season

class HalfOfYear {

    /**
     * @param {Year} year
     * @param {number} half
     */
    constructor(year, half) {
        _.assert(year instanceof Year, 'HalfOfYear#constructor : invalid year', TypeError);
        _.assert(_.isInteger(half) && half >= 0 && half < 2, 'HalfOfYear#constructor : invalid half', TypeError);

        this['@type']        = 'time:HalfOfYear';
        this.year            = year;
        this.half            = half;
        this['xsd:duration'] = 'P6M';
        this.properInterval  = new time.ProperInterval(
            new Date(year.year, 6 * half, 1),
            new Date(year.year + (half < 1 ? 0 : 1), 6 * (half + 1) % 12, 1)
        );

        _.lockProp(this, '@type', 'year', 'half', 'xsd:duration', 'properInterval');

        this._months   = null;
        this._quarters = null;
        _.hideProp(this, '_months', '_quarters');
    } // HalfOfYear#constructor

    // TODO necessary?
    get which() {
        return this.half;
    } // HalfOfYear#which

    // TODO necessary?
    get ofYear() {
        return this.year;
    } // HalfOfYear#ofYear

    /**
     * @param {number} month
     * @returns {Month}
     */
    month(month) {
        _.assert(_.isInteger(month), 'HalfOfYear#month : invalid month', TypeError);
        _.assert(month >= 0 && month < this.months.length, 'HalfOfYear#month : month out of range');
        return this.months[month];
    } // HalfOfYear#month

    /** @type {Array<Month>} */
    get months() {
        if (!this._months) {
            const months = this.year.months.slice(6 * this.half, 6 * (this.half + 1));
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // HalfOfYear#months

    /**
     * @param {number} quarter
     * @returns {QuarterOfYear}
     */
    quarter(quarter) {
        _.assert(_.isInteger(quarter), 'HalfOfYear#quarter : invalid quarter', TypeError);
        _.assert(quarter >= 0 && quarter < this.quarters.length, 'HalfOfYear#quarter : quarter out of range');
        return this.quarters[quarter];
    } // HalfOfYear#quarter

    /** @type {Array<QuarterOfYear>} */
    get quarters() {
        if (!this._quarters) {
            const quarters = this.year.quarters.slice(2 * this.half, 2 * (this.half + 1));
            this._quarters = Object.freeze(quarters);
            _.lockProp(this, '_quarters');
        }

        return this._quarters;
    } // HalfOfYear#quarters

} // HalfOfYear

class QuarterOfYear {

    /**
     * @param {Year} year
     * @param {number} quarter
     */
    constructor(year, quarter) {
        _.assert(year instanceof Year, 'QuarterOfYear#constructor : invalid year', TypeError);
        _.assert(_.isInteger(quarter) && quarter >= 0 && quarter < 4, 'QuarterOfYear#constructor : invalid quarter', TypeError);

        this['@type']        = 'time:QuarterOfYear';
        this.year            = year;
        this.quarter         = quarter;
        this['xsd:duration'] = 'P3M';
        this.properInterval  = new time.ProperInterval(
            new Date(year.year, 3 * quarter, 1),
            new Date(year.year + (quarter < 3 ? 0 : 1), 3 * (quarter + 1) % 12, 1)
        );

        _.lockProp(this, '@type', 'year', 'quarter', 'xsd:duration', 'properInterval');

        this._months = null;
        _.hideProp(this, '_months');
    } // QuarterOfYear#constructor

    /**
     * @param {number} month
     * @returns {Month}
     */
    month(month) {
        _.assert(_.isInteger(month), 'QuarterOfYear#month : invalid month', TypeError);
        _.assert(month >= 0 && month < this.months.length, 'QuarterOfYear#month : month out of range');
        return this.months[month];
    } // QuarterOfYear#month

    /** @type {Array<Month>} */
    get months() {
        if (!this._months) {
            const months = this.year.months.slice(3 * this.quarter, 3 * (this.quarter + 1));
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // QuarterOfYear#months

} // QuarterOfYear

class Month {

    /**
     * @param {Year} year
     * @param {number} month
     */
    constructor(year, month) {
        _.assert(year instanceof Year, 'Month#constructor : invalid year', TypeError);
        _.assert(_.isInteger(month) && month >= 0 && month < 12, 'Month#constructor : invalid month', TypeError);

        this['@type']            = 'time:Month';
        this.year                = year;
        this.month               = month;
        this.inDays              = [31, year.isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        this.inSeconds           = this.inDays * C.dayInSeconds;
        this['xsd:duration']     = 'P' + this.inDays + 'D';
        this['xsd:gMonth']       = '--' + (month + 1).toString().padStart(2, '0');
        this['time:MonthOfYear'] = time.XsdgMonthGregorianMonth[this['xsd:gMonth']];

        this.properInterval = new time.ProperInterval(
            new Date(year.year, month, 1),
            new Date(year.year + (month < 11 ? 0 : 1), (month + 1) % 12, 1)
        );

        _.lockProp(this, '@type', 'year', 'month', 'inDays', 'inSeconds', 'xsd:duration', 'xsd:gMonth', 'properInterval');

        this._days = null;
        _.hideProp(this, '_days');
    } // Month#constructor

    /**
     * @param {number} day
     * @returns {Day}
     */
    day(day) {
        _.assert(_.isInteger(day), 'Month#day : invalid day', TypeError);
        _.assert(day >= 0 && day < this.days.length, 'Month#day : day out of range');
        return this.days[day];
    } // Month#days

    /** @type {Array<Day>} */
    get days() {
        if (!this._days) {
            const days = new Array(this.inDays);
            for (let i = 0; i < days.length; i++) {
                days[i] = new Day(this, i);
            }
            this._days = Object.freeze(days);
            _.lockProp(this, '_days');
        }

        return this._days;
    } // Month#days

} // Month

class CalendarWeek {

    /**
     * @param {Year} year
     * @param {number} week
     * @param {number} offset
     */
    constructor(year, week, offset) {
        _.assert(year instanceof Year, 'CalendarWeek#constructor : invalid year', TypeError);
        _.assert(_.isInteger(week) && week >= 0 && week < 54, 'CalendarWeek#constructor : invalid week', TypeError);
        _.assert(_.isInteger(offset) && offset >= 0 && offset < 7, 'CalendarWeek#constructor : invalid offset', TypeError);

        this['@type'] = 'time:CalendarWeek';
        this.year     = year;
        this.week     = week;

        const
            beginningDay = week === 0 ? 0 : 7 * week - offset,
            endDay       = week === 0 ? 6 - offset : Math.min(year.inDays - 1, beginningDay + 6);

        _.assert(beginningDay <= endDay, 'CalendarWeek#constructor : invalid week', TypeError);

        this.inDays          = endDay + 1 - beginningDay;
        this.inSeconds       = this.inDays * C.dayInSeconds;
        this['xsd:duration'] = 'P' + this.inDays + 'D';

        this.properInterval = new time.ProperInterval(
            new Date(year.year, 0, beginningDay + 1),
            new Date(year.year, 0, endDay + 2)
        );

        _.lockProp(this, '@type', 'year', 'week', 'inDays', 'inSeconds', 'xsd:duration', 'properInterval');

        this._days = null;
        _.hideProp(this, '_days');
    } // CalendarWeek#constructor

    /**
     * @param {number} day
     * @returns {Day}
     */
    day(day) {
        _.assert(_.isInteger(day), 'CalendarWeek#day : invalid day', TypeError);
        _.assert(day >= 0 && day < this.days.length, 'CalendarWeek#day : day out of range');
        return this.days[day];
    } // CalendarWeek#day

    /** @type {Array<Day>} */
    get days() {
        if (!this._days) {
            const days = new Array(this.inDays);
            for (let i = 0; i < days.length; i++) {
                const date = new Date(this.properInterval.dateBeginning.valueOf() + i * C.dayInMilliseconds);
                days[i]    = this.year.months[date.getMonth()].days[date.getDate() - 1];
            }
            this._days = Object.freeze(days);
            _.lockProp(this, '_days');
        }

        return this._days;
    } // CalendarWeek#days

} // CalendarWeek

class Day {

    /**
     * @param {Month} month
     * @param {number} day
     */
    constructor(month, day) {
        _.assert(month instanceof Month, 'Day#constructor : invalid month', TypeError);
        _.assert(_.isInteger(day) && day >= 0 && day < month.inDays, 'Day#constructor : invalid day', TypeError);

        this['@type']        = 'time:Day';
        this.year            = month.year;
        this.month           = month;
        this.day             = day;
        this['xsd:duration'] = 'P1D';
        this['xsd:gDay']     = '--' + (day + 1).toString().padStart(2, '0');
        const endOfMonth     = (day + 1 === month.inDays);
        this.properInterval  = new time.ProperInterval(
            new Date(month.year.year, month.month, day + 1),
            new Date(month.year.year + (month.month < 11 && !endOfMonth ? 0 : 1), (month.month + (endOfMonth ? 1 : 0)) % 12, endOfMonth ? 1 : day + 2)
        );

        _.lockProp(this, '@type', 'year', 'month', 'day', 'xsd:duration', 'xsd:gDay', 'properInterval');
    } // Day#constructor

} // Day

module.exports = Year;
