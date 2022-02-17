const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class MonthOfYear extends model.DateTimeDescription {

    constructor(param) {
        super(param);
        if (super.day) throw new Error('day must be empty for MonthOfYear');
        if (super.hour) throw new Error('hour must be empty for MonthOfYear');
        if (super.minute) throw new Error('minute must be empty for MonthOfYear');
        if (super.second) throw new Error('second must be empty for MonthOfYear');
        if (super.week) throw new Error('week must be empty for MonthOfYear');
        if (super.year) throw new Error('year must be empty for MonthOfYear');
        if (!super.month) throw new Error('month must not be empty for MonthOfYear');
        if (super.unitType !== model.unitMonth && super.unitType.id !== model.unitMonth.id)
            throw new Error('unitType must be unitMonth for MonthOfYear');
    } // MonthOfYear#constructor

} // MonthOfYear

module.exports = MonthOfYear;
