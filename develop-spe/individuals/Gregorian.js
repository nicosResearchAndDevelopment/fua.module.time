const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Gregorian = new model.TRS({
    '@id': 'http://www.opengis.net/def/uom/ISO-8601/0/Gregorian'
});

Gregorian.lock();
module.exports = Gregorian;
