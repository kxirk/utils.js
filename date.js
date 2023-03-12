/**
 * @returns {string}
 */
Date.prototype.toISODateString = function () {
  return this.toISOString().split("T")[0];
};

/**
 * @returns {string}
 */
Date.prototype.toISOTimeString = function () {
  return (this.toISOString().split("T")[1]).split(".")[0];
};

/**
 * @returns {string}
 */
Date.prototype.toISOStringBasic = function () {
  return (`${this.toISODateString()}T${this.toISOTimeString()}Z`);
};
