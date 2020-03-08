/**
 * @public
 * Sorts the log objects in the given array by their weight property in
 * descending order and returns the number of elements defined by "amount".
 * If two elements have the same weight property value, their reps property
 * is compared.
 * @static
 * @param {array} logArray - The array to get the logs from
 * @param {integer} amount - The maximum number of elements in the returned array
 * @returns {array}
 */
export const getBestLogs = (logArray, amount) => {
  return logArray.sort((a, b) => {
    if(a.weight > b.weight || (a.weight >= b.weight && a.reps > b.reps)) {
      return -1;
    }
    return 1;
  }).slice(0, amount);
};

/**
 * @public
 * Returns the log object in the given array with the highest weight property
 * value. If two elements have the same weight property value, their reps property
 * is compared.
 * @static
 * @param {array} logArray - The array to get the logs from
 * @returns {object}
 */
export const getBestLog = (logArray) => {
  return logArray.reduce((prev, current) => {
    if(prev.weight > current.weight || (prev.weight >= current.weight && prev.reps > current.reps)) {
      return prev;
    }
    return current;
  });
};

/**
 * @public
 * Sorts the log objects in the given array by their date property in
 * descending order and returns the number of elements defined by "amount"
 * @static
 * @param {array} logArray - The array to get the logs from
 * @param {integer} amount - The maximum number of elements in the returned array
 * @returns {array}
 */
export const getLastLogs = (logArray, amount) => {
  return logArray
          .sort((prev, current) => (prev.date > current.date) ? -1 : 1)
          .slice(0, amount);
};


/**
 * @public
 * Returns the log object in the given array with the latest date property value.
 * @static
 * @param {array} logArray - The array to get the logs from
 * @returns {object}
 */
export const getLastLog = (logArray) => {
  return logArray.reduce((prev, current) => (prev.date > current.date) ? prev : current);
};

/**
 * @public
 * Converts the given date object to a string with the format dd.MM.YYYY
 * @static
 * @param {date} date - A date object
 * @returns {string}
 */
export const formatDate = (date) => {
  if(!date) return "none";
  return date.getDate() +"."+(date.getMonth()+1)+"."+date.getFullYear();
};
