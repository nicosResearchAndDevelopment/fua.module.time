const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    factory = require('../module.time.factory.js');

function temporalDuration(param) {

    if (param instanceof model.TemporalDuration) {
        return param;
    } // if (param instanceof model.TemporalDuration)

    if (util.isNumber(param)) {
        return model.Duration.from({
            'time:unitType':        model.unitSecond,
            'time:numericDuration': param.toString()
        });
    } // if (util.isNumber(param))

    if (util.isString(param)) {
        const xsdDuration = model.duration.from(param);
        return model.DurationDescription.from({
            'time:days':    (xsdDuration.sign * xsdDuration.days).toString(),
            'time:hours':   (xsdDuration.sign * xsdDuration.hours).toString(),
            'time:minutes': (xsdDuration.sign * xsdDuration.minutes).toString(),
            'time:months':  (xsdDuration.sign * xsdDuration.months).toString(),
            'time:seconds': (xsdDuration.sign * (xsdDuration.seconds + xsdDuration.milliseconds / 1000)).toString(),
            'time:years':   (xsdDuration.sign * xsdDuration.years).toString()
        });
    } // if (util.isString(param))

    if (util.isArray(param) && param.length === 2) {

        const
            beginning = factory.temporalPosition(param[0]),
            end       = factory.temporalPosition(param[1]);

        if (!((beginning instanceof model.DateTimeDescription) && (end instanceof model.DateTimeDescription)))
            throw new Error('duration calculation is only possible with DateTimeDescriptions');

        let days = 0, hours = 0, minutes = 0, months = 0, seconds = 0, years = 0;

        if (!end.day.empty) {
            const gDay = end.day.get();
            days += gDay.day;
            hours += gDay.hour;
            minutes += gDay.minute;
        }
        if (!beginning.day.empty) {
            const gDay = beginning.day.get();
            days -= gDay.day;
            hours -= gDay.hour;
            minutes -= gDay.minute;
        }
        if (!end.month.empty) {
            const gMonth = end.month.get();
            months += gMonth.month;
            hours += gMonth.hour;
            minutes += gMonth.minute;
        }
        if (!beginning.month.empty) {
            const gMonth = beginning.month.get();
            months -= gMonth.month;
            hours -= gMonth.hour;
            minutes -= gMonth.minute;
        }
        if (!end.year.empty) {
            const gYear = end.year.get();
            years += gYear.year;
            hours += gYear.hour;
            minutes += gYear.minute;
        }
        if (!beginning.year.empty) {
            const gYear = beginning.year.get();
            years -= gYear.year;
            hours -= gYear.hour;
            minutes -= gYear.minute;
        }
        if (!end.hour.empty) {
            const hour = end.hour.get();
            hours += hour.number;
        }
        if (!beginning.hour.empty) {
            const hour = beginning.hour.get();
            hours -= hour.number;
        }
        if (!end.minute.empty) {
            const minute = end.minute.get();
            minutes += minute.number;
        }
        if (!beginning.minute.empty) {
            const minute = beginning.minute.get();
            minutes -= minute.number;
        }
        if (!end.second.empty) {
            const second = end.second.get();
            seconds += second.number;
        }
        if (!beginning.second.empty) {
            const second = beginning.second.get();
            seconds -= second.number;
        }

        return model.DurationDescription.from({
            'time:days':    days,
            'time:hours':   hours,
            'time:minutes': minutes,
            'time:months':  months,
            'time:seconds': seconds,
            'time:years':   years
        });

    } // if (util.isArray(param))

    if (util.isObject(param) && !util.isArray(param)) {

        if ([
            util.timeIRI.unitType, util.timeURI.unitType,
            util.timeIRI.numericDuration, util.timeURI.numericDuration
        ].some(prop => param[prop])) {
            return model.Duration.from(param);
        }

        if ([
            util.timeIRI.days, util.timeURI.days,
            util.timeIRI.hours, util.timeURI.hours,
            util.timeIRI.minutes, util.timeURI.minutes,
            util.timeIRI.months, util.timeURI.months,
            util.timeIRI.seconds, util.timeURI.seconds,
            util.timeIRI.weeks, util.timeURI.weeks,
            util.timeIRI.years, util.timeURI.years
        ].some(prop => param[prop])) {
            return (param[util.timeIRI.hasTRS] && !model.Gregorian.equals(model.TRS.from(param[util.timeIRI.hasTRS])))
                ? model.GeneralDurationDescription.from(param)
                : model.DurationDescription.from(param);
        }

        if ([
            '@id'
        ].some(prop => param[prop])) {
            return model.TemporalDuration.from(param);
        }

    } // if (util.isObject(param) && !util.isArray(param))

    throw new Error('invalid param');

} // temporalDuration

module.exports = temporalDuration;
