const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

// IDEA toplevel class Time -> map years

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

        this._iso_weeks      = null;
        this._us_weeks       = null;
        this._months         = null;
        this._quarters       = null;
        this._halves         = null;
        this._meteor_seasons = null;
        _.hideProp(this, '_iso_weeks', '_us_weeks', '_months', '_quarters', '_halves', '_meteor_seasons');
    } // Year#constructor

    week(type, week) {
        switch (type) {
            case 'iso':
                return this.iso_week(week);
            case 'us':
                return this.us_week(week);
            default:
                throw new Error('Year#week : unknown type');
        }
    } // Year#week

    /**
     * @param {string} type
     * @returns {ISO_CalendarWeek|US_CalendarWeek}
     */
    weeks(type) {
        switch (type) {
            case 'iso':
                return this.iso_weeks;
            case 'us':
                return this.us_weeks;
            default:
                throw new Error('Year#weeks : unknown type');
        }
    } // Year#weeks

    /**
     * @param {number} week
     * @returns {ISO_CalendarWeek}
     */
    iso_week(week) {
        _.assert(_.isInteger(week), 'Year#iso_week : invalid week', TypeError);
        _.assert(week >= 0 && week < this.iso_weeks.length, 'Year#iso_week : week out of range');
        return this.iso_weeks[week];
    } // Year#iso_week

    /** @type {Array<ISO_CalendarWeek>} */
    get iso_weeks() {
        if (!this._iso_weeks) {
            const
                offset        = (this.properInterval.dateBeginning.getDay() + 6) % 7,
                beginningDays = 7 - offset,
                endDays       = (this.inDays - beginningDays) % 7 || 7,
                weeksCount    = (this.inDays - beginningDays - endDays) / 7 + (beginningDays < 4 ? 0 : 1) + (endDays < 4 ? 0 : 1),
                weeks         = new Array(weeksCount),
                iso_offset    = beginningDays < 4 ? beginningDays : beginningDays - 7;
            for (let i = 0, length = weeks.length; i < length; i++) {
                weeks[i] = new ISO_CalendarWeek(this, i, iso_offset);
            }
            this._iso_weeks = Object.freeze(weeks);
            _.lockProp(this, '_iso_weeks');
        }

        return this._iso_weeks;
    } // Year#iso_weeks

    /**
     * @param {number} week
     * @returns {US_CalendarWeek}
     */
    us_week(week) {
        _.assert(_.isInteger(week), 'Year#us_week : invalid week', TypeError);
        _.assert(week >= 0 && week < this.us_weeks.length, 'Year#us_week : week out of range');
        return this.us_weeks[week];
    } // Year#us_week

    /** @type {Array<US_CalendarWeek>} */
    get us_weeks() {
        if (!this._us_weeks) {
            const
                offset        = this.properInterval.dateBeginning.getDay(),
                beginningDays = 7 - offset,
                endDays       = (this.inDays - beginningDays) % 7 || 7,
                weeksCount    = 2 + (this.inDays - beginningDays - endDays) / 7,
                weeks         = new Array(weeksCount);
            for (let i = 0, length = weeks.length; i < length; i++) {
                weeks[i] = new US_CalendarWeek(this, i, offset);
            }
            this._us_weeks = Object.freeze(weeks);
            _.lockProp(this, '_us_weeks');
        }

        return this._us_weeks;
    } // Year#us_weeks

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

    season(type, season) {
        switch (type) {
            case 'meteor':
            case 'meteorological':
                return this.meteor_season(season);
            default:
                throw new Error('Year#seasons : unknown type');
        }
    } // Year#season

    seasons(type) {
        switch (type) {
            case 'meteor':
            case 'meteorological':
                return this.meteor_seasons;
            default:
                throw new Error('Year#seasons : unknown type');
        }
    } // Year#seasons

    /**
     * @param {number} season
     * @returns {MeteorologicalSeason}
     */
    meteor_season(season) {
        _.assert(_.isInteger(season), 'Year#season : invalid season', TypeError);
        _.assert(season >= 0 && season < this.meteor_seasons.length, 'Year#season : season out of range');
        return this.meteor_seasons[season];
    } // Year#meteor_season

    /** @type {Array<MeteorologicalSeason>} */
    get meteor_seasons() {
        if (!this._meteor_seasons) {
            const seasons = new Array(4);
            for (let i = 0; i < seasons.length; i++) {
                seasons[i] = new MeteorologicalSeason(this, i)
            }
            this._meteor_seasons = Object.freeze(seasons);
            _.lockProp(this, '_meteor_seasons');
        }

        return this._meteor_seasons;
    } // Year#meteor_seasons

} // Year

class MeteorologicalSeason {

