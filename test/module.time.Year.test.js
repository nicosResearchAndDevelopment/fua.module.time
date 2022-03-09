const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('../src/module.time.js');

describe('time.Year', () => {

    test('DEVELOP', () => {

        // const years = {}, minYear = 1970, maxYear = 2100;
        // for (let year = minYear; year <= maxYear; year++) {
        //     years[year] = new time.Year(year);
        //     years[year].halves;
        //     years[year].quarters;
        //     years[year].months;
        //     years[year].weeks;
        // }

        // const weeks = new time.Year(2020).weeks;
        // console.log('first week from: \t', weeks[0].properInterval.dateBeginning.toUTCString());
        // console.log('first week to:   \t', weeks[0].properInterval.dateEnd.toUTCString());
        // console.log('second week from:\t', weeks[1].properInterval.dateBeginning.toUTCString());
        // console.log('second week to:  \t', weeks[1].properInterval.dateEnd.toUTCString());
        // console.log('last week from:  \t', weeks[weeks.length - 1].properInterval.dateBeginning.toUTCString());
        // console.log('last week to:    \t', weeks[weeks.length - 1].properInterval.dateEnd.toUTCString());

        for (let week of new time.Year(2020).weeks) {
            console.log('CW: ' + week.week);
            for (let day of week.days) {
                console.log('- ' + day.properInterval.dateBeginning.toDateString());
            }
        }

    });

});
