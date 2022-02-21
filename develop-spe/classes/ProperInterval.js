const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class ProperInterval extends model.Interval {

    // TODO rework with object and datatype properties

    #intervalAfter        = new Set();
    #intervalBefore       = new Set();
    #intervalContains     = new Set();
    #intervalDisjoint     = new Set();
    #intervalDuring       = new Set();
    #intervalEquals       = new Set();
    #intervalFinishedBy   = new Set();
    #intervalFinishes     = new Set();
    #intervalIn           = new Set();
    #intervalMeets        = new Set();
    #intervalMetBy        = new Set();
    #intervalOverlappedBy = new Set();
    #intervalOverlaps     = new Set();
    #intervalStartedBy    = new Set();
    #intervalStarts       = new Set();

    constructor(param) {
        super(param);
        const intervalAfter = param[util.timeIRI.intervalAfter] || param[util.timeURI.intervalAfter];
        if (intervalAfter) for (let entity of util.toArray(param.intervalAfter)) {
            this.#intervalAfter.add(model.ProperInterval.from(intervalAfter));
        }
        const intervalBefore = param[util.timeIRI.intervalBefore] || param[util.timeURI.intervalBefore];
        if (intervalBefore) for (let entity of util.toArray(param.intervalBefore)) {
            this.#intervalBefore.add(model.ProperInterval.from(intervalBefore));
        }
        const intervalContains = param[util.timeIRI.intervalContains] || param[util.timeURI.intervalContains];
        if (intervalContains) for (let entity of util.toArray(param.intervalContains)) {
            this.#intervalContains.add(model.ProperInterval.from(intervalContains));
        }
        const intervalDisjoint = param[util.timeIRI.intervalDisjoint] || param[util.timeURI.intervalDisjoint];
        if (intervalDisjoint) for (let entity of util.toArray(param.intervalDisjoint)) {
            this.#intervalDisjoint.add(model.ProperInterval.from(intervalDisjoint));
        }
        const intervalDuring = param[util.timeIRI.intervalDuring] || param[util.timeURI.intervalDuring];
        if (intervalDuring) for (let entity of util.toArray(param.intervalDuring)) {
            this.#intervalDuring.add(model.ProperInterval.from(intervalDuring));
        }
        const intervalEquals = param[util.timeIRI.intervalEquals] || param[util.timeURI.intervalEquals];
        if (intervalEquals) for (let entity of util.toArray(param.intervalEquals)) {
            this.#intervalEquals.add(model.ProperInterval.from(intervalEquals));
        }
        const intervalFinishedBy = param[util.timeIRI.intervalFinishedBy] || param[util.timeURI.intervalFinishedBy];
        if (intervalFinishedBy) for (let entity of util.toArray(param.intervalFinishedBy)) {
            this.#intervalFinishedBy.add(model.ProperInterval.from(intervalFinishedBy));
        }
        const intervalFinishes = param[util.timeIRI.intervalFinishes] || param[util.timeURI.intervalFinishes];
        if (intervalFinishes) for (let entity of util.toArray(param.intervalFinishes)) {
            this.#intervalFinishes.add(model.ProperInterval.from(intervalFinishes));
        }
        const intervalIn = param[util.timeIRI.intervalIn] || param[util.timeURI.intervalIn];
        if (intervalIn) for (let entity of util.toArray(param.intervalIn)) {
            this.#intervalIn.add(model.ProperInterval.from(intervalIn));
        }
        const intervalMeets = param[util.timeIRI.intervalMeets] || param[util.timeURI.intervalMeets];
        if (intervalMeets) for (let entity of util.toArray(param.intervalMeets)) {
            this.#intervalMeets.add(model.ProperInterval.from(intervalMeets));
        }
        const intervalMetBy = param[util.timeIRI.intervalMetBy] || param[util.timeURI.intervalMetBy];
        if (intervalMetBy) for (let entity of util.toArray(param.intervalMetBy)) {
            this.#intervalMetBy.add(model.ProperInterval.from(intervalMetBy));
        }
        const intervalOverlappedBy = param[util.timeIRI.intervalOverlappedBy] || param[util.timeURI.intervalOverlappedBy];
        if (intervalOverlappedBy) for (let entity of util.toArray(param.intervalOverlappedBy)) {
            this.#intervalOverlappedBy.add(model.ProperInterval.from(intervalOverlappedBy));
        }
        const intervalOverlaps = param[util.timeIRI.intervalOverlaps] || param[util.timeURI.intervalOverlaps];
        if (intervalOverlaps) for (let entity of util.toArray(param.intervalOverlaps)) {
            this.#intervalOverlaps.add(model.ProperInterval.from(intervalOverlaps));
        }
        const intervalStartedBy = param[util.timeIRI.intervalStartedBy] || param[util.timeURI.intervalStartedBy];
        if (intervalStartedBy) for (let entity of util.toArray(param.intervalStartedBy)) {
            this.#intervalStartedBy.add(model.ProperInterval.from(intervalStartedBy));
        }
        const intervalStarts = param[util.timeIRI.intervalStarts] || param[util.timeURI.intervalStarts];
        if (intervalStarts) for (let entity of util.toArray(param.intervalStarts)) {
            this.#intervalStarts.add(model.ProperInterval.from(intervalStarts));
        }
    } // ProperInterval#constructor

    get intervalAfter() {
        return Array.from(this.#intervalAfter);
    }

    get intervalBefore() {
        return Array.from(this.#intervalBefore);
    }

    get intervalContains() {
        return Array.from(this.#intervalContains);
    }

    get intervalDisjoint() {
        return Array.from(this.#intervalDisjoint);
    }

    get intervalDuring() {
        return Array.from(this.#intervalDuring);
    }

    get intervalEquals() {
        return Array.from(this.#intervalEquals);
    }

    get intervalFinishedBy() {
        return Array.from(this.#intervalFinishedBy);
    }

    get intervalFinishes() {
        return Array.from(this.#intervalFinishes);
    }

    get intervalIn() {
        return Array.from(this.#intervalIn);
    }

    get intervalMeets() {
        return Array.from(this.#intervalMeets);
    }

    get intervalMetBy() {
        return Array.from(this.#intervalMetBy);
    }

    get intervalOverlappedBy() {
        return Array.from(this.#intervalOverlappedBy);
    }

    get intervalOverlaps() {
        return Array.from(this.#intervalOverlaps);
    }

    get intervalStartedBy() {
        return Array.from(this.#intervalStartedBy);
    }

    get intervalStarts() {
        return Array.from(this.#intervalStarts);
    }

    toJSON() {
        const result = super.toJSON();
        if (this.#intervalAfter.size > 0) result[util.timeIRI.intervalAfter] = Array.from(this.#intervalAfter);
        if (this.#intervalBefore.size > 0) result[util.timeIRI.intervalBefore] = Array.from(this.#intervalBefore);
        if (this.#intervalContains.size > 0) result[util.timeIRI.intervalContains] = Array.from(this.#intervalContains);
        if (this.#intervalDisjoint.size > 0) result[util.timeIRI.intervalDisjoint] = Array.from(this.#intervalDisjoint);
        if (this.#intervalDuring.size > 0) result[util.timeIRI.intervalDuring] = Array.from(this.#intervalDuring);
        if (this.#intervalEquals.size > 0) result[util.timeIRI.intervalEquals] = Array.from(this.#intervalEquals);
        if (this.#intervalFinishedBy.size > 0) result[util.timeIRI.intervalFinishedBy] = Array.from(this.#intervalFinishedBy);
        if (this.#intervalFinishes.size > 0) result[util.timeIRI.intervalFinishes] = Array.from(this.#intervalFinishes);
        if (this.#intervalIn.size > 0) result[util.timeIRI.intervalIn] = Array.from(this.#intervalIn);
        if (this.#intervalMeets.size > 0) result[util.timeIRI.intervalMeets] = Array.from(this.#intervalMeets);
        if (this.#intervalMetBy.size > 0) result[util.timeIRI.intervalMetBy] = Array.from(this.#intervalMetBy);
        if (this.#intervalOverlappedBy.size > 0) result[util.timeIRI.intervalOverlappedBy] = Array.from(this.#intervalOverlappedBy);
        if (this.#intervalOverlaps.size > 0) result[util.timeIRI.intervalOverlaps] = Array.from(this.#intervalOverlaps);
        if (this.#intervalStartedBy.size > 0) result[util.timeIRI.intervalStartedBy] = Array.from(this.#intervalStartedBy);
        if (this.#intervalStarts.size > 0) result[util.timeIRI.intervalStarts] = Array.from(this.#intervalStarts);
        return result;
    } // ProperInterval#toJSON

} // ProperInterval

module.exports = ProperInterval;
