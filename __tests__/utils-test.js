/**
 * @format
 */

import 'react-native';
import React from 'react';
import {
  getBestLog,
  getBestLogs,
  getLastLog,
  getLastLogs,
  formatDate,
  getWeekNumber,
  isSecondLiftBetter,
  weeksBetween,
  getNextWeek
} from '../src/components/utils';

const LOGENTRY_A = {
 "weight": 100,
 "reps": 5,
 "date": "2020-02-13T15:35:46.614Z", //cw 7
 "oneRM": 90,
 "score": 93.9
};
const LOGENTRY_B = {
 "weight": 62.5,
 "reps": 2,
 "date": "2020-02-19T08:44:42.042Z", //cw 8
 "oneRM": 65,
 "score": 67.8
};
const LOGENTRY_C = {
 "weight": 55,
 "reps": 10,
 "date": "2020-02-10T19:42:08.036Z", //cw 7
 "oneRM": 72.5,
 "score": 75.6
};

//################################# Test getBestLogs() //#################################

test('find best logs (n=1)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 1)[0].weight).toBe(LOGENTRY_A.weight);
  expect(getBestLogs(logs, 1)[0].weight).toBe(LOGENTRY_A.weight);
});

test('find best logs (n=2)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 2)[0].weight).toBe(LOGENTRY_A.weight);
  expect(getBestLogs(logs, 2)[1].weight).toBe(LOGENTRY_B.weight);
});

test('find best logs (n=0)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 0).length).toBe(0);
});

test('find best logs, check size', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 1).length).toBe(1);
  expect(getBestLogs(logs, 2).length).toBe(2);
  expect(getBestLogs(logs, 3).length).toBe(3);
});

test('best logs expected more than exist', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 4).length).toBe(3);
  expect(getBestLogs(logs, 5).length).toBe(3);
});

test('best logs request negative size', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, -1).length).toBe(0);
  expect(getBestLogs(logs, -2).length).toBe(0);
  expect(getBestLogs(logs, -3).length).toBe(0);
});

test('best logs from single', () => {
  var logs = [LOGENTRY_A];
  expect(getBestLogs(logs, 4)[0].weight).toBe(LOGENTRY_A.weight);
});

test('best logs from empty', () => {
  expect(getBestLogs([], 4).length).toBe(0);
  expect(getBestLogs().length).toBe(0);
});

test('best logs from null/undefined', () => {
  expect(getBestLogs(null, 1).length).toBe(0);
  expect(getBestLogs(undefined, 1).length).toBe(0);
});

test('best logs from null/undefined amount', () => {
  var logs = [LOGENTRY_A];
  expect(getBestLogs(logs, null).length).toBe(0);
  expect(getBestLogs(logs, undefined).length).toBe(0);
});

//################################# Test getBestLogs() & getBestLog() //#################################

test('compare getBestLog and getBestLogs (n=1)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLogs(logs, 1)[0].weight).toBe(getBestLog(logs).weight);
});

//################################# Test getBestLog() //#################################

test('find best log', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getBestLog(logs).weight).toBe(LOGENTRY_A.weight);
  logs = [LOGENTRY_B, LOGENTRY_C, LOGENTRY_A];
  expect(getBestLog(logs).weight).toBe(LOGENTRY_A.weight);
  logs = [LOGENTRY_C, LOGENTRY_B, LOGENTRY_A];
  expect(getBestLog(logs).weight).toBe(LOGENTRY_A.weight);
  logs = [LOGENTRY_C, LOGENTRY_A, LOGENTRY_B];
  expect(getBestLog(logs).weight).toBe(LOGENTRY_A.weight);
});

test('find best log from single element list', () => {
  var logs = [LOGENTRY_A];
  expect(getBestLog(logs).weight).toBe(LOGENTRY_A.weight);
});

test('find best log from empty', () => {
  expect(getBestLog([])).toBe(null);
});

test('find best log from null/undefined', () => {
  expect(getBestLog(null)).toBe(null);
  expect(getBestLog(undefined)).toBe(null);
});

//################################# Test getLastLogs() //#################################

test('find last logs (n=1), not grouped', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 1)[0].weight).toBe(LOGENTRY_B.weight);
  expect(getLastLogs(logs, 1, false)[0].weight).toBe(LOGENTRY_B.weight);
});

test('find last logs (n=2), not grouped', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 2)[0].weight).toBe(LOGENTRY_B.weight);
  expect(getLastLogs(logs, 2)[1].weight).toBe(LOGENTRY_A.weight);
});

test('find last logs (size check, n=0)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 0).length).toBe(0);
  expect(getLastLogs(logs, 0, true).length).toBe(0);
});

test('find last logs (size check, n=1,2,3)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 1).length).toBe(1);
  expect(getLastLogs(logs, 2).length).toBe(2);
  expect(getLastLogs(logs, 3).length).toBe(3);
});

test('find last logs (size check, requests too many)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 4).length).toBe(3);
  expect(getLastLogs(logs, 3, true).length).toBe(2);
});

test('find last logs (size check, requests negative)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, -1).length).toBe(0);
  expect(getLastLogs(logs, -1, true).length).toBe(0);
});

