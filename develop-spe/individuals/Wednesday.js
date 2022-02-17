const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Wednesday = new model.DayOfWeek({
    '@id': util.timeIRI('Wednesday')
});

module.exports = Wednesday;
