const timezones = require('../static/timezones.json');
const { isValid } = require('../lib/isValid');

function mockTimezone() {
  const locale_properties = new Intl.DateTimeFormat().resolvedOptions();
  const initial_formatted_properties = new Intl.DateTimeFormat([], {
    timeZoneName: 'short',
  }).formatToParts(new Date());

  const valid_timezones = timezones.tz;
  const valid_abbreviated_timezones = timezones.abbreviated_tz;

  this.register_timezone = function (timezone) {
    if (!valid_timezones.includes(timezone)) {
      throw new Error('Invalid timezone detected.');
    }
    Intl.DateTimeFormat.prototype.resolvedOptions = function () {
      const mocked_properties = {
        ...locale_properties,
        timeZone: timezone,
      };
      return mocked_properties;
    };
  };

  this.register_abbreviated_timezone = function (time, abbreviated_timezone) {
    if (!valid_abbreviated_timezones.includes(abbreviated_timezone)) {
      throw new Error('Invalid abbreviated timezone detected.');
    }

    if (!isValid(time)) {
      throw new TypeError('Invalid type specified for time parameter.');
    }
    const formatted_properties = new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    }).formatToParts(time);

    Intl.DateTimeFormat.prototype.formatToParts = function () {
      formatted_properties.forEach((locale) => {
        if (locale.type === 'timeZoneName') {
          locale.value = abbreviated_timezone;
        }
      });

      return formatted_properties;
    };
  };

  this.reset = function () {
    Intl.DateTimeFormat.prototype.resolvedOptions = function () {
      return locale_properties;
    };
    Intl.DateTimeFormat.prototype.formatToParts = function () {
      return initial_formatted_properties;
    };
  };
}

(function () {
  const mock_timezone = new mockTimezone();

  const register_timezone = mock_timezone.register_timezone;
  const register_abbreviated_timezone =
    mock_timezone.register_abbreviated_timezone;
  const reset = mock_timezone.reset;

  module.exports = {
    register_timezone,
    register_abbreviated_timezone,
    reset,
  };
})();
