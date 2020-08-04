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
}

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
class TemporalPosition { }

class TimePosition extends TemporalPosition { }

class GeneralDateTimeDescription extends TemporalPosition { }

class DateTimeDescription extends GeneralDateTimeDescription { }

class TemporalDuration { }

class Duration extends TemporalDuration { }

class GeneralDurationDescription extends TemporalDuration { }

class DurationDescription extends GeneralDurationDescription { }

class TemporalUnit extends TemporalDuration { }

class TemporalEntity { }

class Instant extends TemporalEntity { }

class Interval extends TemporalEntity { }

class ProperInterval extends Interval { }

class DateTimeInterval extends ProperInterval { }

module.exports = {
    TimeReferenceSystem,
    TemporalPosition, TimePosition, GeneralDateTimeDescription, DateTimeDescription,
    TemporalDuration, Duration, GeneralDurationDescription, DurationDescription, TemporalUnit,
    TemporalEntity, Instant, Interval, ProperInterval, DateTimeInterval
};