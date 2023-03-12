/**
 * @returns {*}
 */
Object.defineProperty(Array.prototype, "first", {
  get () { return this[0]; },
  enumerable: false
});

/**
 * @returns {*}
 */
Object.defineProperty(Array.prototype, "last", {
  get () { return this[this.length - 1]; },
  enumerable: false
});

/**
 * @returns {boolean}
 */
Object.defineProperty(Array.prototype, "empty", {
  get () { return (this.length === 0); },
  enumerable: false
});


/**
 * @param {*} element
 * @param {number} [index]
 * @returns {*[]}
 */
Array.prototype.insert = function (element, index = this.length) {
  this.splice(index, 0, element);
  return this;
};

/**
 * @param {number} index
 * @returns {*}
 */
Array.prototype.remove = function (index) {
  return this.splice(index, 1)[0];
};

/**
 * @param {...*} elements
 * @returns {*[]}
 */
Array.prototype.write = function (...elements) {
  this.splice(0, this.length, ...elements);
  return this;
};

/**
 * @param {number} i
 * @param {number} j
 * @returns {*[]}
 */
Array.prototype.swap = function (i, j) {
  [this[i], this[j]] = [this[j], this[i]];

  return this;
};

/**
 * @param {number} [start]
 * @param {number} [end]
 * @returns {*[]}
 */
Array.prototype.reverse = function (start = 0, end = this.length - 1) {
  for (let i = start, j = end; i < j; i++, j--) {
    this.swap(i, j);
  }

  return this;
};

/**
 * @returns {*[]}
 */
Array.prototype.permute = function () {
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
};

/**
 * @param {number} [min]
 * @param {number} [max]
 * @returns {number} integer [min, max)
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * @typedef {Object} Entry
 * @property {number} index
 * @property {*} element
 */
/**
 * @param {*[]} array
 * @param {Function} [random]
 * @returns {Entry}
 */
Array.prototype.random = function (random = randomInt) {
  const index = random(0, this.length);
  const element = this[index];

  return { index, element };
};

/**
 * @param {Function} [random]
 * @returns {*[]}
 */
Array.prototype.shuffle = function (random = randomInt) {
  for (let i = this.length - 1; i > 0; i--) {
    const j = random(0, i + 1);
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
};
