const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    factory = require('../module.time.factory.js');

function temporalDuration(param) {

    if (param instanceof model.TemporalDuration) {
        return param;
    }

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

    if (util.isArray(param)) {

        if (param.length === 2 && param.every(util.isNumber)) {
            return temporalDuration(param[1] - param[0]);
        }

        // TODO array of 2 strings

    } // if (util.isArray(param))

    if (util.isObject(param)) {

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

    } // if (util.isObject(param))

    throw new Error('invalid param');

} // temporalDuration

module.exports = temporalDuration;
