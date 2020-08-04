const
    crypto = require("crypto"),
    uuid = require("../../core.uuid/src/core.uuid.js")({
        mode: "local",
        parameter: { crypto }
    }),
    time = require("../src/module.time.js")({
        uuid
    });

describe("$buildDate should", () => {

    describe("return a date from", () => {

        test("a number.", () => {
            expect(time.$buildDate(1337)).toBeInstanceOf(Date);
            expect(time.$buildDate(0)).toBeInstanceOf(Date);
            expect(time.$buildDate(Number.MAX_SAFE_INTEGER)).toBeInstanceOf(Date);
            expect(time.$buildDate(-Math.PI)).toBeInstanceOf(Date);
        });

    });

});

describe("$getGMonthDayFromDateTime should", () => {

    test("return the month and day of a date in interval notation", () => {
        expect(time.$getGMonthDayFromDateTime(new Date("Aug 03 2020 17:21:19 GMT+0200"))).toBe("--08-03");
        expect(time.$getGMonthDayFromDateTime(new Date("Dec 24 2012 17:21:19 GMT+0200"))).toBe("--12-24");
    });

});

describe("time.Instant should", () => {

    test("be a constructor.", () => {
        expect(time.Instant).toBeInstanceOf(Function);
        expect(time.Instant.prototype).toBeInstanceOf(Object);
        expect(new time.Instant(Date.now())).toBeInstanceOf(time.Instant);
    });

    describe("construct from", () => {

        test("a number.", () => {
            expect(() => new time.Instant(0)).not.toThrow();
            expect(() => new time.Instant(1337)).not.toThrow();
            expect(() => new time.Instant(Math.PI)).not.toThrow();
            expect(() => new time.Instant(-42)).not.toThrow();
            expect(() => new time.Instant(Number.MAX_SAFE_INTEGER)).not.toThrow();
        });

        test("a date.", () => {
            expect(() => new Date()).not.toThrow();
            expect(() => new Date(Number.EPSILON)).not.toThrow();
        });

    });

    describe("have instances with", () => {

        test("their unix timestamp as beginning and as end.", () => {
            expect((new time.Instant(1337)).beginning).toBeCloseTo(1337);
            expect((new time.Instant(1337)).end).toBeCloseTo(1337);
            const ts = 1e-3 * Date.now();
            expect((new time.Instant(ts)).beginning).toBeCloseTo(ts);
            expect((new time.Instant(ts)).end).toBeCloseTo(ts);
        });

        test("there duration set to 0.", () => {
            expect((new time.Instant(1337)).duration).toBe(0);
            expect((new time.Instant(42)).duration).toBe(0);
        });

        test("their date object as dateBeginning and dateEnd.", () => {
            const dt = new Date();
            expect((new time.Instant(dt)).dateBeginning).toBe(dt);
            expect((new time.Instant(dt)).dateEnd).toBe(dt);
        });

    });

});

describe("time.ProperInterval should", () => {

    test("be a constructor.", () => {
        expect(time.ProperInterval).toBeInstanceOf(Function);
        expect(time.ProperInterval.prototype).toBeInstanceOf(Object);
        expect(new time.ProperInterval(Date.now() - 1, Date.now())).toBeInstanceOf(time.ProperInterval);
    });

    describe("construct from", () => {

        test("two ascending numbers.", () => {
            expect(() => new time.ProperInterval(0, 1)).not.toThrow();
            expect(() => new time.ProperInterval(1337, 1338)).not.toThrow();
            expect(() => new time.ProperInterval(Math.PI, 0)).toThrow();
            expect(() => new time.ProperInterval(-42, Number.MAX_SAFE_INTEGER)).not.toThrow();
        });

        test("two ascending dates.", () => {
            expect(() => new time.ProperInterval(new Date(0), new Date(1))).not.toThrow();
            expect(() => new time.ProperInterval(new Date(1337), new Date(1338))).not.toThrow();
            expect(() => new time.ProperInterval(new Date(Math.PI), new Date(0))).toThrow();
            expect(() => new time.ProperInterval(new Date(-42), new Date(Number.MAX_SAFE_INTEGER))).not.toThrow();
        });

    });

    describe("have instances with", () => {

        test("their unix timestamps as beginning and as end.", () => {
            expect((new time.ProperInterval(1337, 1420)).beginning).toBeCloseTo(1337);
            expect((new time.ProperInterval(1337, 1420)).end).toBeCloseTo(1420);
            const ts = 1e-3 * Date.now();
            expect((new time.ProperInterval(ts, ts + 1)).beginning).toBeCloseTo(ts);
            expect((new time.ProperInterval(ts, ts + 1)).end).toBeCloseTo(ts + 1);
        });

        test("there duration in seconds.", () => {
            const
                now = Date.now(),
                date_now = new Date(now),
                date_in_1_min = new Date(now + (60000));

            expect((new time.ProperInterval(date_now, new Date(date_now.valueOf() + 1))).duration).toBeGreaterThan(0);
            expect((new time.ProperInterval(date_now, date_in_1_min)).duration).toBe(60);
        });

        test("their date object as dateBeginning and dateEnd.", () => {
            const dt = new Date();
            expect((new time.ProperInterval(dt, new Date(dt.valueOf() + 1000))).dateBeginning).toBe(dt);
            expect((new time.ProperInterval(dt, new Date(dt.valueOf() + 1000))).dateEnd.toString()).toBe((new Date(dt.valueOf() + 1000)).toString());
        });

    });

});

describe("time.Before should", () => {

    const
        now = Date.now(),
        t1 = new time.Instant(now),
        t2 = new time.ProperInterval(now - 100, now + 100),
        t3 = new time.Instant(now - 1000),
        t4 = new time.ProperInterval(now - 1000, now - 101);

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => time.Before(t1, t2)).not.toThrow();
        expect(() => time.Before("Hello World!", t2)).toThrow();
        expect(() => time.Before()).toThrow();
    });

    test("return true if left argument comes before the right argument.", () => {
        expect(time.Before(t1, t2)).toBeFalsy();
        expect(time.Before(t1, t3)).toBeFalsy();
        expect(time.Before(t1, t4)).toBeFalsy();

        expect(time.Before(t2, t1)).toBeFalsy();
        expect(time.Before(t2, t3)).toBeFalsy();
        expect(time.Before(t2, t4)).toBeFalsy();

        expect(time.Before(t3, t1)).toBeTruthy();
        expect(time.Before(t3, t2)).toBeTruthy();
        expect(time.Before(t3, t4)).toBeFalsy();

        expect(time.Before(t4, t1)).toBeTruthy();
        expect(time.Before(t4, t2)).toBeTruthy();
        expect(time.Before(t4, t3)).toBeFalsy();
    });

});