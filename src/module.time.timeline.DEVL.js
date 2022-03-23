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
        /** @type {Set<Object>} */
        _persistent: {
            enumerable: false,
            value:      new Set()
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
            value:      function (id, entity, persist = false) {
                _.assert(_.isString(id), 'expected id to be a string');
                _.assert(!this._entities.has(id), 'expected id to be unique');
                _.assert(entity instanceof Object, 'expected entity to be an Object');
                const weakRef = new WeakRef(entity);
                this._entities.set(id, weakRef);
                if (persist) this._persistent.add(entity);
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
                if (entity) this._persistent.delete(entity);
                return entity || null;
            }
        }
    });

class Millennium {

    constructor(millennium) {
        if (millennium instanceof Millennium) return millennium;
        _.assert(_.isSafeInteger(millennium), 'expected millennium to be an integer');
        const beginningYear = 1000 * millennium, endYear = beginningYear + 999;
        _.assert(_.isSafeInteger(beginningYear), 'expected millennium to be in safe range');

        const id = `${beginningYear}/${endYear}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id         = id;
        this.millennium = millennium;
        this.beginning  = new Date(beginningYear, 0);
        this.end        = new Date(endYear + 1, 0);
        this._centuries = new Array(10);
        this._decades   = new Array(100);
        this._years     = new Array(1000);

        _.hideProp(this, '_centuries', '_decades', '_years');
        _.lockProp(this, 'id', 'millennium', 'beginning', 'end', '_centuries', '_decades', '_years');
        _timeline.set(id, this);
    } // Millennium#constructor

    century(century) {
        _.assert(_.isSafeInteger(century), 'expected century to be an integer');
        if (century < 0 || century >= this._centuries.length) return null;
        return this._centuries[century] || (this._centuries[century] = new Century(10 * this.millennium + century));
    } // Millennium#century

    decade(decade) {
        _.assert(_.isSafeInteger(decade), 'expected decade to be an integer');
        if (decade < 0 || decade >= this._decades.length) return null;
        return this._decades[decade] || (this._decades[decade] = new Decade(100 * this.millennium + decade));
    } // Millennium#decade

    year(year) {
        _.assert(_.isSafeInteger(year), 'expected year to be an integer');
        if (year < 0 || year >= this._years.length) return null;
        return this._years[year] || (this._years[year] = new Year(1000 * this.millennium + year));
    } // Millennium#year

} // Millennium

class Century {

    constructor(century) {
        if (century instanceof Century) return century;
        _.assert(_.isSafeInteger(century), 'expected century to be an integer');
        const beginningYear = 100 * century, endYear = beginningYear + 99;
        _.assert(_.isSafeInteger(beginningYear), 'expected century to be in safe range');

        const id = `${beginningYear}/${endYear}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id          = id;
        this.century     = century;
        this.beginning   = new Date(beginningYear, 0);
        this.end         = new Date(endYear + 1, 0);
        this._millennium = new Array(1);
        this._decades    = new Array(10);
        this._years      = new Array(100);

        _.hideProp(this, '_millennium', '_decades', '_years');
        _.lockProp(this, 'id', 'century', 'beginning', 'end', '_millennium', '_decades', '_years');
        _timeline.set(id, this);
    } // Century#constructor

    get millennium() {
        return this._millennium[0] || (this._millennium[0] = new Millennium(Math.floor(this.century / 10)));
    }

    decade(decade) {
        _.assert(_.isSafeInteger(decade), 'expected decade to be an integer');
        if (decade < 0 || decade >= this._decades.length) return null;
        return this._decades[decade] || (this._decades[decade] = new Decade(10 * this.century + decade));
    } // Century#decade

    year(year) {
        _.assert(_.isSafeInteger(year), 'expected year to be an integer');
        if (year < 0 || year >= this._years.length) return null;
        return this._years[year] || (this._years[year] = new Year(100 * this.century + year));
    } // Century#year

} // Century

class Decade {

