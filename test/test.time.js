
const

    app_name = "module.time : test",
    // ---------------------------------------
    crypto   = require('crypto'),
    // ---------------------------------------
    uuid     = require(`../../core.uuid/src/core.uuid.js`)({
        'mode':      "local",
        'parameter': {'crypto': crypto}
    }),
    // ---------------------------------------
    time = require(`../src/module.time.js` )({
        'uuid': uuid
    })
; // const

let
    now
;

now = time['now']();
let grunz = now['$serialize']();

console.log(`${app_name} : uuid : ${uuid()}`);

throw new Error();