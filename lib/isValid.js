// A function to validate a date.
const isValid = function (time) {
  return time instanceof Date && !isNaN(time);
};

module.exports = {
  isValid,
};
