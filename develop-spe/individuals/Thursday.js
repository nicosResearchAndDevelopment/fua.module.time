const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Thursday = new model.DayOfWeek({
    '@id': util.timeIRI('Thursday')
});

Thursday.lock();
module.exports = Thursday;
