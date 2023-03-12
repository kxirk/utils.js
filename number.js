/**
 * @param {number} [min]
 * @param {number} [max]
 * @returns {number}
 */
Number.prototype.clamp = function (min = -Infinity, max = Infinity) {
  return Math.max(min, Math.min(this, max));
};

/**
 * @param {number} [min]
 * @param {number} [max]
 * @returns {boolean}
 */
Number.prototype.between = function (min = -Infinity, max = Infinity) {
  return (this >= min && this <= max);
};

/**
 * @param {number} divisor
 * @returns {number}
 */
Number.prototype.normalize = function (divisor) {
  return (this / divisor);
};

/**
 * @param {number} [digits]
 * @returns {number}
 */
Number.prototype.round = function (digits = 0) {
  const exponent = (10 ** digits);

  const round = Math.round((this + Number.EPSILON) * exponent);
  return (round / exponent);
};
