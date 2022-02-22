const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

const UnixTime = new model.TRS({
    '@id': 'http://dbpedia.org/resource/Unix_time'
});

UnixTime.lock();
module.exports = UnixTime;
