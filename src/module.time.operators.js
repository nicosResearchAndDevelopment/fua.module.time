const
    op   = exports,
    _    = require('./module.time.util.js'),
    C    = require('./module.time.constants.js'),
    time = require('./module.time.js');

function assertOpArgs(left, right) {
    _.assert((left instanceof time.Instant) || (left instanceof time.ProperInterval),
        'operators : invalid left argument');
    _.assert((right instanceof time.Instant) || (right instanceof time.ProperInterval),
        'operators : invalid right argument');
} // assertOpArgs

op.Before = function (left, right) {
    assertOpArgs(left, right);
    return left.end < right.beginning - C.tolerance;
}; // op.Before

op.After = function (left, right) {
    return op.Before(right, left);
}; // op.After

op.Meets = function (left, right) {
    assertOpArgs(left, right);
    return left.end >= right.beginning - C.tolerance
        && left.end <= right.beginning + C.tolerance;
}; // op.Meets

op.MetBy = function (left, right) {
    return op.Meets(right, left);
}; // op.MetBy

op.Overlaps = function (left, right) {
    assertOpArgs(left, right);
    return left.beginning < right.beginning - C.tolerance
        && left.end > right.beginning + C.tolerance;
}; // op.Overlaps

op.OverlappedBy = function (left, right) {
    return op.Overlaps(right, left);
}; // op.OverlappedBy

op.Starts = function (left, right) {
    assertOpArgs(left, right);
    return left.beginning >= right.beginning - C.tolerance
        && left.beginning <= right.beginning + C.tolerance
        && left.end < right.end - C.tolerance;
}; // op.Starts

op.StartedBy = function (left, right) {
    return op.Starts(right, left);
}; // op.StartedBy

op.During = function (left, right) {
    assertOpArgs(left, right);
    return left.beginning > right.beginning + C.tolerance
        && left.end < right.end - C.tolerance;
}; // op.During

op.Contains = function (left, right) {
    return op.During(right, left);
}; // op.Contains

op.Finishes = function (left, right) {
    assertOpArgs(left, right);
    return left.end >= right.end - C.tolerance
        && left.end <= right.end + C.tolerance
        && left.beginning > right.beginning + C.tolerance;
}; // op.Finishes

op.FinishedBy = function (left, right) {
    return op.Finishes(right, left);
}; // op.FinishedBy

op.Equals = function (left, right) {
    assertOpArgs(left, right);
    return left.beginning >= right.beginning - C.tolerance
        && left.beginning <= right.beginning + C.tolerance
        && left.end >= right.end - C.tolerance
        && left.end <= right.end + C.tolerance;
}; // op.Equals

op.In = function (left, right) {
    assertOpArgs(left, right);
    return left.beginning >= right.beginning - C.tolerance
        && left.end <= right.end + C.tolerance;
}; // op.In

op.Disjoint = function (left, right) {
    assertOpArgs(left, right);
    return left.end < right.beginning - C.tolerance
        || left.beginning > right.end + C.tolerance;
}; // op.Disjoint