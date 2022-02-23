const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    factory = require('../module.time.factory.js');

function temporalEntity(param) {

    if (param instanceof model.TemporalEntity) {
        return param;
    } // if (param instanceof model.TemporalEntity)

    if (param instanceof model.TimePosition) {
        return model.Instant.from({
            'time:inTimePosition': param
        });
    } // if (param instanceof model.TimePosition)

    if (param instanceof model.GeneralDateTimeDescription) {
        return model.Instant.from({
            'time:inDateTime': param
        });
    } // if (param instanceof model.GeneralDateTimeDescription)

    if (param instanceof model.TemporalPosition) {
        return model.Instant.from({
            'time:inTemporalPosition': param
        });
    } // if (param instanceof model.TemporalPosition)

    if (util.isNumber(param)) {
        return temporalEntity(factory.temporalPosition(param));
    } // if (util.isNumber(param))

    if (util.isString(param)) {
        return temporalEntity(factory.temporalPosition(param));
    } // if (util.isString(param))

    if (util.isDate(param)) {
        return temporalEntity(factory.temporalPosition(param));
    } // if (util.isDate(param))

    if (util.isArray(param) && param.length === 2) {

        let hasBeginning, hasEnd, hasTemporalDuration;

        try {
            hasBeginning = temporalEntity(param[0]);
            try {
                hasEnd = temporalEntity(param[1]);
            } catch (err) {
                hasTemporalDuration = factory.temporalDuration(param[1]);
            }
        } catch (err) {
            hasTemporalDuration = factory.temporalDuration(param[0]);
            hasEnd              = temporalEntity(param[1]);
        }

        return temporalEntity({
            'time:hasBeginning':        hasBeginning,
            'time:hasEnd':              hasEnd,
            'time:hasTemporalDuration': hasTemporalDuration
        });

    } // if (util.isArray(param))

    if (util.isObject(param) && !util.isArray(param)) {

        if ([
            util.timeIRI.inDateTime, util.timeURI.inDateTime,
            util.timeIRI.inTemporalPosition, util.timeURI.inTemporalPosition,
            util.timeIRI.inTimePosition, util.timeURI.inTimePosition,
            util.timeIRI.inXSDDate, util.timeURI.inXSDDate,
            util.timeIRI.inXSDDateTimeStamp, util.timeURI.inXSDDateTimeStamp,
            util.timeIRI.inXSDgYear, util.timeURI.inXSDgYear,
            util.timeIRI.inXSDgYearMonth, util.timeURI.inXSDgYearMonth
        ].some(prop => param[prop])) {
            return model.Instant.from(param);
        }

        if ([
            util.timeIRI.hasDateTimeDescription, util.timeURI.hasDateTimeDescription
        ].some(prop => param[prop])) {
            return model.DateTimeInterval.from(param);
        }

        if ([
            util.timeIRI.intervalAfter, util.timeURI.intervalAfter,
            util.timeIRI.intervalBefore, util.timeURI.intervalBefore,
            util.timeIRI.intervalContains, util.timeURI.intervalContains,
            util.timeIRI.intervalDisjoint, util.timeURI.intervalDisjoint,
            util.timeIRI.intervalDuring, util.timeURI.intervalDuring,
            util.timeIRI.intervalEquals, util.timeURI.intervalEquals,
            util.timeIRI.intervalFinishedBy, util.timeURI.intervalFinishedBy,
            util.timeIRI.intervalFinishes, util.timeURI.intervalFinishes,
            util.timeIRI.intervalIn, util.timeURI.intervalIn,
            util.timeIRI.intervalMeets, util.timeURI.intervalMeets,
            util.timeIRI.intervalMetBy, util.timeURI.intervalMetBy,
            util.timeIRI.intervalOverlappedBy, util.timeURI.intervalOverlappedBy,
            util.timeIRI.intervalOverlaps, util.timeURI.intervalOverlaps,
            util.timeIRI.intervalStartedBy, util.timeURI.intervalStartedBy,
            util.timeIRI.intervalStarts, util.timeURI.intervalStarts
        ].some(prop => param[prop])) {
            return model.ProperInterval.from(param);
        }

        if ([
            util.timeIRI.inside, util.timeURI.inside
        ].some(prop => param[prop])) {
            return model.Interval.from(param);
        }

        if ([
            util.timeIRI.after, util.timeURI.after,
            util.timeIRI.before, util.timeURI.before,
            util.timeIRI.hasBeginning, util.timeURI.hasBeginning,
            util.timeIRI.hasDuration, util.timeURI.hasDuration,
            util.timeIRI.hasDurationDescription, util.timeURI.hasDurationDescription,
            util.timeIRI.hasEnd, util.timeURI.hasEnd,
            util.timeIRI.hasTemporalDuration, util.timeURI.hasTemporalDuration,
            util.timeIRI.hasXSDDuration, util.timeURI.hasXSDDuration,
            '@id'
        ].some(prop => param[prop])) {
            return model.TemporalEntity.from(param);
        }

    } // if (util.isObject(param) && !util.isArray(param))

    throw new Error('invalid param');

} // temporalEntity

module.exports = temporalEntity;