    constructor(decade) {
        if (decade instanceof Decade) return decade;
        _.assert(_.isSafeInteger(decade), 'expected decade to be an integer');
        const beginningYear = 10 * decade, endYear = beginningYear + 9;
        _.assert(_.isSafeInteger(beginningYear), 'expected decade to be in safe range');

        const id = `${beginningYear}/${endYear}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id          = id;
        this.decade      = decade;
        this.beginning   = new Date(beginningYear, 0);
        this.end         = new Date(endYear + 1, 0);
        this._millennium = new Array(1);
        this._century    = new Array(1);
        this._years      = new Array(10);

        _.hideProp(this, '_millennium', '_century', '_years');
        _.lockProp(this, 'id', 'decade', 'beginning', 'end', '_millennium', '_century', '_years');
        _timeline.set(id, this);
    } // Decade#constructor

    get millennium() {
        return this._millennium[0] || (this._millennium[0] = new Millennium(Math.floor(this.decade / 100)));
    }

    get century() {
        return this._century[0] || (this._century[0] = new Century(Math.floor(this.decade / 10)));
    }

    year(year) {
        _.assert(_.isSafeInteger(year), 'expected year to be an integer');
        if (year < 0 || year >= this._years.length) return null;
        return this._years[year] || (this._years[year] = new Year(10 * this.decade + year));
    } // Decade#year

} // Decade

class Year {

    constructor(year) {
        if (year instanceof Year) return year;
        _.assert(_.isSafeInteger(year), 'expected year to be an integer');

        const id = `${year}`, entity = _timeline.get(id);
        if (entity) return entity;

        this.id          = id;
        this.year        = year;
        this.beginning   = new Date(year, 0);
        this.end         = new Date(year + 1, 0);
        this._millennium = new Array(1);
        this._century    = new Array(1);
        this._decade     = new Array(1);
        this._months     = new Array(12);

        _.hideProp(this, '_millennium', '_century', '_decade', '_months');
        _.lockProp(this, 'id', 'year', 'beginning', 'end', '_millennium', '_century', '_decade', '_months');
        _timeline.set(id, this);
    } // Year#constructor

    get millennium() {
        return this._millennium[0] || (this._millennium[0] = new Millennium(Math.floor(this.year / 1000)));
    }

    get century() {
        return this._century[0] || (this._century[0] = new Century(Math.floor(this.year / 100)));
    }

    get decade() {
        return this._decade[0] || (this._decade[0] = new Decade(Math.floor(this.year / 10)));
    }

    // TODO half(half)
    // TODO quarter(quarter)

    month(month) {
        _.assert(_.isSafeInteger(month), 'expected month to be an integer');
        if (month < 0 || month >= this._months.length) return null;
        return this._months[month] || (this._months[month] = new Month(this, month));
    } // Year#month

} // Year

class HalfOfYear {

    // TODO constructor(year, half): HalfOfYear
    // TODO year: Year
    // TODO half: number
    // TODO quarter(quarter): QuarterOfYear
    // TODO month(month): Month

} // HalfOfYear

class QuarterOfYear {

    // TODO constructor(year, quarter): QuarterOfYear
    // TODO year: Year
    // TODO half: HalfOfYear
    // TODO quarter: number
    // TODO month(month): Month

} // QuarterOfYear

class Month {

    constructor(year, month) {
        year = new Year(year);
        if (month instanceof Month && month.year === year) return month;
        _.assert(_.isSafeInteger(month) && month >= 0 && month <= 11, 'expected month to be an integer from 0 to 11');

        const id = `${year.year}-${month}`, entity = _timeline.get(id);
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

class ISOCalendarWeek {

    // TODO constructor(year, week): ISOCalendarWeek
    // TODO year: Year
    // TODO week: number
    // TODO day(day): Day

} // ISOCalendarWeek

class USCalendarWeek {

    // TODO constructor(year, week): USCalendarWeek
    // TODO year: Year
    // TODO week: number
    // TODO day(day): Day

} // USCalendarWeek

class Day {

    constructor(year, month, day) {
        year  = new Year(year);
        month = new Month(year, month);
        if (day instanceof Day && day.month === month) return day;
        _.assert(_.isSafeInteger(day) && day >= 0 && day <= 30, 'expected day to be an integer from 0 to 30');

        const id = `${year.year}-${month.month}-${day}`, entity = _timeline.get(id);
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

class EasterSunday extends Day {

    // TODO constructor(year): EasterSunday

} // EasterSunday

exports.Millennium      = Millennium;
exports.Century         = Century;
exports.Decade          = Decade;
exports.Year            = Year;
exports.HalfOfYear      = HalfOfYear;
exports.QuarterOfYear   = QuarterOfYear;
exports.Month           = Month;
exports.ISOCalendarWeek = ISOCalendarWeek;
exports.USCalendarWeek  = USCalendarWeek;
exports.Day             = Day;
exports.EasterSunday    = EasterSunday;
