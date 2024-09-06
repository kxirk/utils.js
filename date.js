/** @enum {Map<string, number>} */
const units = new Map([
  ["milliseconds", 1],
  ["seconds", 1000],
  ["minutes", 60],
  ["hours", 60],
  ["days", 24],
  ["years", 365]
]);

/**
 * @param {number} ms
 * @param {string} unit
 * @returns {number}
 */
const convert = (ms, unit) => {
  let total = ms;

  for (const [u, rate] of units) {
    total /= rate;
    if (u === unit) break;
  }

  return total;
};
Date.seconds = (ms) => convert(ms, "seconds");
Date.minutes = (ms) => convert(ms, "minutes");
Date.hours = (ms) => convert(ms, "hours");
Date.days = (ms) => convert(ms, "days");
Date.years = (ms) => convert(ms, "years");

/**
 * @param {number} ms
 * @param {boolean} [abbreviate]
 * @returns {string}
 */
Date.standard = (ms, abbreviate = true) => {
  let total = ms;
  let unit = "milliseconds";

  for (const [u, rate] of units) {
    const check = total / rate;
    if (check < 1) break;

    total /= rate;
    unit = u;
  }

  if (abbreviate) {
    unit = unit[0];
  }
  return `${total.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 1 })}${unit}`;
};


export default Date;
