const {
  registerAbbreviatedTimezone,
  registerTimezone,
  reset,
} = require('../src/index');
const { getResolvedTimezone } = require('../lib/resolvedProperties');
const { getFormattedTimezone } = require('../lib/formattedProperties');

test('Reset mocked timezone', () => {
  // We mock the value again to built and better abstraction.

  registerTimezone('America/Los_Angeles');
  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    'America/Los_Angeles'
  );

  reset();

  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    getResolvedTimezone()
  );

  registerTimezone('Europe/Paris');
  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    'Europe/Paris'
  );

  reset();

  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    getResolvedTimezone()
  );
});

test('Reset mocked abbreviated timezone', () => {
  registerAbbreviatedTimezone('ADT');
  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe('ADT');

  reset();

  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe(getFormattedTimezone());

  registerAbbreviatedTimezone('PDT');
  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe('PDT');

  reset();

  expect(
    new Intl.DateTimeFormat([], {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((locale) => locale.type === 'timeZoneName').value
  ).toBe(getFormattedTimezone());
});
