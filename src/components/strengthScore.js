/* System to calculate strength score
 * Credit: https://symmetricstrength.com/
 */

/**
 * @private
 */
var wilksToStrengthScore = function(expectedWilks, age) {
  'use strict';
  var ageModifier = 1;
  if (typeof age === 'number' && age < 23) {
    ageModifier = 0.0038961 * Math.pow(age, 2) - 0.166926 * age + 2.80303;
  }
  if (typeof age === 'number' && age > 40) {
    ageModifier = 467683e-9 * Math.pow(age, 2) - 0.0299717 * age + 1.45454;
  }
  return (expectedWilks * ageModifier) / 4;
};

/**
 * @private
 * @param {boolean} isMale - True if the lifter is male
 * @param {integer} bodyweight - The bodyweight of the lifter in kilogram
 */
var wilksCoefficient = function(isMale, bodyweight) {
  'use strict';
  let a = 594.31747775582;
  let b = -27.23842536447;
  let c = 0.82112226871;
  let d = -0.00930733913;
  let e = 4731582e-11;
  let f = -9.054e-8;
  if (isMale) {
    a = -216.0475144;
    b = 16.2606339;
    c = -0.002388645;
    d = -0.00113732;
    e = 701863e-11;
    f = -1.291e-8;
  }
  let sum =
    a +
    b * bodyweight +
    c * Math.pow(bodyweight, 2) +
    d * Math.pow(bodyweight, 3) +
    e * Math.pow(bodyweight, 4) +
    f * Math.pow(bodyweight, 5);

  return 500 / sum;
};

/**
 * @private
 */
var percentOfPLTotal = function(isMale, bodyweight, exerciseName, oneRep) {
  'use strict';
  exerciseName = exerciseName.toLowerCase();
  let dliftMale = 0.396825;
  let dliftFemale = 0.414938;
  switch (exerciseName) {
    case 'sumodeadlift':
    case 'deadlift':
      return isMale ? dliftMale : dliftFemale;
    case 'backsquat':
      return isMale ? 0.87 * dliftMale : 0.84 * dliftFemale;
    case 'benchpress':
      return isMale ? 0.65 * dliftMale : 0.57 * dliftFemale;
    case 'powerclean':
      return 0.56 * (isMale ? dliftMale : dliftFemale);
    case 'frontsquat':
      return 0.8 * (isMale ? 0.87 * dliftMale : 0.84 * dliftFemale);
    case 'inclinebenchpress':
      return 0.82 * (isMale ? 0.65 * dliftMale : 0.57 * dliftFemale);
    case 'militarypress':
    case 'overheadpress':
      return isMale ? 0.65 * 0.65 * dliftMale : 0.65 * 0.57 * dliftFemale;
    case 'pushpress':
      return 1.33 * 0.65 * (isMale ? 0.65 * dliftMale : 0.57 * dliftFemale);
    case 'snatchpress':
      return 0.8 * 0.65 * (isMale ? 0.65 * dliftMale : 0.57 * dliftFemale);
    case 'pendlayrow':
      return 0.53 * (isMale ? dliftMale : dliftFemale);
    case 'bentoverrow':
      return 0.48 * (isMale ? dliftMale : dliftFemale);
  }

  let l = 2.20462 * (oneRep - bodyweight);
  if (exerciseName === 'dip') {
    if (isMale) {
      let val = 1.68064e-10 * Math.pow(l, 4);
      val -= 1.2946e-7 * Math.pow(l, 3);
      val += 371905e-10 * Math.pow(l, 2);
      val -= 0.00499168 * l;
      return val + 0.566576;
    }
    let val = 8.249e-10 * Math.pow(l, 4);
    val -= 4.01956e-7 * Math.pow(l, 3);
    val += 622122e-10 * Math.pow(l, 2);
    val -= 0.00431442 * l;
    return val + 0.37562;
  }

  let chinUpPercent =
    1.66589e-9 * Math.pow(l, 4) -
    5.1621e-7 * Math.pow(l, 3) +
    54088e-9 * Math.pow(l, 2) -
    0.00281674 * l +
    0.302005;
  if (isMale) {
    chinUpPercent =
      4.01897e-10 * Math.pow(l, 4) -
      2.34536e-7 * Math.pow(l, 3) +
      502252e-10 * Math.pow(l, 2) -
      0.00502633 * l +
      0.459545;
  }

  if (exerciseName === 'chinup') {
    return chinUpPercent;
  }
  if (exerciseName === 'pullup') {
    return 0.95 * chinUpPercent;
  }

  return 1;
};

