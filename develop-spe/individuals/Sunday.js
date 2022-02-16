const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Sunday = new model.DayOfWeek({
    '@id': 'http://www.w3.org/2006/time#Sunday'
});

module.exports = Sunday;
