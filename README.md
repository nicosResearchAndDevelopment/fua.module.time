# fua.module.time

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