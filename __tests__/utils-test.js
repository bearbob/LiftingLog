/**
 * @format
 */

import 'react-native';
import React from 'react';
import {
  getBestLog,
  getBestLogs,
  isSecondLiftBetter,
  weeksBetween,
  getNextWeek
} from '../src/components/utils';

//################################# Test getBestLogs() //#################################

test('find best logs (n=1)', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 1)[0].weight).toBe(72.5);
});

test('find best logs (n=2)', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 2)[0].weight).toBe(72.5);
  expect(getBestLogs(logs, 2)[1].weight).toBe(62.5);
});

test('find best logs (n=0)', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 0).length).toBe(0);
});

test('find best logs, check size', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 1).length).toBe(1);
  expect(getBestLogs(logs, 2).length).toBe(2);
  expect(getBestLogs(logs, 3).length).toBe(3);
});

test('best logs expected more than exist', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 4).length).toBe(3);
  expect(getBestLogs(logs, 5).length).toBe(3);
});

test('best logs request negative size', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, -1).length).toBe(2);
  expect(getBestLogs(logs, -2).length).toBe(1);
  expect(getBestLogs(logs, -3).length).toBe(0);
});

test('best logs from single', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var logs = [a];
  expect(getBestLogs(logs, 4)[0].weight).toBe(72.5);
});

test('best logs from empty', () => {
  expect(getBestLogs([], 4).length).toBe(0);
});

test('best logs from null/undefined', () => {
  expect(getBestLogs(null, 1).length).toBe(0);
  expect(getBestLogs(undefined, 1).length).toBe(0);
});

test('best logs from null/undefined amount', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var logs = [a];
  expect(getBestLogs(logs, null).length).toBe(0);
  expect(getBestLogs(logs, undefined).length).toBe(0);
});

//################################# Test getBestLogs() & getBestLog() //#################################

test('compare getBestLog and getBestLogs (n=1)', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLogs(logs, 1)[0].weight).toBe(getBestLog(logs).weight);
});

//################################# Test getBestLog() //#################################

test('find best log', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var b = {
   "weight": 62.5,
   "reps": 2,
   "date": "2020-02-19T08:44:42.042Z",
   "oneRM": 65,
   "score": 67.8
  };
  var c = {
   "weight": 55,
   "reps": 10,
   "date": "2020-02-10T19:42:08.036Z",
   "oneRM": 72.5,
   "score": 75.6
  };
  var logs = [a, b, c];
  expect(getBestLog(logs).weight).toBe(72.5);
});

test('find best log from single element list', () => {
  var a = {
   "weight": 72.5,
   "reps": 8,
   "date": "2020-02-12T15:35:46.614Z",
   "oneRM": 90,
   "score": 93.9
  };
  var logs = [a];
  expect(getBestLog(logs).weight).toBe(72.5);
});

test('find best log from empty', () => {
  expect(getBestLog([])).toBe(null);
});

test('find best log from null/undefined', () => {
  expect(getBestLog(null)).toBe(null);
  expect(getBestLog(undefined)).toBe(null);
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
