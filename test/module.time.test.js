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

    test("return a time:Instant from a numeric value", () => {
        expect(time.$buildDate(1337)).toBeInstanceOf(time.Instant);
        expect(time.$buildDate(0)).toBeInstanceOf(time.Instant);
        expect(time.$buildDate(Number.MAX_SAFE_INTEGER)).toBeInstanceOf(time.Instant);
        expect(time.$buildDate(-Math.PI)).toBeInstanceOf(time.Instant);
    });

});