const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const unitDay = new model.TemporalUnit({
    '@id':          util.timeIRI('unitDay'),
    'time:days':    {
        '@value': '1',
        '@type':  'xsd:decimal'
    },
    'time:hours':   {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:minutes': {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:months':  {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:seconds': {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:weeks':   {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:years':   {
        '@value': '0',
        '@type':  'xsd:decimal'
    }
});

unitDay.lock();
module.exports = unitDay;
