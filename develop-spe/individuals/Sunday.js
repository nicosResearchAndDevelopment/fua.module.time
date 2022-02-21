const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Sunday = new model.DayOfWeek({
    '@id': util.timeIRI('Sunday')
});

Sunday.lock();
module.exports = Sunday;
