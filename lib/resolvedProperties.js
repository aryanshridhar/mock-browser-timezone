// Function to return the resolved properties.

const getResolvedProperties = () => {
  return new Intl.DateTimeFormat().resolvedOptions();
};

const getResolvedTimezone = () => {
  return getResolvedProperties().timeZone;
};

module.exports = { getResolvedProperties, getResolvedTimezone };
