const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const Tuesday = new model.DayOfWeek({
    '@id': util.timeIRI('Tuesday')
});

module.exports = Tuesday;