    /**
     * @param {Year} year
     * @param {number} season
     * @see https://en.wikipedia.org/wiki/MeteorologicalSeason#Meteorological
     */
    constructor(year, season) {
        _.assert(year instanceof Year, 'MeteorologicalSeason#constructor : invalid year', TypeError);
        _.assert(_.isInteger(season) && season >= 0 && season < 4, 'MeteorologicalSeason#constructor : invalid season', TypeError);

        this['@type']     = 'time:MeteorologicalSeason';
        this.year         = year;
        this.season       = season;
        this.northernName = ['Spring', 'Summer', 'Autumn', 'Winter'][season];
        this.southernName = ['Autumn', 'Winter', 'Spring', 'Summer'][season];

        this.properInterval = new time.ProperInterval(
            new Date(year.year, 2 + 3 * season, 1),
            new Date(year.year, 5 + 3 * season, 1)
        );

        _.lockProp(this, '@type', 'year', 'season', 'seasonName', 'properInterval');
    } // MeteorologicalSeason#constructor

} // MeteorologicalSeason

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

class ISO_CalendarWeek {

    /**
     * @param {Year} year
     * @param {number} week
     * @param {number} offset
     */
    constructor(year, week, offset) {
        _.assert(year instanceof Year, 'ISO_CalendarWeek#constructor : invalid year', TypeError);
        _.assert(_.isInteger(week) && week >= 0 && week < 53, 'ISO_CalendarWeek#constructor : invalid week', TypeError);
        _.assert(_.isInteger(offset) && offset >= -3 && offset < 4, 'ISO_CalendarWeek#constructor : invalid offset', TypeError);

        this['@type']        = 'time:ISO_CalendarWeek';
        this.year            = year;
        this.week            = week;
        this.inDays          = 7;
        this.inSeconds       = this.inDays * C.dayInSeconds;
        this['xsd:duration'] = 'P' + this.inDays + 'D';

        const
            beginningDay = 7 * week + offset,
            endDay       = beginningDay + 6;

        _.assert(beginningDay >= -3 && endDay < year.inDays + 3, 'ISO_CalendarWeek#constructor : invalid week', TypeError);

        this.properInterval = new time.ProperInterval(
            new Date(year.year, 0, beginningDay + 1),
            new Date(year.year, 0, endDay + 2)
        );

        _.lockProp(this, '@type', 'year', 'week', 'inDays', 'inSeconds', 'xsd:duration', 'properInterval');

        this._days = null;
        _.hideProp(this, '_days');
    } // US_CalendarWeek#constructor

} // ISO_CalendarWeek

class US_CalendarWeek {

    /**
     * @param {Year} year
     * @param {number} week
     * @param {number} offset
     */
    constructor(year, week, offset) {
        _.assert(year instanceof Year, 'US_CalendarWeek#constructor : invalid year', TypeError);
        _.assert(_.isInteger(week) && week >= 0 && week < 54, 'US_CalendarWeek#constructor : invalid week', TypeError);
        _.assert(_.isInteger(offset) && offset >= 0 && offset < 7, 'US_CalendarWeek#constructor : invalid offset', TypeError);

        this['@type'] = 'time:US_CalendarWeek';
        this.year     = year;
        this.week     = week;

        const
            beginningDay = week === 0 ? 0 : 7 * week - offset,
            endDay       = week === 0 ? 6 - offset : Math.min(year.inDays - 1, beginningDay + 6);

        _.assert(beginningDay <= endDay, 'US_CalendarWeek#constructor : invalid week', TypeError);

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
    } // US_CalendarWeek#constructor

    /**
     * @param {number} day
     * @returns {Day}
     */
    day(day) {
        _.assert(_.isInteger(day), 'US_CalendarWeek#day : invalid day', TypeError);
        _.assert(day >= 0 && day < this.days.length, 'US_CalendarWeek#day : day out of range');
        return this.days[day];
    } // US_CalendarWeek#day

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
    } // US_CalendarWeek#days

} // US_CalendarWeek

class Day {

    /**
     * @param {Month} month
     * @param {number} day
     */
    constructor(month, day) {
        _.assert(month instanceof Month, 'Day#constructor : invalid month', TypeError);
        _.assert(_.isInteger(day) && day >= 0 && day < month.inDays, 'Day#constructor : invalid day', TypeError);

        this['@type']          = 'time:Day';
        this.year              = month.year;
        this.month             = month;
        this.day               = day;
        this['xsd:duration']   = 'P1D';
        this['xsd:gDay']       = '--' + (day + 1).toString().padStart(2, '0');
        const endOfMonth       = (day + 1 === month.inDays);
        this.properInterval    = new time.ProperInterval(
            new Date(month.year.year, month.month, day + 1),
            new Date(month.year.year + (month.month < 11 && !endOfMonth ? 0 : 1), (month.month + (endOfMonth ? 1 : 0)) % 12, endOfMonth ? 1 : day + 2)
        );
        const us_dayOfWeek     = this.properInterval.dateBeginning.getDay();
        this['time:dayOfWeek'] = time.us_dayOfWeekToTimeWeek[us_dayOfWeek];

        _.lockProp(this, '@type', 'year', 'month', 'day', 'xsd:duration', 'xsd:gDay', 'properInterval');
    } // Day#constructor

} // Day

module.exports = Year;
