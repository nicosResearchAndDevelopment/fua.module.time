const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const unitMinute = new model.TemporalUnit({
    '@id':          util.timeIRI('unitMinute'),
    'time:days':    {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:hours':   {
        '@value': '0',
        '@type':  'xsd:decimal'
    },
    'time:minutes': {
        '@value': '1',
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

unitMinute.lock();
module.exports = unitMinute;
