const { registerAbbreviatedTimezone } = require('../src/index');
const { getFormattedTimezone } = require('../lib/formattedProperties');

test('Test abbreviated timezone', () => {
  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe(getFormattedTimezone());

  // Mocking

  registerAbbreviatedTimezone('PST');

  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe('PST');

  registerAbbreviatedTimezone('IST');

  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe('IST');

  // Passing an invalid abbreviated timzone

  expect(() => {
    registerAbbreviatedTimezone('Random_timezone');
  }).toThrow(Error('Invalid abbreviated timezone detected.'));

  // Passing an invalid date value

  expect(() => {
    registerAbbreviatedTimezone('PST', 'Invalid date');
  }).toThrow(TypeError('Invalid date specified.'));
});
