const
    {describe, test}   = require('mocha'),
    expect             = require('expect'),
    time               = require('../src/module.time.js'),
    leapYearInteger    = 2020,
    nonLeapYearInteger = 2021,
    maxDateTS          = 8640000000000000e-3; // 8,640,000,000,000,000 milliseconds => e-3 makes it to seconds

describe('$buildDate', () => {

    describe('should return a date', () => {

        test('from a number.', () => {
            expect(time.$buildDate(1337)).toBeInstanceOf(Date);
            expect(time.$buildDate(0)).toBeInstanceOf(Date);
            expect(time.$buildDate(maxDateTS)).toBeInstanceOf(Date);
            expect(time.$buildDate(-Math.PI)).toBeInstanceOf(Date);
        });

    });

});

describe('$getGMonthDayFromDateTime', () => {

    test('should return the month and day of a date in interval notation', () => {
        expect(time.$getGMonthDayFromDateTime(new Date('Aug 03 2020 17:21:19 GMT+0200'))).toBe('--08-03');
        expect(time.$getGMonthDayFromDateTime(new Date('Dec 24 2012 17:21:19 GMT+0200'))).toBe('--12-24');
    });

});

describe(`$isLeapYear`, () => {

    test(`<${leapYearInteger}> is leap year`, () => {
        expect(time['$isLeapYear'](leapYearInteger)).toBe(true);
    });
    test(`<${nonLeapYearInteger}> is non-leap year`, () => {
        expect(time['$isLeapYear'](nonLeapYearInteger)).toBe(false);
    });
});

describe('time.Instant', () => {

    test('should be a constructor.', () => {
        expect(time.Instant).toBeInstanceOf(Function);
        expect(time.Instant.prototype).toBeInstanceOf(Object);
        expect(new time.Instant(Date.now())).toBeInstanceOf(time.Instant);
    });

    describe('should construct', () => {

        test('from a number.', () => {
            expect(() => new time.Instant(0)).not.toThrow();
            expect(() => new time.Instant(1337)).not.toThrow();
            expect(() => new time.Instant(Math.PI)).not.toThrow();
            expect(() => new time.Instant(-42)).not.toThrow();
            expect(() => new time.Instant(maxDateTS)).not.toThrow();
        });

        test('from a date.', () => {
            expect(() => new Date()).not.toThrow();
            expect(() => new Date(Number.EPSILON)).not.toThrow();
        });

    });

    describe('should have instances', () => {

        test('with their unix timestamp as beginning and as end.', () => {
            expect((new time.Instant(1337)).beginning).toBeCloseTo(1337);
            expect((new time.Instant(1337)).end).toBeCloseTo(1337);
            const ts = 1e-3 * Date.now();
            expect((new time.Instant(ts)).beginning).toBeCloseTo(ts);
            expect((new time.Instant(ts)).end).toBeCloseTo(ts);
        });

        test('with their duration set to 0.', () => {
            expect((new time.Instant(1337)).duration).toBe(0);
            expect((new time.Instant(42)).duration).toBe(0);
        });

        test('with their date object as dateBeginning and dateEnd.', () => {
            const dt = new Date();
            expect((new time.Instant(dt)).dateBeginning).toBe(dt);
            expect((new time.Instant(dt)).dateEnd).toBe(dt);
        });

    });

});

describe('time.ProperInterval', () => {

    test('should be a constructor.', () => {
        expect(time.ProperInterval).toBeInstanceOf(Function);
        expect(time.ProperInterval.prototype).toBeInstanceOf(Object);
        expect(new time.ProperInterval(Date.now() - 1, Date.now())).toBeInstanceOf(time.ProperInterval);
    });

    describe('should construct', () => {

        test('from two ascending numbers.', () => {
            expect(() => new time.ProperInterval(0, 1)).not.toThrow();
            expect(() => new time.ProperInterval(1337, 1338)).not.toThrow();
            expect(() => new time.ProperInterval(Math.PI, 0)).toThrow();
            expect(() => new time.ProperInterval(-42, maxDateTS)).not.toThrow();
        });

        test('from two ascending dates.', () => {
            expect(() => new time.ProperInterval(new Date(0), new Date(1))).not.toThrow();
            expect(() => new time.ProperInterval(new Date(1337), new Date(1338))).not.toThrow();
            expect(() => new time.ProperInterval(new Date(Math.PI), new Date(0))).toThrow();
            expect(() => new time.ProperInterval(new Date(-42), new Date(maxDateTS))).not.toThrow();
        });

        test('from a date and a duration.', () => {
            expect(() => new time.ProperInterval(new Date(), 'PT34383600S')).not.toThrow();
            expect(() => new time.ProperInterval(new Date(), 'P1Y2M3DT5H20M30.123S')).not.toThrow();
            expect(() => new time.ProperInterval('PT34383600S', 'P1Y2M3DT5H20M30.123S')).toThrow();
        });

        test('from a duration and a date.', () => {
            expect(() => new time.ProperInterval('PT34383600S', new Date())).not.toThrow();
            expect(() => new time.ProperInterval('P1Y2M3DT5H20M30.123S', new Date())).not.toThrow();
            expect(() => new time.ProperInterval('PT34383600S', 'P1Y2M3DT5H20M30.123S')).toThrow();
        });

    });

    describe('should have instances', () => {

        test('with their unix timestamps as beginning and as end.', () => {
            expect((new time.ProperInterval(1337, 1420)).beginning).toBeCloseTo(1337);
            expect((new time.ProperInterval(1337, 1420)).end).toBeCloseTo(1420);
            const ts = 1e-3 * Date.now();
            expect((new time.ProperInterval(ts, ts + 1)).beginning).toBeCloseTo(ts);
            expect((new time.ProperInterval(ts, ts + 1)).end).toBeCloseTo(ts + 1);
        });

        test('with their duration in seconds.', () => {
            const
                now           = Date.now(),
                date_now      = new Date(now),
                date_in_1_min = new Date(now + (60000));

            expect((new time.ProperInterval(date_now, new Date(date_now.valueOf() + 1))).duration).toBeGreaterThan(0);
            expect((new time.ProperInterval(date_now, date_in_1_min)).duration).toBe(60);
        });

        test('with their date object as dateBeginning and dateEnd.', () => {
            const dt = new Date();
            expect((new time.ProperInterval(dt, new Date(dt.valueOf() + 1000))).dateBeginning).toBe(dt);
            expect((new time.ProperInterval(dt, new Date(dt.valueOf() + 1000))).dateEnd.toString()).toBe((new Date(dt.valueOf() + 1000)).toString());
        });

    });

});

