const {
  registerTimezone,
  registerAbbreviatedTimezone,
  reset,
} = require('./src/index');

// Mocking using registerTimezone function
(function () {
  const getTimeZone = function () {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  };
  const currentTimezone = getTimeZone(); // Current user's timezone

  // Mocking the browser's timezone.

  registerTimezone('Europe/Paris');

  getTimeZone(); // "Europe/Paris"

  registerTimezone('America/Los_Angeles');

  getTimeZone(); // "America/Los_Angeles"

  // Defaulting back to user's timezone
  reset();

  const resetTimezone = getTimeZone();

  console.log(currentTimezone === resetTimezone); // true
})();

// Mocking using registerAbbreviatedTimezone function

(function () {
  const getAbbreviatedTimeZone = function (date = new Date()) {
    return new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find((locale) => locale.type === 'timeZoneName').value;
  };

  const currentAbbreviatedTimezone = getAbbreviatedTimeZone(); // Current user's timezone

  // Mocking the browser's abbreviated timezone.

  registerAbbreviatedTimezone('CET');

  getAbbreviatedTimeZone(); // "CET"

  registerAbbreviatedTimezone('PST');

  getAbbreviatedTimeZone(); // "PST"

  // Defaulting back to user's timezone
  reset();

  const resetAbbreviatedTimezone = getAbbreviatedTimeZone();

  console.log(currentAbbreviatedTimezone === resetAbbreviatedTimezone); // true
})();
