// Function to return the formatted properties.

const getFormattedProperties = () => {
  return new Intl.DateTimeFormat([], {
    timeZoneName: 'short',
  }).formatToParts(new Date());
};

const getFormattedTimezone = () => {
  const timeZone = getFormattedProperties().find(
    (locale) => locale.type === 'timeZoneName'
  ).value;

  return timeZone;
};

module.exports = { getFormattedProperties, getFormattedTimezone };