test('find last logs (n=1), grouped', () => {
  //a and c are in the same week, b is in a later week
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 1, true)[0].weight).toBe(LOGENTRY_B.weight);
});

test('find last logs (n=2), grouped', () => {
  //a and c are in the same week, b is in a later week
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 2, true)[0].weight).toBe(LOGENTRY_B.weight);
  expect(getLastLogs(logs, 2, true)[1].weight).toBe(LOGENTRY_A.weight);
});

test('find last logs (size check, n=1,2), grouped', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 1, true).length).toBe(1);
  expect(getLastLogs(logs, 2, true).length).toBe(2);
});

test('find last logs with empty input', () => {
  var logs = [];
  expect(getLastLogs(logs, 1).length).toBe(0);
  expect(getLastLogs(logs, 2, true).length).toBe(0);
});

test('find last logs with null/undefined input', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(null, 2).length).toBe(0);
  expect(getLastLogs(null, 2, false).length).toBe(0);
  expect(getLastLogs(null, 2, true).length).toBe(0);
  expect(getLastLogs(undefined, 2).length).toBe(0);
  expect(getLastLogs(undefined, 2, false).length).toBe(0);
  expect(getLastLogs(undefined, 2, true).length).toBe(0);

  expect(getLastLogs(logs, null).length).toBe(0);
  expect(getLastLogs(logs, null, false).length).toBe(0);
  expect(getLastLogs(logs, null, true).length).toBe(0);
  expect(getLastLogs(logs, undefined).length).toBe(0);
  expect(getLastLogs(logs, undefined, false).length).toBe(0);
  expect(getLastLogs(logs, undefined, true).length).toBe(0);

  expect(getLastLogs().length).toBe(0);
});

//################################# Test getLastLogs() & getLastLog() //#################################

test('compare getLastLog and getLastLogs (n=1)', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLogs(logs, 1)[0].weight).toBe(getLastLog(logs).weight);
});

//################################# Test getLastLog() //#################################

test('find last log', () => {
  var logs = [LOGENTRY_A, LOGENTRY_B, LOGENTRY_C];
  expect(getLastLog(logs).weight).toBe(LOGENTRY_B.weight);
});

test('find last log from single element list', () => {
  var logs = [LOGENTRY_A];
  expect(getLastLog(logs).weight).toBe(LOGENTRY_A.weight);
});

test('find last log from empty', () => {
  expect(getLastLog([])).toBe(null);
});

test('find last log from null/undefined', () => {
  expect(getLastLog(null)).toBe(null);
  expect(getLastLog(undefined)).toBe(null);
});

//################################# Test formatDate() //#################################

test('formatting date with expected input', () => {
  let newDate = new Date("2020-02-13T15:35:46.614Z");
  expect(formatDate(newDate)).toBe("13.02.2020");
  expect(formatDate(newDate, false)).toBe("13.02.2020");
});

test('formatting date with expected input (reversed)', () => {
  let newDate = new Date("2020-02-13T15:35:46.614Z");
  expect(formatDate(newDate, true)).toBe("2020.02.13");
});

test('formatting date with string input', () => {
  let newDate = "2020-02-13T15:35:46.614Z";
  expect(formatDate(newDate)).toBe("13.02.2020");
  expect(formatDate(newDate, false)).toBe("13.02.2020");
});

test('formatting date with string input (reversed)', () => {
  let newDate = "2020-02-13T15:35:46.614Z";
  expect(formatDate(newDate, true)).toBe("2020.02.13");

});

test('formatting date with non-date string input', () => {
  let newDate = "2020 and something about tuesday";
  expect(formatDate(newDate)).toBe("none");
  expect(formatDate(newDate, false)).toBe("none");
  expect(formatDate(newDate, true)).toBe("none");
});

test('formatting date with integer input', () => {
  let newDate = 20200403;
  expect(formatDate(newDate)).toBe("none");
  expect(formatDate(newDate, false)).toBe("none");
  expect(formatDate(newDate, true)).toBe("none");
});

test('formatting date with empty input', () => {
  expect(formatDate([])).toBe("none");
  expect(formatDate([], false)).toBe("none");
  expect(formatDate([], true)).toBe("none");
  expect(formatDate(null)).toBe("none");
  expect(formatDate(null, false)).toBe("none");
  expect(formatDate(null, true)).toBe("none");
  expect(formatDate(undefined)).toBe("none");
  expect(formatDate(undefined, false)).toBe("none");
  expect(formatDate(undefined, true)).toBe("none");
});

//################################# Test isSecondLiftBetter() //#################################

test('same lift', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 100, reps: 5 };
  expect(isSecondLiftBetter(a, b)).toBe(false);
});

test('second lift has more weight', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 110, reps: 5 };
  expect(isSecondLiftBetter(a, b)).toBe(true);
});

test('second lift has more weight, less reps', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 110, reps: 1 };
  expect(isSecondLiftBetter(a, b)).toBe(true);
});

test('second lift has more reps', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 100, reps: 6 };
  expect(isSecondLiftBetter(a, b)).toBe(true);
});

