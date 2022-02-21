const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Interval extends model.TemporalEntity {

    // TODO rework with object and datatype properties

    #inside = new Set();

    constructor(param) {
        super(param);
        const inside = param[util.timeIRI.inside] || param[util.timeURI.inside];
        if (inside) for (let entity of util.toArray(param.inside)) {
            this.#inside.add(model.TemporalEntity.from(inside));
        }
    } // Interval#constructor

    get inside() {
        return Array.from(this.#inside);
    }

    toJSON() {
        const result = super.toJSON();
        if (this.#inside.size > 0) result[util.timeIRI.inside] = Array.from(this.#inside);
        return result;
    } // Interval#toJSON

} // Interval

module.exports = Interval;
