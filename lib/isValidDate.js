// Function to validate a date passed

const isValidDate = (date) => {
  return date instanceof Date && !Number.isNaN(date);
};

module.exports = { isValidDate };
