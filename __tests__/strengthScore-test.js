/**
 * @format
 */

import 'react-native';
import React from 'react';
import {
  getSingleExerciseStrengthScore,
  getOneRepMaximum
} from '../src/components/strengthScore';

//################################# Test getSingleExerciseStrengthScore() //#################################

test('get bench press strength score (default male)', () => {
  expect(getSingleExerciseStrengthScore(true, 30, 80, 'benchpress', 100)).toBe(66.2);
});

test('get deadlift strength score (default male)', () => {
  expect(getSingleExerciseStrengthScore(true, 30, 80, 'deadlift', 100)).toBe(43);
});

test('get squat strength score (default male)', () => {
  expect(getSingleExerciseStrengthScore(true, 30, 80, 'backsquat', 100)).toBe(49.4);
});

test('get bench press strength score (default female)', () => {
  expect(getSingleExerciseStrengthScore(false, 30, 55, 'benchpress', 100)).toBe(126.1);
});

test('get deadlift strength score (default female)', () => {
  expect(getSingleExerciseStrengthScore(false, 30, 55, 'deadlift', 100)).toBe(71.9);
});

test('get squat strength score (default female)', () => {
  expect(getSingleExerciseStrengthScore(false, 30, 55, 'backsquat', 100)).toBe(85.6);
});

//################################# Test getOneRepMaximum() //#################################

test('one rep max is actual one rep (different weight, r=0.01)', () => {
  expect(getOneRepMaximum(50, 1, 0.01)).toBe(50);
  expect(getOneRepMaximum(100, 1, 0.01)).toBe(100);
  expect(getOneRepMaximum(150, 1, 0.01)).toBe(150);
  expect(getOneRepMaximum(200, 1, 0.01)).toBe(200);
});

test('calculate one rep max (different reps, r=5)', () => {
  expect(getOneRepMaximum(100, 1, 5)).toBe(100);
  expect(getOneRepMaximum(100, 2, 5)).toBe(100);
  expect(getOneRepMaximum(100, 3, 5)).toBe(105);
  expect(getOneRepMaximum(100, 5, 5)).toBe(110);
});

test('calculate one rep max (different reps, r=2.5)', () => {
  expect(getOneRepMaximum(100, 1, 2.5)).toBe(100);
  expect(getOneRepMaximum(100, 2, 2.5)).toBe(102.5);
  expect(getOneRepMaximum(100, 3, 2.5)).toBe(105);
  expect(getOneRepMaximum(100, 5, 2.5)).toBe(112.5);
});

test('calculate one rep max (different reps, r=1)', () => {
  expect(getOneRepMaximum(100, 1, 1)).toBe(100);
  expect(getOneRepMaximum(100, 2, 1)).toBe(102);
  expect(getOneRepMaximum(100, 3, 1)).toBe(105);
  expect(getOneRepMaximum(100, 5, 1)).toBe(112);
});

test('calculate one rep max (different weight, no r)', () => {
  expect(getOneRepMaximum(100, 1)).toBe(100);
  expect(getOneRepMaximum(100, 2)).toBe(102);
  expect(getOneRepMaximum(100, 3)).toBe(105);
  expect(getOneRepMaximum(100, 5)).toBe(112);
});

test('calculate one rep max (different weight, negative r)', () => {
  expect(getOneRepMaximum(100, 1, -1)).toBe(100);
  expect(getOneRepMaximum(100, 2, -5)).toBe(100);
  expect(getOneRepMaximum(100, 3, -2.5)).toBe(105);
});

test('calculate one rep max (error input)', () => {
  expect(getOneRepMaximum()).toBe(0);
  expect(getOneRepMaximum(undefined)).toBe(0);
  expect(getOneRepMaximum(null)).toBe(0);
  expect(getOneRepMaximum(100, null)).toBe(0);
});
