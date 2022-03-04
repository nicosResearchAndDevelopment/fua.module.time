const
    mod    = (x, y) => x % y,
    div    = (x, y) => Math.floor(x / y),
    toDate = (year, month, day) => year.toString() + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

/**
 * @param {string|number} year
 * @returns {string}
 * @see https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Osterformel
 */
module.exports = function (year) {
    let
        x  = parseInt(year),
        k  = div(x, 100),
        m  = 15 + div(3 * k + 3, 4) - div(8 * k + 13, 25),
        s  = 2 - div(3 * k + 3, 4),
        a  = mod(x, 19),
        d  = mod(19 * a + m, 30),
        r  = div(d + div(a, 11), 29),
        og = 21 + d - r,
        sz = 7 - mod(x + div(x, 4) + s, 7),
        oe = 7 - mod(og - sz, 7),
        os = og + oe;

    // return os <= 31 ? toDate(x, 3, os) : toDate(x, 4, os - 31);
    return toDate(x, 3 + div(os - 1, 31), 1 + mod(os - 1, 31));
};