test('second lift has less reps', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 100, reps: 4 };
  expect(isSecondLiftBetter(a, b)).toBe(false);
});

test('second lift has less weight, more reps', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 90, reps: 7 };
  expect(isSecondLiftBetter(a, b)).toBe(false);
});

test('null or undefined input for lift comparison', () => {
  var a = { weight: 100, reps: 5 };
  var b = { weight: 90, reps: 7 };
  expect(isSecondLiftBetter(a, null)).toBe(false);
  expect(isSecondLiftBetter(null, b)).toBe(true);
  expect(isSecondLiftBetter(null, null)).toBe(false);

  expect(isSecondLiftBetter(a, undefined)).toBe(false);
  expect(isSecondLiftBetter(undefined, b)).toBe(true);
  expect(isSecondLiftBetter(undefined, undefined)).toBe(false);
});

//################################# Test getWeekNumber() //#################################

test('get week number from string', () => {
  let strDate = '2020-02-13T15:35:46.614Z';
  expect(getWeekNumber(strDate).length).toBe(2);
  expect(getWeekNumber(strDate)[0]).toBe(2020);
  expect(getWeekNumber(strDate)[1]).toBe(7);
});

test('get week number from string (year change)', () => {
  expect(getWeekNumber('2014/12/29')[0]).toBe(2015);
  expect(getWeekNumber('2014/12/29')[1]).toBe(1);
  expect(getWeekNumber('2012/1/1')[0]).toBe(2011);
  expect(getWeekNumber('2012/1/1')[1]).toBe(52);
});

test('get week number from date', () => {
  let strDate = new Date('2020-02-13T15:35:46.614Z');
  expect(getWeekNumber(strDate).length).toBe(2);
  expect(getWeekNumber(strDate)[0]).toBe(2020);
  expect(getWeekNumber(strDate)[1]).toBe(7);
});

test('get week number with wrong input', () => {
  expect(getWeekNumber("")).toBe(null);
  expect(getWeekNumber("not a date string")).toBe(null);
  expect(getWeekNumber('12345-99-99T15:35:46.614Z')).toBe(null);
});

test('get week number with empty input', () => {
  expect(getWeekNumber()).toBe(null);
  expect(getWeekNumber(null)).toBe(null);
  expect(getWeekNumber(undefined)).toBe(null);
});

//################################# Test weeksBetween() //#################################

test('same week', () => {
  var a = [2020, 5];
  var b = [2020, 5];
  expect(weeksBetween(a, b)).toBe(0);
});

test('one week later', () => {
  var a = [2020, 5];
  var b = [2020, 6];
  expect(weeksBetween(a, b)).toBe(1);
});

test('one week prior', () => {
  var a = [2020, 5];
  var b = [2020, 4];
  expect(weeksBetween(a, b)).toBe(-1);
});

test('one week later, next year', () => {
  var a = [2019, 52];
  var b = [2020, 1];
  expect(weeksBetween(a, b)).toBe(1);
});

test('same week, next year', () => {
  var a = [2019, 5];
  var b = [2020, 5];
  expect(weeksBetween(a, b)).toBe(52);
});

test('null input', () => {
  var a = [2019, 5];
  var b = [2020, 5];
  expect(weeksBetween(null, b)).toBe(0);
  expect(weeksBetween(a, null)).toBe(0);
  expect(weeksBetween(null, null)).toBe(0);
});

test('undefined input', () => {
  var a = [2019, 5];
  var b = [2020, 5];
  expect(weeksBetween(undefined, b)).toBe(0);
  expect(weeksBetween(a, undefined)).toBe(0);
  expect(weeksBetween(undefined, undefined)).toBe(0);
});

//################################# Test getNextWeek() //#################################

test('getNextWeek normal increase', () => {
  var a = [2019, 5];
  var nextWeek = getNextWeek(a);
  expect(nextWeek[0]).toBe(2019);
  expect(nextWeek[1]).toBe(6);
});

test('getNextWeek doubled increase', () => {
  var a = [2019, 5];
  var nextWeek = getNextWeek(getNextWeek(a));
  expect(nextWeek[0]).toBe(2019);
  expect(nextWeek[1]).toBe(7);
});

test('getNextWeek to first week', () => {
  var a = [2019, 1];
  var nextWeek = getNextWeek(a);
  expect(nextWeek[0]).toBe(2019);
  expect(nextWeek[1]).toBe(2);
});

test('getNextWeek is last week', () => {
  var a = [2019, 51];
  var nextWeek = getNextWeek(a);
  expect(nextWeek[0]).toBe(2019);
  expect(nextWeek[1]).toBe(52);
});

test('getNextWeek year change', () => {
  var a = [2019, 52];
  var nextWeek = getNextWeek(a);
  expect(nextWeek[0]).toBe(2020);
  expect(nextWeek[1]).toBe(1);
});

test('getNextWeek with error input', () => {
  expect(getNextWeek([2019])).toBe(null);
  expect(getNextWeek(["NaN", "NaN"])).toBe(null);
  expect(getNextWeek([])).toBe(null);
  expect(getNextWeek(null)).toBe(null);
  expect(getNextWeek(undefined)).toBe(null);
});
