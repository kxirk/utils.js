/**
 * @param {Object} object
 * @param {...Class} Sources
 * @modifies {object}
 * @returns {Object} object
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
 * @modifies {object}
 * @returns {Object} object
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

  return Array.from(Object.keys(all));
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


export default Object;
