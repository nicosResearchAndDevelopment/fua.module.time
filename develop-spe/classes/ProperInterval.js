const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class ProperInterval extends model.Interval {

    #intervalAfter        = new model._ObjectProperty(model.ProperInterval);
    #intervalBefore       = new model._ObjectProperty(model.ProperInterval);
    #intervalContains     = new model._ObjectProperty(model.ProperInterval);
    #intervalDisjoint     = new model._ObjectProperty(model.ProperInterval);
    #intervalDuring       = new model._ObjectProperty(model.ProperInterval);
    #intervalEquals       = new model._ObjectProperty(model.ProperInterval);
    #intervalFinishedBy   = new model._ObjectProperty(model.ProperInterval);
    #intervalFinishes     = new model._ObjectProperty(model.ProperInterval);
    #intervalIn           = new model._ObjectProperty(model.ProperInterval);
    #intervalMeets        = new model._ObjectProperty(model.ProperInterval);
    #intervalMetBy        = new model._ObjectProperty(model.ProperInterval);
    #intervalOverlappedBy = new model._ObjectProperty(model.ProperInterval);
    #intervalOverlaps     = new model._ObjectProperty(model.ProperInterval);
    #intervalStartedBy    = new model._ObjectProperty(model.ProperInterval);
    #intervalStarts       = new model._ObjectProperty(model.ProperInterval);

    constructor(param) {
        super(param);
        const intervalAfter = param[util.timeIRI.intervalAfter] || param[util.timeURI.intervalAfter];
        if (intervalAfter) this.#intervalAfter.set(intervalAfter);
        const intervalBefore = param[util.timeIRI.intervalBefore] || param[util.timeURI.intervalBefore];
        if (intervalBefore) this.#intervalBefore.set(intervalBefore);
        const intervalContains = param[util.timeIRI.intervalContains] || param[util.timeURI.intervalContains];
        if (intervalContains) this.#intervalContains.set(intervalContains);
        const intervalDisjoint = param[util.timeIRI.intervalDisjoint] || param[util.timeURI.intervalDisjoint];
        if (intervalDisjoint) this.#intervalDisjoint.set(intervalDisjoint);
        const intervalDuring = param[util.timeIRI.intervalDuring] || param[util.timeURI.intervalDuring];
        if (intervalDuring) this.#intervalDuring.set(intervalDuring);
        const intervalEquals = param[util.timeIRI.intervalEquals] || param[util.timeURI.intervalEquals];
        if (intervalEquals) this.#intervalEquals.set(intervalEquals);
        const intervalFinishedBy = param[util.timeIRI.intervalFinishedBy] || param[util.timeURI.intervalFinishedBy];
        if (intervalFinishedBy) this.#intervalFinishedBy.set(intervalFinishedBy);
        const intervalFinishes = param[util.timeIRI.intervalFinishes] || param[util.timeURI.intervalFinishes];
        if (intervalFinishes) this.#intervalFinishes.set(intervalFinishes);
        const intervalIn = param[util.timeIRI.intervalIn] || param[util.timeURI.intervalIn];
        if (intervalIn) this.#intervalIn.set(intervalIn);
        const intervalMeets = param[util.timeIRI.intervalMeets] || param[util.timeURI.intervalMeets];
        if (intervalMeets) this.#intervalMeets.set(intervalMeets);
        const intervalMetBy = param[util.timeIRI.intervalMetBy] || param[util.timeURI.intervalMetBy];
        if (intervalMetBy) this.#intervalMetBy.set(intervalMetBy);
        const intervalOverlappedBy = param[util.timeIRI.intervalOverlappedBy] || param[util.timeURI.intervalOverlappedBy];
        if (intervalOverlappedBy) this.#intervalOverlappedBy.set(intervalOverlappedBy);
        const intervalOverlaps = param[util.timeIRI.intervalOverlaps] || param[util.timeURI.intervalOverlaps];
        if (intervalOverlaps) this.#intervalOverlaps.set(intervalOverlaps);
        const intervalStartedBy = param[util.timeIRI.intervalStartedBy] || param[util.timeURI.intervalStartedBy];
        if (intervalStartedBy) this.#intervalStartedBy.set(intervalStartedBy);
        const intervalStarts = param[util.timeIRI.intervalStarts] || param[util.timeURI.intervalStarts];
        if (intervalStarts) this.#intervalStarts.set(intervalStarts);
    } // ProperInterval#constructor

    get intervalAfter() {
        return this.#intervalAfter;
    }

    get intervalBefore() {
        return this.#intervalBefore;
    }

    get intervalContains() {
        return this.#intervalContains;
    }

    get intervalDisjoint() {
        return this.#intervalDisjoint;
    }

    get intervalDuring() {
        return this.#intervalDuring;
    }

    get intervalEquals() {
        return this.#intervalEquals;
    }

    get intervalFinishedBy() {
        return this.#intervalFinishedBy;
    }

    get intervalFinishes() {
        return this.#intervalFinishes;
    }

    get intervalIn() {
        return this.#intervalIn;
    }

    get intervalMeets() {
        return this.#intervalMeets;
    }

    get intervalMetBy() {
        return this.#intervalMetBy;
    }

    get intervalOverlappedBy() {
        return this.#intervalOverlappedBy;
    }

    get intervalOverlaps() {
        return this.#intervalOverlaps;
    }

    get intervalStartedBy() {
        return this.#intervalStartedBy;
    }

    get intervalStarts() {
        return this.#intervalStarts;
    }

    lock() {
        super.lock();
        this.#intervalAfter.lock();
        this.#intervalBefore.lock();
        this.#intervalContains.lock();
        this.#intervalDisjoint.lock();
        this.#intervalDuring.lock();
        this.#intervalEquals.lock();
        this.#intervalFinishedBy.lock();
        this.#intervalFinishes.lock();
        this.#intervalIn.lock();
        this.#intervalMeets.lock();
        this.#intervalMetBy.lock();
        this.#intervalOverlappedBy.lock();
        this.#intervalOverlaps.lock();
        this.#intervalStartedBy.lock();
        this.#intervalStarts.lock();
        return this;
    } // ProperInterval#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#intervalAfter.empty) result[util.timeIRI.intervalAfter] = this.#intervalAfter.toJSON();
        if (!this.#intervalBefore.empty) result[util.timeIRI.intervalBefore] = this.#intervalBefore.toJSON();
        if (!this.#intervalContains.empty) result[util.timeIRI.intervalContains] = this.#intervalContains.toJSON();
        if (!this.#intervalDisjoint.empty) result[util.timeIRI.intervalDisjoint] = this.#intervalDisjoint.toJSON();
        if (!this.#intervalDuring.empty) result[util.timeIRI.intervalDuring] = this.#intervalDuring.toJSON();
        if (!this.#intervalEquals.empty) result[util.timeIRI.intervalEquals] = this.#intervalEquals.toJSON();
        if (!this.#intervalFinishedBy.empty) result[util.timeIRI.intervalFinishedBy] = this.#intervalFinishedBy.toJSON();
        if (!this.#intervalFinishes.empty) result[util.timeIRI.intervalFinishes] = this.#intervalFinishes.toJSON();
        if (!this.#intervalIn.empty) result[util.timeIRI.intervalIn] = this.#intervalIn.toJSON();
        if (!this.#intervalMeets.empty) result[util.timeIRI.intervalMeets] = this.#intervalMeets.toJSON();
        if (!this.#intervalMetBy.empty) result[util.timeIRI.intervalMetBy] = this.#intervalMetBy.toJSON();
        if (!this.#intervalOverlappedBy.empty) result[util.timeIRI.intervalOverlappedBy] = this.#intervalOverlappedBy.toJSON();
        if (!this.#intervalOverlaps.empty) result[util.timeIRI.intervalOverlaps] = this.#intervalOverlaps.toJSON();
        if (!this.#intervalStartedBy.empty) result[util.timeIRI.intervalStartedBy] = this.#intervalStartedBy.toJSON();
        if (!this.#intervalStarts.empty) result[util.timeIRI.intervalStarts] = this.#intervalStarts.toJSON();
        return result;
    } // ProperInterval#toJSON

} // ProperInterval

module.exports = ProperInterval;
