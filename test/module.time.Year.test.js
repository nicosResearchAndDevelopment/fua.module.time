const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('../src/module.time.js');

describe('time.Year', () => {

    test('DEVELOP', () => {

        // const weeks = new time.Year(2020).weeks;
        // console.log('first week from: \t', weeks[0].properInterval.dateBeginning.toUTCString());
        // console.log('first week to:   \t', weeks[0].properInterval.dateEnd.toUTCString());
        // console.log('second week from:\t', weeks[1].properInterval.dateBeginning.toUTCString());
        // console.log('second week to:  \t', weeks[1].properInterval.dateEnd.toUTCString());
        // console.log('last week from:  \t', weeks[weeks.length - 1].properInterval.dateBeginning.toUTCString());
        // console.log('last week to:    \t', weeks[weeks.length - 1].properInterval.dateEnd.toUTCString());

        console.log(new time.Year(2020).seasons);

    });

    test('calendar weeks of a year', function () {
        const currentYear = 2020;
        console.log('Year: ' + currentYear);
        for (let week of new time.Year(currentYear).weeks) {
            console.log('CW: ' + week.week);
            for (let day of week.days) {
                console.log('- ' + day.properInterval.dateBeginning.toDateString());
            }
        }
    });

    test('generate some years', function () {
        const
            years      = {},
            minYear    = 1970,
            maxYear    = 2100,
            doSeasons  = true,
            doHalves   = true,
            doQuarters = true,
            doMonths   = true,
            doWeeks    = true,
            doDays     = true;
        console.log(`generate years from ${minYear} to ${maxYear} with the following subdivisions:`);
        console.log([doHalves && 'halves', doQuarters && 'quarters', doMonths && 'months', doWeeks && 'weeks', doDays && 'days'].filter(val => val).join(', '));
        console.time('time');
        for (let currentYear = minYear; currentYear <= maxYear; currentYear++) {
            const year = years[currentYear] = new time.Year(currentYear);
            if (doSeasons) year.seasons;
            if (doHalves) year.halves;
            if (doQuarters) year.quarters;
            if (doMonths) year.months;
            if (doWeeks) year.weeks;
            if (doHalves) for (let half of year.halves) {
                if (doQuarters) half.quarters;
                if (doMonths) half.months;
            }
            if (doQuarters) for (let quarter of year.quarters) {
                if (doMonths) quarter.months;
            }
            if (doMonths) for (let month of year.months) {
                if (doDays) month.days;
            }
            if (doWeeks) for (let week of year.weeks) {
                if (doDays) week.days;
            }
        }
        console.timeEnd('time');
    });

});
