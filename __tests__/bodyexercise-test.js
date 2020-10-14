/**
 * This file is used to declare unit test for the exercises that are
 * mainly bodyweight exercises (e.g. pullups)
 */

import 'react-native';
import {
  getSingleExerciseStrengthScore,
  getOneRepMaximumForBodyWeightExercise,
} from '../src/components/strengthScore';
import {isBodyweightExercise} from 'components/content';

const bodyweight = 80;
const age = 30;
//################################# Test isBodyweightExercise() //#################################

describe('Checking isBodyweightExercise()', () => {
  test('Pullup is bodyweight exercise', () => {
    expect(isBodyweightExercise('pullup')).toBe(true);
  });

  test('Bench press is not abodyweight exercise', () => {
    expect(isBodyweightExercise('benchpress')).toBe(false);
  });

  test('Unknown exercise id', () => {
    expect(() => {
      isBodyweightExercise('THISDOESNOTEXIST');
    }).toThrow();
  });

  test('Undefined exercise id', () => {
    expect(() => {
      isBodyweightExercise();
    }).toThrow();
  });
});

//################################# Test getOneRepMaximumForBodyWeightExercise() //#################################

describe('Checking getOneRepMaximumForBodyWeightExercise()', () => {
  test('One rep max without extra weight', () => {
    expect(getOneRepMaximumForBodyWeightExercise(bodyweight, 0, 5, 5)).toBe(95);
  });

  test('Test with faulty input types', () => {
    expect(() => {
      getOneRepMaximumForBodyWeightExercise('103', 15, 5, 2.5);
    }).toThrow();
  });
});
//################################# Test getSingleExerciseStrengthScore() //#################################

describe('Checking getSingleExerciseStrengthScore()', () => {
  test('get pullup strength score (default male)', () => {
    expect(getSingleExerciseStrengthScore(true, age, bodyweight, 'pullup', 95)).toBe(50.2);
  });
});
