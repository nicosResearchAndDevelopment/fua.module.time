const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class Instant extends model.TemporalEntity {

    // TODO rework with object and datatype properties

    #inDateTime         = null;
    #inTemporalPosition = null;
    #inTimePosition     = null;
    #inXSDDate          = null;
    #inXSDDateTimeStamp = null;
    #inXSDgYear         = null;
    #inXSDgYearMonth    = null;

    constructor(param) {
        super(param);
        const inDateTime = param[util.timeIRI.inDateTime] || param[util.timeURI.inDateTime];
        if (inDateTime) this.#inDateTime = model.GeneralDateTimeDescription.from(inDateTime);
        const inTemporalPosition = param[util.timeIRI.inTemporalPosition] || param[util.timeURI.inTemporalPosition];
        if (inTemporalPosition) this.#inTemporalPosition = model.TemporalPosition.from(inTemporalPosition);
        const inTimePosition = param[util.timeIRI.inTimePosition] || param[util.timeURI.inTimePosition];
        if (inTimePosition) this.#inTimePosition = model.TimePosition.from(inTimePosition);
        const inXSDDate = param[util.timeIRI.inXSDDate] || param[util.timeURI.inXSDDate];
        if (inXSDDate) this.#inXSDDate = model.date.from(inXSDDate);
        const inXSDDateTimeStamp = param[util.timeIRI.inXSDDateTimeStamp] || param[util.timeURI.inXSDDateTimeStamp];
        if (inXSDDateTimeStamp) this.#inXSDDateTimeStamp = model.dateTimeStamp.from(inXSDDateTimeStamp);
        const inXSDgYear = param[util.timeIRI.inXSDgYear] || param[util.timeURI.inXSDgYear];
        if (inXSDgYear) this.#inXSDgYear = model.gYear.from(inXSDgYear);
        const inXSDgYearMonth = param[util.timeIRI.inXSDgYearMonth] || param[util.timeURI.inXSDgYearMonth];
        if (inXSDgYearMonth) this.#inXSDgYearMonth = model.gYearMonth.from(inXSDgYearMonth);
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

    toJSON() {
        const result = super.toJSON();
        if (this.#inDateTime) result[util.timeIRI.inDateTime] = this.#inDateTime;
        if (this.#inTemporalPosition) result[util.timeIRI.inTemporalPosition] = this.#inTemporalPosition;
        if (this.#inTimePosition) result[util.timeIRI.inTimePosition] = this.#inTimePosition;
        if (this.#inXSDDate) result[util.timeIRI.inXSDDate] = this.#inXSDDate;
        if (this.#inXSDDateTimeStamp) result[util.timeIRI.inXSDDateTimeStamp] = this.#inXSDDateTimeStamp;
        if (this.#inXSDgYear) result[util.timeIRI.inXSDgYear] = this.#inXSDgYear;
        if (this.#inXSDgYearMonth) result[util.timeIRI.inXSDgYearMonth] = this.#inXSDgYearMonth;
        return result;
    } // Instant#toJSON

} // Instant

module.exports = Instant;
