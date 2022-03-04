const
    mod    = (x, y) => x % y,
    div    = (x, y) => Math.floor(x / y),
    toDate = (year, month, day) => year.toString() + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

/**
 * @param {string|number} year
 * @returns {string}
 * @see https://de.wikipedia.org/wiki/Spencers_Osterformel
 */
module.exports = function (year) {
    const
        y = parseInt(year),
        a = mod(y, 19),
        b = div(y, 100),
        c = mod(y, 100),
        d = div(b, 4),
        e = mod(b, 4),
        f = div(b + 8, 25),
        g = div(b - f + 1, 3),
        h = mod(19 * a + b - d - g + 15, 30),
        i = div(c, 4),
        k = mod(c, 4),
        l = mod(32 + 2 * e + 2 * i - h - k, 7),
        m = div(a + 11 * h + 22 * l, 451),
        n = div(h + l - 7 * m + 114, 31),
        p = mod(h + l - 7 * m + 114, 31);

    return toDate(y, n, p + 1);
};
