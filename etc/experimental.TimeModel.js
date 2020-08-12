const
    $time = Symbol("time"),
    $beginning = Symbol("beginning"),
    $end = Symbol("end");

/**
 * @param {*} value 
 * @param {String} errMsg 
 * @param {Class<Error>} errType 
 * @throws {Error}
 */
function assert(value, errMsg = "", errType = Error) {
    if (!value) {
        const err = new errType(errMsg);
        Error.captureStackTrace(`module.time : ${err}`, assert);
        throw err;
    }
} // assert

/**
 * @param {Object} obj 
 * @param {String|Symbol} key 
 */
function lockProp(obj, key) {
    Object.defineProperty(obj, key, { configurable: false });
} // lockProp

/**
 * A temporal reference system, such as a temporal coordinate system (with an origin, direction, and scale), 
 * a calendar-clock combination, or a (possibly hierarchical) ordinal system. 
 * This is a stub class, representing the set of all temporal reference systems.
 * @class
 * @extends owl:Class
 */
class TimeReferenceSystem {
    constructor(param) {
        this['@id'] = param['@id'];
        this['@type'] = TimeReferenceSystem['@id'];
        this.origin = param.origin;
        this.step = param.step;
        this.calendar = param.calendar;
    }
} // TimeReferenceSystem

Object.assign(TimeReferenceSystem, {
    '@id': "time:TRS",
    '@type': "owl:Class",
    UTC: new TimeReferenceSystem({
        '@id': "http://dbpedia.org/resource/Unix_time",
        origin: "Thu, 01 Jan 1970 00:00:00 GMT",
        step: "+1s",
        calendar: {
            year(ts) { return (new Date(1e3 * ts)).getUTCFullYear(); },
            month(ts) { return 1 + (new Date(1e3 * ts)).getUTCMonth(); },
            day(ts) { return (new Date(1e3 * ts)).getUTCDate(); },
            hour(ts) { return (new Date(1e3 * ts)).getUTCHours(); },
            minute(ts) { return (new Date(1e3 * ts)).getUTCMinutes(); },
            second(ts) {
                const date = new Date(1e3 * ts);
                return date.getUTCSeconds() + 1e-3 * date.getUTCMilliseconds();
            }
        }
    }),
    TAI: (() => {
        /**
         * As of 30 June 2015 when another leap second was added, 
         * TAI is exactly 36 seconds ahead of UTC. The 36 seconds results 
         * from the initial difference of 10 seconds at the start of 1972, 
         * plus 26 leap seconds in UTC since 1972.
         */
        const UTC_offset = 1e-3 * (new Date("1972-01-01")).valueOf();
        const TAI_offset = UTC_offset + 10;

        const UTC_scale = 1e-3 * (new Date("2015-07-01")).valueOf() - UTC_offset;
        const TAI_scale = UTC_scale + 26;

        const scale = UTC_scale / TAI_scale;
        const offset = UTC_offset - scale * TAI_offset;

        function TAI_to_UTC(TAI_ts) {
            return scale * TAI_ts + offset;
        }

        return new TimeReferenceSystem({
            '@id': "http://dbpedia.org/page/International_Atomic_Time",
            origin: new Date(TAI_to_UTC(0)).toString(),
            step: `+${TAI_scale / UTC_scale}s`,
            calendar: {
                year(ts) { return TimeReferenceSystem.UTC.calendar.year(TAI_to_UTC(ts)); },
                month(ts) { return TimeReferenceSystem.UTC.calendar.month(TAI_to_UTC(ts)); },
                day(ts) { return TimeReferenceSystem.UTC.calendar.day(TAI_to_UTC(ts)); },
                hour(ts) { return TimeReferenceSystem.UTC.calendar.hour(TAI_to_UTC(ts)); },
                minute(ts) { return TimeReferenceSystem.UTC.calendar.minute(TAI_to_UTC(ts)); },
                second(ts) { return TimeReferenceSystem.UTC.calendar.second(TAI_to_UTC(ts)); }
            }
        });
    })()
});

/**
 * A position on a time-line
 * @class 
 * @extends { "rdf:type": "owl:Restriction", "owl:cardinality": "1", "owl:onProperty": "time:hasTRS" }
 */
class TemporalPosition { } // TemporalPosition

class TimePosition extends TemporalPosition { } // TimePosition

class GeneralDateTimeDescription extends TemporalPosition { } // GeneralDateTimeDescription

class DateTimeDescription extends GeneralDateTimeDescription { } // DateTimeDescription

class TemporalDuration { } // TemporalDuration

class Duration extends TemporalDuration { } // Duration

class GeneralDurationDescription extends TemporalDuration { } // GeneralDurationDescription

class DurationDescription extends GeneralDurationDescription { } // DurationDescription

class TemporalUnit extends TemporalDuration { } // TemporalUnit

class TemporalEntity {

    constructor() {
        assert(new.target !== TemporalEntity, "TemporalEntity#constructor : abstract class");
    }

    after(entity) {
        assert(entity instanceof TemporalEntity, "TemporalEntity#after : invalid @param {TemporalEntity} entity");
        const T1 = (this instanceof Instant) ? this[$time] : this[$beginning];
        const T2 = (entity instanceof Instant) ? entity[$time] : entity[$end];
        return T1 > T2;
    }

    before(entity) {
        assert(entity instanceof TemporalEntity, "TemporalEntity#before : invalid @param {TemporalEntity} entity");
        const T1 = (this instanceof Instant) ? this[$time] : this[$end];
        const T2 = (entity instanceof Instant) ? entity[$time] : entity[$beginning];
        return T1 < T2;
    }

    hasBeginning() {
        const T1 = (this instanceof Instant) ? this[$time] : this[$beginning];
        return new Instant(T1);
    }

    hasEnd() {
        const T1 = (this instanceof Instant) ? this[$time] : this[$end];
        return new Instant(T1);
    }

    hasDuration() {
        const T1 = (this instanceof Instant) ? this[$time] : this[$beginning];
        const T2 = (this instanceof Instant) ? this[$time] : this[$end];
        return new Duration(T2 - T1);
    }

} // TemporalEntity

class Instant extends TemporalEntity {

    constructor(time) {
        super();
        time = new Date(time);
        assert(!isNaN(time.valueOf()), "Instant#constructor : invalid @param {Date} date");

        /** @type {Date} */
        this[$time] = time;
        lockProp(this, $time);
    }

} // Instant

class Interval extends TemporalEntity {

    constructor(beginning, end) {
        super();
        beginning = new Date(beginning);
        end = new Date(end);
        assert(!isNaN(beginning.valueOf()), "Interval#constructor : invalid @param {Date} beginning");
        assert(!isNaN(end.valueOf()), "Interval#constructor : invalid @param {Date} end");

        /** @type {Date} */
        this[$beginning] = beginning;
        lockProp(this, $beginning);
        /** @type {Date} */
        this[$end] = end;
        lockProp(this, $end);
    }

} // Interval

class ProperInterval extends Interval {

    constructor(beginning, end) {
        super(beginning, end);
        assert(this[$beginning] < this[$end], "ProperInterval#constructor : expected end to come after beginning");
    }

} // ProperInterval

class DateTimeInterval extends ProperInterval { } // DateTimeInterval

module.exports = {
    TimeReferenceSystem,
    TemporalPosition, TimePosition, GeneralDateTimeDescription, DateTimeDescription,
    TemporalDuration, Duration, GeneralDurationDescription, DurationDescription, TemporalUnit,
    TemporalEntity, Instant, Interval, ProperInterval, DateTimeInterval
};