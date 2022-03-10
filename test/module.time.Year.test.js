const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('../src/module.time.js');

describe('time.Year', () => {

    test('DEVELOP', () => {

        // const weeks = new time.Year(2020).weeks('iso');
        // console.log('first week from: \t', weeks[0].properInterval.dateBeginning.toUTCString());
        // console.log('first week to:   \t', weeks[0].properInterval.dateEnd.toUTCString());
        // console.log('second week from:\t', weeks[1].properInterval.dateBeginning.toUTCString());
        // console.log('second week to:  \t', weeks[1].properInterval.dateEnd.toUTCString());
        // console.log('last week from:  \t', weeks[weeks.length - 1].properInterval.dateBeginning.toUTCString());
        // console.log('last week to:    \t', weeks[weeks.length - 1].properInterval.dateEnd.toUTCString());

        console.log(new time.Year(2020).seasons('meteorological'));

    });

    test('iso calendar weeks of a year', function () {
        const currentYear = 2015;
        console.log('Year: ' + currentYear);
        const year = new time.Year(currentYear);
        console.log('weeks: ' + year.iso_weeks.length);
        console.log('from: ' + year.iso_weeks[0].properInterval.dateBeginning.toDateString());
        console.log('to (not including): ' + year.iso_weeks[year.iso_weeks.length - 1].properInterval.dateEnd.toDateString());
    });

    test('us calendar weeks of a year', function () {
        const currentYear = 2020;
        console.log('Year: ' + currentYear);
        for (let week of new time.Year(currentYear).us_weeks) {
            console.log('CW: ' + week.week);
            for (let day of week.days) {
                console.log('- ' + day['time:dayOfWeek'].padEnd(16, ' ') + '-> ' + day.properInterval.dateBeginning.toDateString());
            }
        }
    });

    test('generate some years', function () {
        this.timeout(60e3);
        const
            years   = {},
            minYear = 1970,
            maxYear = 2100;
        console.log(`generate years from ${minYear} to ${maxYear} with all subdivisions ...`);
        console.time('time');
        for (let currentYear = minYear; currentYear <= maxYear; currentYear++) {
            const year = years[currentYear] = new time.Year(currentYear);
            year.meteor_seasons;
            year.halves;
            year.quarters;
            year.months;
            year.iso_weeks;
            year.us_weeks;
            for (let half of year.halves) {
                half.quarters;
                half.months;
            }
            for (let quarter of year.quarters) {
                quarter.months;
            }
            for (let month of year.months) {
                month.days;
            }
            for (let us_week of year.us_weeks) {
                us_week.days;
            }
        }
        console.timeEnd('time');
    });

});