/**
 * @private
 */
var expectedPLTotal = function(isMale, bodyweight, exerciseName, oneRM) {
  'use strict';
  return oneRM / percentOfPLTotal(isMale, bodyweight, exerciseName, oneRM);
};

/**
 * @private
 */
var singleLiftStrengthScore = function(isMale, age, bodyweight, exercise, oneRM) {
  'use strict';
  let plTotal = expectedPLTotal(isMale, bodyweight, exercise, oneRM);
  let expectedWilks = wilksCoefficient(isMale, bodyweight) * plTotal;
  return wilksToStrengthScore(expectedWilks, age);
};

/**
 * @public
 * Calculates the strength score for a single exercise
 * @param {boolean} isMale - True, if the value is calculated for a male lifter, false otherwise
 * @param {integer} age - The age of the lifter in years
 * @param {integer} bodyweight - The bodyweight of the lifter in kilogram
 * @param {string} exerciseName - The name of the exercise in lowerCamelCase (e.g. "backSquat")
 * @param {double} oneRM - The one repitition maximum for the given lift
 * @return {double}
 */
export const getSingleExerciseStrengthScore = (isMale, age, bodyweight, exerciseName, oneRM) => {
  'use strict';
  let score = singleLiftStrengthScore(isMale, age, bodyweight, exerciseName, oneRM);
  return Math.round(score * 10) / 10;
};

/**
 * @private
 * Used to round the given value to the nearest multiple of a given value
 * @param {double} oneRm - The one repitition maximum for the given lift
 * @param {double} roundTo - The nearest value the oneRm will be rounded to
 * @return {double}
 */
export const mround = (oneRm, roundTo) => {
  oneRm = Math.abs(oneRm);
  roundTo = roundTo < 1 ? 1 : roundTo;
  let rounded = oneRm;
  if (roundTo !== 0) {
    rounded -= oneRm % roundTo;
    if (roundTo / 2 <= oneRm % roundTo) {
      rounded += roundTo;
    }
  }
  return rounded;
};

/**
 * @private
 * Calculates the actual one rep maximum, without rounding the value
 * @param {double} weight - The weight lifted
 * @param {integer} reps - The number of times the weight was lifted (max 30)
 * @return {double}
 */
export const getActualOneRepMaximum = (weight, reps) => {
  if (reps <= 0 || weight <= 0) {
    return 0;
  }
  if (reps === 1) {
    return weight;
  }
  if (reps > 1 && reps <= 10) {
    return (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
  }
  reps = reps > 30 ? 30 : reps;
  //brzycki formula
  return (weight * 36) / (37 - reps);
};

/**
 * @public
 * Calculates the one repitition maximum for a single exercise
 * @param {double} weight - The weight lifted
 * @param {integer} reps - The number of times the weight was lifted (max 30)
 * @param {double} [roundTo] - The final value will be rounded down to the nearest multiple of this number. If negative, it will round up. Default is 1.
 * @return {double}
 */
export const getOneRepMaximum = (weight, reps, roundTo) => {
  if (!weight || !reps || reps < 1) {
    return 0;
  }
  roundTo = roundTo || 1;
  roundTo = Math.abs(roundTo);

  let orm = getActualOneRepMaximum(weight, reps);
  return mround(orm, roundTo);
};

/**
 * @public
 * Calculates the one repitition maximum for a single bodyweight exercise
 * @param {double} bodyweight - The bodyweight of the lifter
 * @param {double} weight - The additional weight lifted, if additional weight was used for the exercise
 * @param {integer} reps - The number of times the weight was lifted (max 30)
 * @param {double} [roundTo] - The final value will be rounded down to the nearest multiple of this number. If negative, it will round up. Default is 1.
 * @return {double} The estimated one rep maxmium, including the bodyweight
 */
export const getOneRepMaximumForBodyWeightExercise = (bodyweight, weight, reps, roundTo) => {
  if (typeof bodyweight === 'string') {
    throw 'WRONG_INPUT_TYPE';
  }
  let completeWeight = bodyweight + weight;
  return getOneRepMaximum(completeWeight, reps, roundTo);
};
