Object.defineProperty(String.prototype, "insert", {
  /**
   * @param {string} term
   * @param {number} [index]
   * @returns {string}
   */
  value (term, index = this.length) {
    return this.slice(0, index).concat(term, this.slice(index));
  },
  enumerable: false
});


export default String;
