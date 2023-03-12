/**
 * @param {string} term
 * @param {number} [index]
 * @returns {string}
 */
String.prototype.insert = function (term, index = this.length) {
  return this.slice(0, index).concat(term, this.slice(index));
};
