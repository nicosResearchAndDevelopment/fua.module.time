const
    _       = require('./util.js'),
    time    = require('./module.time.js'),
    EPSILON = Number.EPSILON;

exports.Before = function (i, j) {
    _.assert(_.isTemporalEntity(i), 'Before : invalid i');
    _.assert(_.isTemporalEntity(j), 'Before : invalid j');
    return i.end < j.beginning - EPSILON;
};

// TODO