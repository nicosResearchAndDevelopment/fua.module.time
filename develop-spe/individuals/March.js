const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const March = new model.MonthOfYear({
    '@id':           util.gregIRI('March'),
    'time:month':    {
        '@value': '--03',
        '@type':  'xsd:gMonth'
    },
    'time:unitType': model.unitMonth
});

module.exports = March;
