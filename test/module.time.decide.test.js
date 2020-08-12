const
    // crypto = require("crypto"),
    // uuid = require("../../core.uuid/src/core.uuid.js")({
    //     mode: "local",
    //     parameter: { crypto }
    // }),
    time = require("../src/module.time.js")({
        // uuid
    }),
    {
        Instant, ProperInterval,
        Before, After, Meets, MetBy, Overlaps, OverlappedBy,
        Starts, StartedBy, During, Contains, Finishes, FinishedBy, Equals, In, Disjoint
    } = time;

const
    A1 = new ProperInterval(1, 8), A2 = new ProperInterval(8, 17), A3 = new ProperInterval(19, 26),
    B1 = new ProperInterval(0, 7), B2 = new ProperInterval(10, 17), B3 = new ProperInterval(17, 28),
    C1 = new ProperInterval(3, 10), C2 = new Instant(17), C3 = new ProperInterval(21, 28),
    D1 = new ProperInterval(0, 11), D2 = new ProperInterval(14, 25), D3 = new Instant(27),
    C2b = new Instant(16.6 + .2 + .1 + .1);

/***********************************
 |  |<-A1->|<--A2-->| |<-A3->|     |
 | |<-B1->|  |<-B2->|<---B3--->|   |
 |    |<-C1->|   C2>*   |<-C3->|   |
 | |<---D1--->|  |<---D2--->| *<D3 |
 ***********************************/

describe("time.Before should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Before(A1, A2)).not.toThrow();
        expect(() => Before("Hello World!", B2)).toThrow();
        expect(() => Before(C1, C2)).not.toThrow();
        expect(() => Before()).toThrow();
    });

    test("return true if left argument comes before the right argument.", () => {
        expect(Before(A1, C2)).toBeTruthy();
        expect(Before(A1, A3)).toBeTruthy();
        expect(Before(B2, A3)).toBeTruthy();

        expect(Before(B2, B3)).toBeFalsy();
        expect(Before(A2, C1)).toBeFalsy();
        expect(Before(C3, B3)).toBeFalsy();
    });

});

describe("time.After should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => After(A1, A2)).not.toThrow();
        expect(() => After("Hello World!", B2)).toThrow();
        expect(() => After(C1, C2)).not.toThrow();
        expect(() => After()).toThrow();
    });

    test("return true if left argument comes after the right argument.", () => {
        expect(After(A3, C2)).toBeTruthy();
        expect(After(C2, B1)).toBeTruthy();
        expect(After(B3, A1)).toBeTruthy();

        expect(After(B3, B2)).toBeFalsy();
        expect(After(C2, B2)).toBeFalsy();
        expect(After(A2, C1)).toBeFalsy();
    });

});

describe("time.Meets should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Meets(A1, A2)).not.toThrow();
        expect(() => Meets("Hello World!", B2)).toThrow();
        expect(() => Meets(C1, C2)).not.toThrow();
        expect(() => Meets()).toThrow();
    });

    test("return true if left argument comes immediatly before the right argument.", () => {
        expect(Meets(A1, A2)).toBeTruthy();
        expect(Meets(B2, B3)).toBeTruthy();
        expect(Meets(A2, C2)).toBeTruthy();

        expect(Meets(A1, B2)).toBeFalsy();
        expect(Meets(B3, B2)).toBeFalsy();
        expect(Meets(C2, A2)).toBeFalsy();
    });

});

describe("time.MetBy should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => MetBy(A1, A2)).not.toThrow();
        expect(() => MetBy("Hello World!", B2)).toThrow();
        expect(() => MetBy(C1, C2)).not.toThrow();
        expect(() => MetBy()).toThrow();
    });

    test("return true if left argument comes immediatly after the right argument.", () => {
        expect(MetBy(B3, C2)).toBeTruthy();
        expect(MetBy(B3, A2)).toBeTruthy();
        expect(MetBy(A2, A1)).toBeTruthy();

        expect(MetBy(C2, B3)).toBeFalsy();
        expect(MetBy(A3, C1)).toBeFalsy();
        expect(MetBy(B2, A2)).toBeFalsy();
    });

});

