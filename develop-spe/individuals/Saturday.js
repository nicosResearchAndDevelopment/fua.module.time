const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Saturday = new model.DayOfWeek({
    '@id': util.timeIRI('Saturday')
});

module.exports = Saturday;
