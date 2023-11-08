/**
 * @param {Object} object
 * @param {Class} [Stop]
 * @returns {string[]}
 */
Object.getAllPropertyNames = (object, Stop = Object) => {
  const prototype = Object.getPrototypeOf(object);
  const inherited = ((object instanceof Stop) ? Object.getAllPropertyNames(prototype, Stop) : []);

  const all = Object.getOwnPropertyNames(object).concat(inherited);
  const set = new Set(all);

  return Array.from(set);
};


/**
 * @param {Object} object
 * @param {...Class} sources
 * @returns {Object}
 */
Object.assignGettersAsEnumerable = (object, ...sources) => {
  for (const Source of sources.reverse()) {
    const prototypeDescriptors = Object.getOwnPropertyDescriptors(Source.prototype);

    for (const [property, descriptor] of Object.entries(prototypeDescriptors)) {
      if (descriptor.get instanceof Function) {
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
      Object.assign(copyDescriptor, { get: () => source[property], enumerable: true });
    }
    if (descriptor.set instanceof Function) {
      Object.assign(copyDescriptor, { set: (value) => { source[property] = value; } });
    }

    Object.defineProperty(object, propertyName(property), copyDescriptor);
  }

  return object;
};


export default Object;
