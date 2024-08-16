Object.defineProperty(Array.prototype, "first", {
  /** @type {*} */
  get () { return this[0]; },
  enumerable: false
});

Object.defineProperty(Array.prototype, "last", {
  /** @type {*} */
  get () { return this[this.length - 1]; },
  enumerable: false
});

Object.defineProperty(Array.prototype, "empty", {
  /** @type {boolean} */
  get () { return (this.length === 0); },
  enumerable: false
});


Object.defineProperty(Array.prototype, "clear", {
  /** @returns {*[]} */
  value () {
    return this.splice(0, this.length);
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "insert", {
  /**
   * @param {*} element
   * @param {number} [index]
   * @returns {*[]}
   */
  value (element, index = this.length) {
    this.splice(index, 0, element);

    return this;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "permute", {
  /** @returns {*[]}  */
  value () {
    let start = this.length - 2;
    while (start >= 0) {
      if (this[start] < this[start + 1]) break;
      start--;
    }

    if (start >= 0) {
      let end = this.length - 1;
      while (end > start) {
        if (this[end] > this[start]) break;
        end--;
      }

      this.swap(start, end);
    }
    this.reverse(start + 1);

    return this;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "remove", {
  /**
   * @param {number} index
   * @returns {*}
   */
  value (index) {
    return this.splice(index, 1)[0];
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "reverse", {
  /**
   * @param {number} [start]
   * @param {number} [end]
   * @returns {*[]}
   */
  value (start = 0, end = (this.length - 1)) {
    for (let i = start, j = end; i < j; i++, j--) this.swap(i, j);

    return this;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "swap", {
  /**
   * @param {number} i
   * @param {number} j
   * @returns {*[]}
   */
  value (i, j) {
    [this[i], this[j]] = [this[j], this[i]];

    return this;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "write", {
  /**
   * @param {...*} elements
   * @returns {*[]}
   */
  value (...elements) {
    this.splice(0, this.length, ...elements);

    return this;
  },
  enumerable: false
});


export default Array;
