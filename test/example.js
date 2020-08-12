const
    crypto = require("crypto"),
    uuid = require("../../core.uuid/src/core.uuid.js")({
        mode: "local",
        parameter: { crypto }
    }),
    time = require("../src/module.time.js")({
        uuid
    });

const
    t1 = new time.Instant(Date.now()),
    t2 = new time.ProperInterval(10, 20),
    t3 = new time.ProperInterval(99, 100),
    t4 = new time.ProperInterval(-42, Number.MAX_SAFE_INTEGER),
    t5 = new time.ProperInterval(new Date(), "PT34383600S"),
    t6 = new time.ProperInterval(new Date(), "P1Y2M3DT5H20M30.123S"),
    t7 = new time.ProperInterval("PT34383600S", new Date()),
    t8 = new time.ProperInterval("P1Y2M3DT5H20M30.123S", new Date()),
    t9 = new time.ProperInterval("PT34383600S", "P1Y2M3DT5H20M30.123S");

// console.log(t1, t2, t3);
// console.log(Reflect.ownKeys(time));
// console.log(Reflect.ownKeys(time.Instant));
// console.log(Reflect.ownKeys(time.Instant.prototype));
// console.log(Reflect.ownKeys(time.ProperInterval));
// console.log(Reflect.ownKeys(time.ProperInterval.prototype));
console.log(t5, t6, t7, t8, t9);
debugger;