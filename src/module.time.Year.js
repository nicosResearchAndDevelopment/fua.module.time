const
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

class Year {

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

        this._months   = null;
        this._quarters = null;
        this._halves   = null;
        _.hideProp(this, '_months', '_quarters', '_halves');
    } // Year#constructor

    get months() {
        if (!this._months) {
            const months = new Array(12);
            for (let i = 0; i < months.length; i++) {
                months[i] = new Month(this, i);
            }
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // Year#months

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

} // Year

class HalfOfYear {

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

    get months() {
        if (!this._months) {
            const months = this.year.months.slice(6 * this.half, 6 * (this.half + 1));
            this._months = Object.freeze(months);
            _.lockProp(this, '_months');
        }

        return this._months;
    } // HalfOfYear#months

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

    constructor(year, month) {
        _.assert(year instanceof Year, 'Month#constructor : invalid year', TypeError);
        _.assert(_.isInteger(month) && month >= 0 && month < 12, 'Month#constructor : invalid month', TypeError);

        this['@type']        = 'time:Month';
        this.year            = year;
        this.month           = month;
        this.inDays          = [31, year.isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        this.inSeconds       = this.inDays * C.dayInSeconds;
        this['xsd:duration'] = 'P' + this.inDays + 'D';
        this['xsd:gMonth']   = '--' + (month + 1).toString().padStart(2, '0');
        this.properInterval  = new time.ProperInterval(
            new Date(year.year, month, 1),
            new Date(year.year + (month < 11 ? 0 : 1), (month + 1) % 12, 1)
        );

        _.lockProp(this, '@type', 'year', 'month', 'inDays', 'inSeconds', 'xsd:duration', 'xsd:gMonth', 'properInterval');

        this._days = null;
        _.hideProp(this, '_days');
    } // Month#constructor

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

class Day {

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