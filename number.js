Object.defineProperty(Number.prototype, "between", {
  /**
   * @param {number} [min]
   * @param {number} [max]
   * @returns {boolean}
   */
  value (min = -Infinity, max = Infinity) {
    return (this >= min && this <= max);
  },
  enumerable: false
});

Object.defineProperty(Number.prototype, "clamp", {
  /**
   * @param {number} [min]
   * @param {number} [max]
   * @returns {number}
   */
  value (min = -Infinity, max = Infinity) {
    return Math.max(min, Math.min(this, max));
  },
  enumerable: false
});

Object.defineProperty(Number.prototype, "map", {
  /**
   * @param {number} fromMin
   * @param {number} fromMax
   * @param {number} [toMin]
   * @param {number} [toMax]
   * @returns {number}
   */
  value (fromMin, fromMax, toMin = 0, toMax = 1) {
    return (this - fromMin) * ((toMax - toMin) / (fromMax - fromMin)) + toMin;
  },
  enumerable: false
});

Object.defineProperty(Number.prototype, "normalize", {
  /**
   * @param {number} divisor
   * @returns {number}
   */
  value (divisor) {
    return (this / divisor);
  },
  enumerable: false
});

Object.defineProperty(Number.prototype, "round", {
  /**
   * @param {number} [step]
   * @returns {number}
   */
  value (step = 1) {
    const roundStep = Math.round(this / step);
    const resultStep = (roundStep * step);

    let exponent = 0;
    let standard = step;
    while (standard < 1) {
      standard *= 10;
      exponent++;
    }
    const E = (10 ** exponent);

    const roundExponent = Math.round(resultStep * E);
    const resultExponent = (roundExponent / E);

    return resultExponent;
  },
  enumerable: false
});


export default Number;
