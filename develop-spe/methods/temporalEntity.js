const
    util    = require('../module.time.util.js'),
    model   = require('../module.time.model.js'),
    factory = require('../module.time.factory.js');

function temporalEntity(param) {

    if (param instanceof model.TemporalEntity) {
        return param;
    }

    // TODO

} // temporalEntity

module.exports = temporalEntity;
