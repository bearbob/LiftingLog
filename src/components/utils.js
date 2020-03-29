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
    if(isSecondLiftBetter(a.weight, a.reps, b.weight, b.reps)) {
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
  return logArray.reduce((a, b) => {
    if(isSecondLiftBetter(a.weight, a.reps, b.weight, b.reps)) {
      return a;
    }
    return b;
  });
};

/**
 * @public
 * Sorts the log objects in the given array by their date property in
 * descending order and returns the number of elements defined by "amount"
 * @static
 * @param {array} logArray - The array to get the logs from
 * @param {integer} amount - The maximum number of elements in the returned array
 * @param {boolean} [groupByWeek] - Group results by calendar week
 * @returns {array}
 */
export const getLastLogs = (logArray, amount, groupByWeek) => {
  if(logArray.length < 1) return [];
  var sortedArray = logArray.sort((a, b) => (a.date > b.date) ? -1 : 1);
  if(!groupByWeek) {
    return sortedArray.slice(0, amount);
  }
  //group the entries by calendar week
  var groupedArray = [sortedArray[0]];
  for(let i=0; i<sortedArray.length; i++) {
    let current = sortedArray[i];
    let last = groupedArray[groupedArray.length-1];

    if(getWeekNumber(current.date)[0] === getWeekNumber(last.date)[0] &&
      getWeekNumber(current.date)[1] === getWeekNumber(last.date)[1]
    ) {
      //same calendar week, replace last element
      groupedArray[groupedArray.length-1] = (current.weight > last.weight)?current:last;
    } else {
      groupedArray.push(current);
    }
    if(groupedArray.length >= amount) {
      return groupedArray;
    }
  }
  return groupedArray;
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

/**
 * For a given date, get the ISO week number
 *
 * Based on information at:
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 * Copied from https://stackoverflow.com/a/6117889
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 * @public
 * @static
 * @param {string} date - String representation of a date object
 * @returns {array} Array with the year as first element and the number of the calender week of the date as second element
 */
export const getWeekNumber = (date) => {
    // Copy date so don't modify original
    var d = new Date(date);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
};

/**
 * @public
 * Given two lifts, returns true if the second lift is better
 * @param {double} aWeight The weight of the first lift
 * @param {integer} aReps The number of repititions of the first lift
 * @param {double} bWeight The weight of the second lift
 * @param {integer} bReps The number of repititions of the second lift
 * @returns {boolean} True, if the second lift is better
 */
export const isSecondLiftBetter = (aWeight, aReps, bWeight, bReps) => {
  return (
    (!aWeight || !aReps) ||
    bWeight > aWeight ||
    (bWeight >= aWeight && bReps > aReps)
  );
};
