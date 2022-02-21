const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Interval extends model.TemporalEntity {

    #inside = new model._ObjectProperty(model.Instant);

    constructor(param) {
        super(param);
        const inside = param[util.timeIRI.inside] || param[util.timeURI.inside];
        if (inside) this.#inside.set(inside);
    } // Interval#constructor

    get inside() {
        return this.#inside;
    }

    lock() {
        super.lock();
        this.#inside.lock();
        return this;
    } // Interval#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#inside.empty) result[util.timeIRI.inside] = this.#inside.toJSON();
        return result;
    } // Interval#toJSON

} // Interval

module.exports = Interval;
