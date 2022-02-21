const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Monday = new model.DayOfWeek({
    '@id': util.timeIRI('Monday')
});

Monday.lock();
module.exports = Monday;
