/**
 * @format
 */

import 'react-native';
import React from 'react';
import { weeksBetween } from '../src/components/utils';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
