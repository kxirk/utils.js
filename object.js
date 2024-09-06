/**
 * @param {Object} object
 * @param {...Class} Sources
 * @returns {Object}
 */
Object.assignGettersAsEnumerable = (object, ...Sources) => {
  for (const Source of Sources.reverse()) {
    const prototypeDescriptors = Object.getOwnPropertyDescriptors(Source.prototype);

    for (const [property, descriptor] of Object.entries(prototypeDescriptors)) {
      if (descriptor.get instanceof Function) {
        descriptor.configurable = true;
        descriptor.enumerable = true;
        Object.defineProperty(object, property, descriptor);
      }
    }
  }

  return object;
};

/**
 * @function propertyName
 * @param {string} property
 * @returns {string}
 */
/**
 * @param {Object} object
 * @param {Object} source
 * @param {Function} [propertyName]
 * @returns {Object}
 */
Object.assignGettersSettersAs = (object, source, propertyName = (property) => property) => {
  const prototypeDescriptors = Object.getOwnPropertyDescriptors(source.constructor.prototype);

  for (const [property, descriptor] of Object.entries(prototypeDescriptors)) {
    const copyDescriptor = {};
    if (descriptor.get instanceof Function) {
      Object.assign(copyDescriptor, { get: () => source[property], configurable: true, enumerable: true });
    }
    if (descriptor.set instanceof Function) {
      Object.assign(copyDescriptor, { set: (value) => { source[property] = value; }, configurable: true });
    }

    Object.defineProperty(object, propertyName(property), copyDescriptor);
  }

  return object;
};

/**
 * @param {Object} object
 * @param {Class} [Stop]
 * @param {boolean} [includeStop]
 * @returns {string[]}
 */
Object.getAllPropertyNames = (object, Stop = Object, includeStop = false) => {
  if (!includeStop && (object === Stop.prototype)) return [];

  const prototype = Object.getPrototypeOf(object);
  const inherited = ((object instanceof Stop) ? Object.getAllPropertyNames(prototype, Stop) : []);

  const all = Object.getOwnPropertyNames(object).concat(inherited);
  const set = new Set(all);

  return Array.from(set);
};

/**
 * @param {Class} Base
 * @param {Class} [Stop]
 * @param {boolean} [includeStop]
 * @returns {Class[]}
 */
Object.getPrototypeChain = (Base, Stop = null, includeStop = false) => {
  const chain = []; let Current = Base;
  while (Current !== Stop) {
    chain.push(Current);
    Current = Object.getPrototypeOf(Current);
  }
  if (includeStop) chain.push(Stop);

  return chain;
};


Object.defineProperty(Object.prototype, "size", {
  /** @type {number} */
  get () { return Object.keys(this).length; },
  enumerable: false
});

Object.defineProperty(Object.prototype, "clear", {
  value () {
    for (const property of Object.getOwnPropertyNames(this)) {
      delete this[property];
    }
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "delete", {
  /**
   * @param {string} key
   * @returns {boolean}
   */
  value (key) {
    const present = (key in this);

    delete this[key];

    const deleted = !(key in this);

    if (present && deleted) return true;
    return false;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "entries", {
  /** @typedef {[string, *]} Entry */
  /** @returns {Entry[]}  */
  value () {
    return Object.entries(this);
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "has", {
  /**
   * @param {string} key
   * @returns {boolean}
   */
  value (key) {
    return (key in this);
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "keys", {
  /** @returns {string[]} */
  value () {
    return Object.keys(this);
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "values", {
  /** @returns {*[]} */
  value () {
    return Object.values(this);
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, Symbol.iterator, {
  /** @type {Iterator<*>} */
  value () {
    return Object.entries(this)[Symbol.iterator]();
  },
  enumerable: false
});


export default Object;
