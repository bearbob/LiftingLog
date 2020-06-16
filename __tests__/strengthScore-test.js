import 'react-native';
import {
  getActualOneRepMaximum,
  getSingleExerciseStrengthScore,
  getOneRepMaximum,
  getOneRepMaximumForBodyWeightExercise,
  mround,
} from '../src/components/strengthScore';

//################################# Test mround() //#################################

test('mround (10, 5)', () => {
  expect(mround(10, 5)).toBe(10);
});

test('mround (11, 5)', () => {
  expect(mround(11, 5)).toBe(10);
});

test('mround (12, 2.5)', () => {
  expect(mround(12, 2.5)).toBe(12.5);
});

test('mround (93.776, 2.5)', () => {
  expect(mround(93.776, 2.5)).toBe(95);
});

test('mround (11, -5)', () => {
  expect(mround(11, -5)).toBe(11);
});

test('mround (-11, 5)', () => {
  expect(mround(-11, 5)).toBe(mround(11, 5));
});

test('mround (-11, -5)', () => {
  expect(mround(-11, -5)).toBe(mround(11, -5));
});

//################################# Test mround() //#################################

test('get the oneRM without rounding', () => {
  expect(getActualOneRepMaximum(100, 5)).toBe(116.58250529118924);
});

test('get the oneRM without rounding (one rep)', () => {
  expect(getActualOneRepMaximum(100, 1)).toBe(100);
});

test('get the oneRM without rounding (two reps)', () => {
  expect(getActualOneRepMaximum(100, 2)).toBe(105.1457387355678);
});

test('get the oneRM without rounding (three reps)', () => {
  expect(getActualOneRepMaximum(100, 3)).toBe(108.97974273590935);
});

test('get the oneRM without rounding (ten reps)', () => {
  expect(getActualOneRepMaximum(100, 10)).toBe(134.74669948168537);
});

test('get the oneRM without rounding (negative reps)', () => {
  expect(getActualOneRepMaximum(100, -10)).toBe(0);
});

test('get the oneRM without rounding (many reps)', () => {
  expect(getActualOneRepMaximum(100, 20)).toBe(211.76470588235293);
});

//################################# Test getSingleExerciseStrengthScore() //#################################

test('get bench press strength score (default male)', () => {
  expect(getSingleExerciseStrengthScore(true, 30, 80, 'benchpress', 100)).toBe(66.2);
});

test('get pullup strength score (default male) - standard', () => {
  let bodyweight = 80;
  let oneRM = getOneRepMaximumForBodyWeightExercise(bodyweight, 0, 5, 2.5);
  expect(getSingleExerciseStrengthScore(true, 30, bodyweight, 'pullup', oneRM)).toBe(46.9);
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
  expect(getOneRepMaximum(100, 2, 5)).toBe(105);
  expect(getOneRepMaximum(100, 3, 5)).toBe(110);
  expect(getOneRepMaximum(100, 5, 5)).toBe(115);
});

test('calculate one rep max (different reps, r=2.5)', () => {
  expect(getOneRepMaximum(100, 1, 2.5)).toBe(100);
  expect(getOneRepMaximum(100, 2, 2.5)).toBe(105);
  expect(getOneRepMaximum(100, 3, 2.5)).toBe(110);
  expect(getOneRepMaximum(100, 5, 2.5)).toBe(117.5);
});

test('calculate one rep max (different reps, r=1)', () => {
  expect(getOneRepMaximum(100, 1, 1)).toBe(100);
  expect(getOneRepMaximum(100, 2, 1)).toBe(105);
  expect(getOneRepMaximum(100, 3, 1)).toBe(109);
  expect(getOneRepMaximum(100, 5, 1)).toBe(117);
});

test('calculate one rep max (different weight, no r)', () => {
  expect(getOneRepMaximum(100, 1)).toBe(100);
  expect(getOneRepMaximum(100, 2)).toBe(105);
  expect(getOneRepMaximum(100, 3)).toBe(109);
  expect(getOneRepMaximum(100, 5)).toBe(117);
});

test('calculate one rep max (different weight, negative r)', () => {
  expect(getOneRepMaximum(100, 1, -1)).toBe(100);
  expect(getOneRepMaximum(100, 2, -5)).toBe(105);
  expect(getOneRepMaximum(100, 3, -2.5)).toBe(110);
});

test('calculate one rep max (error input)', () => {
  expect(getOneRepMaximum()).toBe(0);
  expect(getOneRepMaximum(undefined)).toBe(0);
  expect(getOneRepMaximum(null)).toBe(0);
  expect(getOneRepMaximum(100, null)).toBe(0);
});

//################################# Test getOneRepMaximumForBodyWeightExercise() //#################################
test('one rep max for bodyweight (r=5)', () => {
  expect(getOneRepMaximumForBodyWeightExercise(80, 0, 1, 5)).toBe(80);
});

test('one rep max for bodyweight with additional reps (r=5)', () => {
  expect(getOneRepMaximumForBodyWeightExercise(80, 0, 5, 5)).toBe(95);
});

test('one rep max for bodyweight (r=2.5)', () => {
  expect(getOneRepMaximumForBodyWeightExercise(80, 0, 1, 2.5)).toBe(80);
});

test('one rep max for bodyweight with addtional reps (r=2.5)', () => {
  expect(getOneRepMaximumForBodyWeightExercise(80, 0, 5, 2.5)).toBe(92.5);
});

test('one rep max for bodyweight with additional reps (r=1)', () => {
  expect(getOneRepMaximumForBodyWeightExercise(80, 0, 5, 1)).toBe(93);
});
