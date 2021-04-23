const timezones = require('../static/timezones.json');
const { isValidDate } = require('../lib/isValidDate');

function MockTimezone() {
  const localeProperites = new Intl.DateTimeFormat().resolvedOptions();
  const formattedProperties = new Intl.DateTimeFormat([], {
    timeZoneName: 'short',
  }).formatToParts(new Date());

  const validTimezones = timezones.tz;
  const validAbbreviatedTimezones = timezones.abbreviated_tz;

  this.registerTimezone = function (timezone) {
    if (!validTimezones.includes(timezone)) {
      throw new Error('Invalid timezone detected.');
    }
    Intl.DateTimeFormat.prototype.resolvedOptions = function () {
      const mockedProperties = {
        ...localeProperites,
        timeZone: timezone,
      };
      return mockedProperties;
    };
  };

  // Read https://stackoverflow.com/tags/timezone/info for more info regarding the ambiguity
  // that can occur while determining the user's abbreviated timezone.
  this.registerAbbreviatedTimezone = function (
    abbreviatedTimezone,
    date = new Date()
  ) {
    if (!validAbbreviatedTimezones.includes(abbreviatedTimezone)) {
      throw new Error('Invalid abbreviated timezone detected.');
    }

    if (!isValidDate(date)) {
      throw new TypeError('Invalid date specified.');
    }

    Intl.DateTimeFormat.prototype.formatToParts = function () {
      const mockedTimezone = {
        type: 'timeZoneName',
        value: abbreviatedTimezone,
      };
      const mockedProperties = formattedProperties.filter(
        (locale) => locale.type !== 'timeZoneName'
      );
      mockedProperties.push(mockedTimezone);
      return mockedProperties;
    };
  };

  this.reset = function () {
    Intl.DateTimeFormat.prototype.resolvedOptions = function () {
      return localeProperites;
    };
    Intl.DateTimeFormat.prototype.formatToParts = function () {
      return formattedProperties;
    };
  };
}

(function () {
  const mockTz = new MockTimezone();

  const { registerTimezone } = mockTz;
  const { registerAbbreviatedTimezone } = mockTz;
  const { reset } = mockTz;

  module.exports = {
    registerTimezone,
    registerAbbreviatedTimezone,
    reset,
  };
})();
