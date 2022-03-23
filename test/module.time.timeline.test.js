const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    time             = require('../src/module.time.js'),
    timeline         = require('../src/module.time.timeline.DEVL.js');

describe('module.time.timeline', function () {

    const {
              Millennium, Century, Decade,
              Year, HalfOfYear, QuarterOfYear,
              Month, ISOCalendarWeek, USCalendarWeek,
              Day, EasterSunday
          } = timeline;

    test('DEVELOP', async function () {

        const
            day_2022_2_20_a = new Day(2022, 2, 20),
            year_2022       = new Year(2022),
            day_2022_2_20_b = new Day(year_2022, 2, 20),
            month_2022_2_a  = year_2022.month(2),
            month_2022_2_b  = new Month(year_2022, 2);

        expect(day_2022_2_20_a).toBe(day_2022_2_20_b);
        expect(month_2022_2_a).toBe(month_2022_2_b);
        expect(month_2022_2_b.year).toBe(year_2022);
        expect(day_2022_2_20_a.year).toBe(year_2022);
        expect(day_2022_2_20_a.month).toBe(month_2022_2_b);

        const
            millennium_1 = new Millennium(1),
            century_19_a = new Century(19),
            century_19_b = millennium_1.century(9),
            decade_199_a = new Decade(199),
            decade_199_b = century_19_a.decade(9),
            decade_199_c = millennium_1.decade(99),
            year_1999_a  = new Year(1999),
            year_1999_b  = decade_199_a.year(9),
            year_1999_c  = century_19_a.year(99),
            year_1999_d  = millennium_1.year(999);

        expect(century_19_a).toBe(century_19_b);
        expect(decade_199_a).toBe(decade_199_b);
        expect(decade_199_a).toBe(decade_199_c);
        expect(year_1999_a).toBe(year_1999_b);
        expect(year_1999_a).toBe(year_1999_c);
        expect(year_1999_a).toBe(year_1999_d);
        expect(century_19_a.millennium).toBe(millennium_1);
        expect(decade_199_a.millennium).toBe(millennium_1);
        expect(decade_199_a.century).toBe(century_19_a);
        expect(year_1999_a.millennium).toBe(millennium_1);
        expect(year_1999_a.century).toBe(century_19_a);
        expect(year_1999_a.decade).toBe(decade_199_a);

    });

});
