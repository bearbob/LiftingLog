/**
 * @public
 * Object containing all available exercises
 */
export const Exercises = [
  {
    name: 'Bench Press',
    id: 'benchpress',
    description:
      'The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.',
    link: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
  },
  {
    name: 'Pullup',
    id: 'pullup',
    bodyweightExercise: true,
  },
  {
    name: 'Bent Over Barbell Row',
    id: 'bentoverrow',
    bodyweightExercise: false,
  },
  {
    name: 'Military Press',
    id: 'overheadpress',
  },
  {
    name: 'Barbell Back Squat',
    id: 'backsquat',
  },
  {
    name: 'Deadlift',
    id: 'deadlift',
  },
  {
    name: 'Barbell Front Squat',
    id: 'frontsquat',
  },
  {
    name: 'Incline Bench Press',
    id: 'inclinebenchpress',
  },
  {
    name: 'Pendlay Row',
    id: 'pendlayrow',
  },
];

/**
 * @public
 * Returns true, if the given exercise is marked as a bodyweight exercise
 * @param {string} exerciseId - The identifier of the exercise
 * @return {boolean}
 */
export const isBodyweightExercise = exerciseId => {
  if (!exerciseId) {
    throw 'EXERCISE_UNDEFINED';
  }
  let matchingExercises = Object.values(Exercises).filter(i => i.id === exerciseId);
  if (matchingExercises.length < 1) {
    throw 'EXERCISE_NOT_FOUND';
  }
  return matchingExercises[0].bodyweightExercise === true;
};

/**
 * @public
 * @returns {array} Array with string items, each the ID of an exercise
 */
export const getExerciseKeys = () => {
  let result = [];
  for (const [key, value] of Object.entries(Exercises)) {
    result.push(value.id);
  }
  return result;
};
