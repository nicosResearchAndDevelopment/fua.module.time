const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const unitMonth = new model.TemporalUnit({
    '@id':          'http://www.w3.org/2006/time#unitMonth',
    'time:days':    {
        '@value': '0',
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
        '@value': '1',
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

module.exports = unitMonth;
