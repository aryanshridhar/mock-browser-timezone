const { registerTimezone } = require('../src/index');
const { getResolvedTimezone } = require('../lib/resolvedProperties');

test('Test timezone', () => {
  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    getResolvedTimezone()
  );

  // Mocking

  registerTimezone('America/Los_Angeles');

  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    'America/Los_Angeles'
  );

  registerTimezone('Asia/Kolkata');

  expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
    'Asia/Kolkata'
  );

  // Passing an invalid timezone

  expect(() => {
    registerTimezone('America/Random_timezone');
  }).toThrow(Error('Invalid timezone detected.'));
});
