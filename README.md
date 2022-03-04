# fua.module.time

[motic.decide, binary operator, `time`](https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/time.md)

## Ideas & ToDos

- calendar week of the year
- day of the year to calendar week calculation
- _module.time.Year_: implement week class and get weeks of year

## Default configuration

```javascript
const time = require('fua.module.time')({
    /** @type {String} used as prefix for all '@id's on the types */
    'namespace': "time",
    /** @type {Boolean} if set to true, creates concrete time instances with an '@id' */
    'setInstanceId': true,
    /** @type {String} if setInstanceId is enabled, this will be used as first part of the '@id' */
    'root': "1/"
});
```

## Types

```javascript
const instant = new time.Instant(
    new Date()
);

const proper_interval = new time.ProperInterval(
    new Date(0),
    new Date()
);
```

## Methods

### Before, After, Meets, MetBy, Overlaps, OverlappedBy, Starts, StartedBy, During, Contains, Finishes, FinishedBy, Equals, In, Disjoint

```javascript
/** @type {Boolean} */
const result = time[METHOD](temporalEntity1, temporalEntity2);
```

## addons

[here](./src/addon/README.md)


---
