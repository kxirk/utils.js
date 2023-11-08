/**
 * @param {...number} args
 * @returns {number}
 */
Math.sum = (...args) => args.reduce((sum, i) => (sum + i), 0);

/**
 * @param {...number} args
 * @returns {number}
 */
Math.average = (...args) => (Math.sum(...args) / args.length);

/**
 * @param {number} n
 * @param {number} [base]
 * @returns {number}
 */
Math.log = (n, base = Math.E) => (Math.log10(n) / Math.log10(base));


export default Math;
