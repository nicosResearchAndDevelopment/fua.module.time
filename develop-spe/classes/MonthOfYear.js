const
    util  = require('../module.time.util.js'),
    model = require('../module.time.model.js');

class MonthOfYear extends model.DateTimeDescription {

    constructor(param) {
        super(param);
        if (!super.day.empty) throw new Error('day must be empty for MonthOfYear');
        if (!super.hour.empty) throw new Error('hour must be empty for MonthOfYear');
        if (!super.minute.empty) throw new Error('minute must be empty for MonthOfYear');
        if (!super.second.empty) throw new Error('second must be empty for MonthOfYear');
        if (!super.week.empty) throw new Error('week must be empty for MonthOfYear');
        if (!super.year.empty) throw new Error('year must be empty for MonthOfYear');
        if (super.month.empty) throw new Error('month must not be empty for MonthOfYear');
        if (!model.unitMonth.equals(super.unitType.get()))
            throw new Error('unitType must be unitMonth for MonthOfYear');
    } // MonthOfYear#constructor

} // MonthOfYear

module.exports = MonthOfYear;
