const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Instant extends model.TemporalEntity {

    #inDateTime         = new model._ObjectProperty(model.GeneralDateTimeDescription);
    #inTemporalPosition = new model._ObjectProperty(model.TemporalPosition);
    #inTimePosition     = new model._ObjectProperty(model.TimePosition);
    #inXSDDate          = new model._DatatypeProperty(model.date);
    #inXSDDateTimeStamp = new model._DatatypeProperty(model.dateTimeStamp);
    #inXSDgYear         = new model._DatatypeProperty(model.gYear);
    #inXSDgYearMonth    = new model._DatatypeProperty(model.gYearMonth);

    constructor(param) {
        super(param);
        const inDateTime = param[util.timeIRI.inDateTime] || param[util.timeURI.inDateTime];
        if (inDateTime) this.#inDateTime.set(inDateTime);
        const inTemporalPosition = param[util.timeIRI.inTemporalPosition] || param[util.timeURI.inTemporalPosition];
        if (inTemporalPosition) this.#inTemporalPosition.set(inTemporalPosition);
        const inTimePosition = param[util.timeIRI.inTimePosition] || param[util.timeURI.inTimePosition];
        if (inTimePosition) this.#inTimePosition.set(inTimePosition);
        const inXSDDate = param[util.timeIRI.inXSDDate] || param[util.timeURI.inXSDDate];
        if (inXSDDate) this.#inXSDDate.set(inXSDDate);
        const inXSDDateTimeStamp = param[util.timeIRI.inXSDDateTimeStamp] || param[util.timeURI.inXSDDateTimeStamp];
        if (inXSDDateTimeStamp) this.#inXSDDateTimeStamp.set(inXSDDateTimeStamp);
        const inXSDgYear = param[util.timeIRI.inXSDgYear] || param[util.timeURI.inXSDgYear];
        if (inXSDgYear) this.#inXSDgYear.set(inXSDgYear);
        const inXSDgYearMonth = param[util.timeIRI.inXSDgYearMonth] || param[util.timeURI.inXSDgYearMonth];
        if (inXSDgYearMonth) this.#inXSDgYearMonth.set(inXSDgYearMonth);
    } // Instant#constructor

    get inDateTime() {
        return this.#inDateTime;
    }

    get inTemporalPosition() {
        return this.#inTemporalPosition;
    }

    get inTimePosition() {
        return this.#inTimePosition;
    }

    get inXSDDate() {
        return this.#inXSDDate;
    }

    get inXSDDateTimeStamp() {
        return this.#inXSDDateTimeStamp;
    }

    get inXSDgYear() {
        return this.#inXSDgYear;
    }

    get inXSDgYearMonth() {
        return this.#inXSDgYearMonth;
    }

    lock() {
        super.lock();
        this.#inDateTime.lock();
        this.#inTemporalPosition.lock();
        this.#inTimePosition.lock();
        this.#inXSDDate.lock();
        this.#inXSDDateTimeStamp.lock();
        this.#inXSDgYear.lock();
        this.#inXSDgYearMonth.lock();
        return this;
    } // Instant#lock

    toJSON() {
        const result = super.toJSON();
        if (!this.#inDateTime.empty) result[util.timeIRI.inDateTime] = this.#inDateTime.toJSON();
        if (!this.#inTemporalPosition.empty) result[util.timeIRI.inTemporalPosition] = this.#inTemporalPosition.toJSON();
        if (!this.#inTimePosition.empty) result[util.timeIRI.inTimePosition] = this.#inTimePosition.toJSON();
        if (!this.#inXSDDate.empty) result[util.timeIRI.inXSDDate] = this.#inXSDDate.toJSON();
        if (!this.#inXSDDateTimeStamp.empty) result[util.timeIRI.inXSDDateTimeStamp] = this.#inXSDDateTimeStamp.toJSON();
        if (!this.#inXSDgYear.empty) result[util.timeIRI.inXSDgYear] = this.#inXSDgYear.toJSON();
        if (!this.#inXSDgYearMonth.empty) result[util.timeIRI.inXSDgYearMonth] = this.#inXSDgYearMonth.toJSON();
        return result;
    } // Instant#toJSON

} // Instant

module.exports = Instant;
