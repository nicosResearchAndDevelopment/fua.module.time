const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    factory = require('../module.time.factory.js');

function temporalPosition(param) {
    if (param instanceof model.TemporalPosition) {
        return param;
    } else if (util.isString(param)) {
        return temporalPosition(new Date(param));
    } else if (util.isNumber(param)) {
        return temporalPosition(new Date(1000 * param));
    } else if (util.isDate(param)) {
        // return model.TimePosition.from({
        //     'time:hasTRS':          model.UnixTime,
        //     'time:numericPosition': (param.valueOf() / 1000).toString()
        // });
        return model.DateTimeDescription.from({
            'time:hasTRS':      model.Gregorian,
            'time:unitType':    model.unitSecond,
            'time:year':        param.getUTCFullYear().toString(),
            'time:month':       '--' + (param.getUTCMonth() + 1).toString().padStart(2, '0'),
            'time:day':         '---' + param.getUTCDate().toString().padStart(2, '0'),
            'time:hour':        param.getUTCHours().toString().padStart(2, '0'),
            'time:minute':      param.getUTCMinutes().toString().padStart(2, '0'),
            'time:second':      param.getUTCSeconds().toString().padStart(2, '0') + '.' + param.getUTCMilliseconds().toString().padStart(3, '0'),
            'time:dayOfWeek':   [
                                    model.Sunday, model.Monday, model.Tuesday, model.Wednesday,
                                    model.Thursday, model.Friday, model.Saturday
                                ][param.getUTCDay()],
            'time:monthOfYear': [
                                    model.January, model.February, model.March,
                                    model.April, model.May, model.June,
                                    model.July, model.August, model.September,
                                    model.October, model.November, model.December
                                ][param.getUTCMonth()]
        });
    } else if (util.isObject(param)) {

        if ([
            util.timeIRI.nominalPosition, util.timeURI.nominalPosition,
            util.timeIRI.numericPosition, util.timeURI.numericPosition
        ].some(prop => param[prop])) {
            return model.TimePosition.from(param);
        }

        if ([
            util.timeIRI.dayOfWeek, util.timeURI.dayOfWeek,
            util.timeIRI.monthOfYear, util.timeURI.monthOfYear,
            util.timeIRI.timeZone, util.timeURI.timeZone,
            util.timeIRI.unitType, util.timeURI.unitType,
            util.timeIRI.day, util.timeURI.day,
            util.timeIRI.dayOfYear, util.timeURI.dayOfYear,
            util.timeIRI.hour, util.timeURI.hour,
            util.timeIRI.minute, util.timeURI.minute,
            util.timeIRI.month, util.timeURI.month,
            util.timeIRI.second, util.timeURI.second,
            util.timeIRI.week, util.timeURI.week,
            util.timeIRI.year, util.timeURI.year
        ].some(prop => param[prop])) {
            return (param[util.timeIRI.hasTRS] && !model.Gregorian.equals(model.TRS.from(param[util.timeIRI.hasTRS])))
                ? model.GeneralDateTimeDescription.from(param)
                : model.DateTimeDescription.from(param);
        }

        if ([
            util.timeIRI.hasTRS, util.timeURI.hasTRS,
            '@id'
        ].some(prop => param[prop])) {
            return model.TemporalPosition.from(param);
        }
    }

    throw new Error('invalid param');
} // temporalPosition

module.exports = temporalPosition;