describe("time.Overlaps should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Overlaps(A1, A2)).not.toThrow();
        expect(() => Overlaps("Hello World!", B2)).toThrow();
        expect(() => Overlaps(C1, C2)).not.toThrow();
        expect(() => Overlaps()).toThrow();
    });

    test("return true if left argument comes before the right argument and overlaps.", () => {
        expect(Overlaps(B1, A1)).toBeTruthy();
        expect(Overlaps(B1, C1)).toBeTruthy();
        expect(Overlaps(C1, A2)).toBeTruthy();

        expect(Overlaps(A2, C2)).toBeFalsy();
        expect(Overlaps(C3, A3)).toBeFalsy();
        expect(Overlaps(C1, B2)).toBeFalsy();
    });

});

describe("time.OverlappedBy should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => OverlappedBy(A1, A2)).not.toThrow();
        expect(() => OverlappedBy("Hello World!", B2)).toThrow();
        expect(() => OverlappedBy(C1, C2)).not.toThrow();
        expect(() => OverlappedBy()).toThrow();
    });

    test("return true if left argument comes after the right argument and overlaps.", () => {
        expect(OverlappedBy(A1, B1)).toBeTruthy();
        expect(OverlappedBy(C3, A3)).toBeTruthy();
        expect(OverlappedBy(A2, C1)).toBeTruthy();

        expect(OverlappedBy(A2, C2)).toBeFalsy();
        expect(OverlappedBy(B1, C1)).toBeFalsy();
        expect(OverlappedBy(C1, B2)).toBeFalsy();
    });

});

describe("time.Starts should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Starts(A1, A2)).not.toThrow();
        expect(() => Starts("Hello World!", B2)).toThrow();
        expect(() => Starts(C1, C2)).not.toThrow();
        expect(() => Starts()).toThrow();
    });

    test("return true if left argument is the start of the right argument.", () => {
        expect(Starts(C2, B3)).toBeTruthy();
        expect(Starts(B1, D1)).toBeTruthy();
        // expect(Starts(X, X)).toBeTruthy();

        expect(Starts(B3, C2)).toBeFalsy();
        expect(Starts(B1, C1)).toBeFalsy();
        expect(Starts(B3, C3)).toBeFalsy();
    });

});

describe("time.StartedBy should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => StartedBy(A1, A2)).not.toThrow();
        expect(() => StartedBy("Hello World!", B2)).toThrow();
        expect(() => StartedBy(C1, C2)).not.toThrow();
        expect(() => StartedBy()).toThrow();
    });

    test("return true if left argument starts with the right argument.", () => {
        expect(StartedBy(B3, C2)).toBeTruthy();
        expect(StartedBy(D1, B1)).toBeTruthy();
        // expect(StartedBy(X, X)).toBeTruthy();

        expect(StartedBy(C2, B3)).toBeFalsy();
        expect(StartedBy(A2, C1)).toBeFalsy();
        expect(StartedBy(A2, B2)).toBeFalsy();
    });

});

describe("time.During should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => During(A1, A2)).not.toThrow();
        expect(() => During("Hello World!", B2)).toThrow();
        expect(() => During(C1, C2)).not.toThrow();
        expect(() => During()).toThrow();
    });

    test("return true if left argument is enclosed by the right argument.", () => {
        expect(During(A1, D1)).toBeTruthy();
        expect(During(C1, D1)).toBeTruthy();
        expect(During(C2, D2)).toBeTruthy();

        expect(During(C2, B2)).toBeFalsy();
        expect(During(B3, A3)).toBeFalsy();
        expect(During(B2, A2)).toBeFalsy();
    });

});

describe("time.Contains should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Contains(A1, A2)).not.toThrow();
        expect(() => Contains("Hello World!", B2)).toThrow();
        expect(() => Contains(C1, C2)).not.toThrow();
        expect(() => Contains()).toThrow();
    });

    test("return true if left argument encloses the right argument.", () => {
        expect(Contains(B3, A3)).toBeTruthy();
        expect(Contains(D1, C1)).toBeTruthy();
        expect(Contains(C3, D3)).toBeTruthy();

        expect(Contains(C2, D2)).toBeFalsy();
        expect(Contains(A3, D3)).toBeFalsy();
        expect(Contains(B1, C1)).toBeFalsy();
    });

});

