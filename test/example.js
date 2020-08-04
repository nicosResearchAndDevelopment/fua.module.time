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
    // t3 = new time.ProperInterval(100, 99),
    t4 = new time.ProperInterval(-42, Number.MAX_SAFE_INTEGER);

// console.log(t1, t2, t3);
// console.log(Reflect.ownKeys(time));
// console.log(Reflect.ownKeys(time.Instant));
// console.log(Reflect.ownKeys(time.Instant.prototype));
// console.log(Reflect.ownKeys(time.ProperInterval));
// console.log(Reflect.ownKeys(time.ProperInterval.prototype));
console.log(t4);
debugger;