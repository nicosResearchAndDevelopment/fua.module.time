const
    _         = require('./module.time.util.js'),
    C         = require('./module.time.constants.js'),
    time      = require('./module.time.js'),
    _timeline = Object.create(null, {
        /** @type {Map<string, WeakRef<Object>>} */
        _entities: {
            enumerable: false,
            value:      new Map()
        },
        /**
         * @param {string} id
         * @returns {Object | null}
         */
        get: {
            enumerable: false,
            value:      function (id) {
                _.assert(_.isString(id), 'expected id to be a string');
                const weakRef = this._entities.get(id);
                if (!weakRef) return null;
                const entity = weakRef.deref();
                if (entity) return entity;
                this._entities.delete(id);
                return null;
            }
        },
        /**
         * @param {string} id
         * @param {Object} entity
         * @returns {Object}
         */
        set: {
            enumerable: false,
            value:      function (id, entity) {
                _.assert(_.isString(id), 'expected id to be a string');
                _.assert(!this._entities.has(id), 'expected id to be unique');
                _.assert(entity instanceof Object, 'expected entity to be an Object');
                const weakRef = new WeakRef(entity);
                this._entities.set(id, weakRef);
                return entity;
            }
        },
        /**
         * @param {string} id
         * @returns {Object | null}
         */
        remove: {
            enumerable: false,
            value:      function (id) {
                _.assert(_.isString(id), 'expected id to be a string');
                const weakRef = this._entities.get(id);
                if (!weakRef) return null;
                const entity = weakRef.deref();
                this._entities.delete(id);
                return entity || null;
            }
        }
    });

class Year {

    constructor(year) {
        if (year instanceof Year) return year;
        _.assert(_.isSafeInteger(year), 'expected year to be an integer');

        const id = `${year}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id        = id;
        this.year      = year;
        this.beginning = new Date(year, 0);
        this.end       = new Date(year + 1, 0);
        this._months   = new Array(12);

        _.hideProp(this, '_months');
        _.lockProp(this, 'id', 'year', 'beginning', 'end', '_months');
        _timeline.set(id, this);
    } // Year#constructor

    month(month) {
        _.assert(_.isSafeInteger(month), 'expected month to be an integer');
        if (month < 0 || month >= this._months.length) return null;
        return this._months[month] || (this._months[month] = new Month(this, month));
    } // Year#month

} // Year

class Month {

    constructor(year, month) {
        year = new Year(year);
        if (month instanceof Month && month.year === year) return month;
        _.assert(_.isSafeInteger(month) && month >= 0 && month <= 11, 'expected month to be an integer from 0 to 11');

        const id = `${year.id}-${month}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id        = id;
        this.year      = year;
        this.month     = month;
        this.beginning = new Date(year.year, month);
        this.end       = new Date(year.year, month + 1);
        this._days     = new Array(new Date(year.year, month + 1, 0).getDate());

        _.hideProp(this, '_days');
        _.lockProp(this, 'id', 'year', 'month', 'beginning', 'end', '_days');
        _timeline.set(id, this);
    } // Month#constructor

    day(day) {
        _.assert(_.isSafeInteger(day), 'expected day to be an integer');
        if (day < 0 || day >= this._days.length) return null;
        return this._days[day] || (this._days[day] = new Day(this.year, this, day));
    } // Month#day

} // Month

class Day {

    constructor(year, month, day) {
        year  = new Year(year);
        month = new Month(year, month);
        if (day instanceof Day && day.month === month) return day;
        _.assert(_.isSafeInteger(day) && day >= 0 && day <= 30, 'expected day to be an integer from 0 to 30');

        const id = `${month.id}-${day}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id        = id;
        this.year      = year;
        this.month     = month;
        this.day       = day;
        this.beginning = new Date(year.year, month.month, day + 1);
        this.end       = new Date(year.year, month.month, day + 2);

        _.lockProp(this, 'id', 'year', 'month', 'day', 'beginning', 'end');
        _timeline.set(id, this);
    } // Day#constructor

} // Day

exports.Year  = Year;
exports.Month = Month;
exports.Day   = Day;

//region >> TEST <<

const
    day_2022_2_20_a = new Day(2022, 2, 20),
    year_2022       = new Year(2022),
    day_2022_2_20_b = new Day(year_2022, 2, 20),
    month_2022_2_a  = year_2022.month(2),
    month_2022_2_b  = new Month(year_2022, 2);

console.log(day_2022_2_20_a === day_2022_2_20_b);
console.log(month_2022_2_a === month_2022_2_b);
console.log(day_2022_2_20_a.year === year_2022);
console.log(month_2022_2_b.year === year_2022);
console.log(day_2022_2_20_a.month === month_2022_2_b);

//endregion >> TEST <<