describe("time.Finishes should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Finishes(A1, A2)).not.toThrow();
        expect(() => Finishes("Hello World!", B2)).toThrow();
        expect(() => Finishes(C1, C2)).not.toThrow();
        expect(() => Finishes()).toThrow();
    });

    test("return true if left argument is the ending of the right argument.", () => {
        expect(Finishes(C3, B3)).toBeTruthy();
        expect(Finishes(C2, A2)).toBeTruthy();
        expect(Finishes(B2, A2)).toBeTruthy();

        expect(Finishes(C3, D2)).toBeFalsy();
        expect(Finishes(D3, B3)).toBeFalsy();
        expect(Finishes(A2, B2)).toBeFalsy();
    });

});

describe("time.FinishedBy should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => FinishedBy(A1, A2)).not.toThrow();
        expect(() => FinishedBy("Hello World!", B2)).toThrow();
        expect(() => FinishedBy(C1, C2)).not.toThrow();
        expect(() => FinishedBy()).toThrow();
    });

    test("return true if left argument ends with the right argument.", () => {
        expect(FinishedBy(A2, B2)).toBeTruthy();
        expect(FinishedBy(A2, C2)).toBeTruthy();
        expect(FinishedBy(B3, C3)).toBeTruthy();

        expect(FinishedBy(C2, B2)).toBeFalsy();
        expect(FinishedBy(B2, A2)).toBeFalsy();
        expect(FinishedBy(D1, C1)).toBeFalsy();
    });

});

describe("time.Equals should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Equals(A1, A2)).not.toThrow();
        expect(() => Equals("Hello World!", B2)).toThrow();
        expect(() => Equals(C1, C2)).not.toThrow();
        expect(() => Equals()).toThrow();
    });

    test("return true if left argument matches onto the right argument.", () => {
        expect(Equals(A2, A2)).toBeTruthy();
        expect(Equals(C2, C2b)).toBeTruthy();
        expect(Equals(B1, B1)).toBeTruthy();

        expect(Equals(C2, B2)).toBeFalsy();
        expect(Equals(B1, A2)).toBeFalsy();
        expect(Equals(D1, C3)).toBeFalsy();
    });

});

describe("time.In should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => In(A1, A2)).not.toThrow();
        expect(() => In("Hello World!", B2)).toThrow();
        expect(() => In(C1, C2)).not.toThrow();
        expect(() => In()).toThrow();
    });

    test("return true if left argument fits somewhere on the right argument.", () => {
        expect(In(B2, A2)).toBeTruthy();
        expect(In(A3, B3)).toBeTruthy();
        expect(In(C2, B2)).toBeTruthy();

        expect(In(A1, B1)).toBeFalsy();
        expect(In(B1, C1)).toBeFalsy();
        expect(In(D2, C2)).toBeFalsy();
    });

});

describe("time.Disjoint should", () => {

    test("accept exactly 2 temporal entites as arguments.", () => {
        expect(() => Disjoint(A1, A2)).not.toThrow();
        expect(() => Disjoint("Hello World!", B2)).toThrow();
        expect(() => Disjoint(C1, C2)).not.toThrow();
        expect(() => Disjoint()).toThrow();
    });

    test("return true if left argument does not touch the right argument.", () => {
        expect(Disjoint(A2, B1)).toBeTruthy();
        expect(Disjoint(D3, A3)).toBeTruthy();
        expect(Disjoint(B3, D1)).toBeTruthy();

        expect(Disjoint(C2b, D2)).toBeFalsy();
        expect(Disjoint(C2, B2)).toBeFalsy();
        expect(Disjoint(A2, B3)).toBeFalsy();
    });

});

/***********************************
 |  |<-A1->|<--A2-->| |<-A3->|     |
 | |<-B1->|  |<-B2->|<---B3--->|   |
 |    |<-C1->|   C2>*   |<-C3->|   |
 | |<---D1--->|  |<---D2--->| *<D3 |
 ***********************************/
