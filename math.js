/**
 * @param {...number} numbers
 * @returns {number}
 */
Math.average = (...numbers) => {
  if (numbers.length === 0) return 0;

  return (Math.sum(...numbers) / numbers.length);
};

/**
 * @param {number} number
 * @param {number} [base]
 * @returns {number}
 */
Math.log = (number, base = Math.E) => (Math.log10(number) / Math.log10(base));

/**
 * @param {...number} numbers
 * @returns {number}
 */
Math.sum = (...numbers) => numbers.reduce((sum, i) => (sum + i), 0);


export default Math;
