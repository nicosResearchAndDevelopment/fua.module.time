const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Friday = new model.DayOfWeek({
    '@id': util.timeIRI('Friday')
});

Friday.lock();
module.exports = Friday;
