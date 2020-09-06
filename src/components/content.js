/**
 * @public
 * Object containing all available exercises
 */
export const Exercises = {
  benchpress: {
    name: 'Bench Press',
    id: 'benchpress',
    description:
      'The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.',
    link: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
  },
  pullup: {
    name: 'Pullup',
    id: 'pullup',
    bodyweightExercise: true,
  },
  bentoverrow: {
    name: 'Bent Over Barbell Row',
    id: 'bentoverrow',
    bodyweightExercise: false,
  },
  overheadpress: {
    name: 'Military Press',
    id: 'overheadpress',
  },
  backsquat: {
    name: 'Barbell Back Squat',
    id: 'backsquat',
  },
  deadlift: {
    name: 'Deadlift',
    id: 'deadlift',
  },
  frontsquat: {
    name: 'Barbell Front Squat',
    id: 'frontsquat',
  },
  inclinebenchpress: {
    name: 'Incline Bench Press',
    id: 'inclinebenchpress',
  },
  pendlayrow: {
    name: 'Pendlay Row',
    id: 'pendlayrow',
  },
};

/**
 * @public
 * Returns true, if the given exercise is marked as a bodyweight exercise
 * @param {string} exerciseId - The identifier of the exercise
 * @return {boolean}
 */
export const isBodyweightExercise = exerciseId => {
  let exercise = Exercises.filter(i => i.id === exerciseId);
  return exercise && exercise.bodyweightExercise;
};
