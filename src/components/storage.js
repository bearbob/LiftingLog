import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {
  getSingleExerciseStrengthScore,
  getOneRepMaximum,
  getOneRepMaximumForBodyWeightExercise,
} from 'components/strengthScore';
import {isBodyweightExercise} from 'components/content';
import {getWeekNumber} from 'components/utils';

/**
 * @public
 * @static
 * Check if the objects with the given key exist in the database.
 * @param {string/array} key - The key to fetch the data for or an array of strings
 * @param {function} [callback] - The function that will be executed after the data has been queried. Recieves true as input, if all requested parameters exist in the storage
 */
export const dataExists = async (key, callback) => {
  if (!Array.isArray(key)) {
    key = [key];
  }
  try {
    let exists = true;
    for (let i = 0; i < key.length; i++) {
      let tmp = await AsyncStorage.getItem(key[i]);
      if (!tmp) {
        exists = false;
      }
    }
    if (callback) {
      callback(exists);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

/**
 * @public
 * @static
 * Fetch the given object with the given key from the database.
 * @param {string/array} key - The key to fetch the data for or an array of strings
 * @param {function} callback - The function that will be executed when the data has been loaded. Has the input parameter "value".
 */
export const retrieveData = async (key, callback) => {
  try {
    var value;
    if (Array.isArray(key)) {
      value = {};
      for (let i = 0; i < key.length; i++) {
        value[key[i]] = await AsyncStorage.getItem(key[i]);
      }
    } else {
      value = await AsyncStorage.getItem(key);
    }
    callback(value);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

/**
 * Store the given object in the database.
 * @public
 * @static
 * @param {string} key - The key to store the object under
 * @param {object} object - The object that will be stored in the database
 */
export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }
};

/**
 * Store the given object in an array in the database. If the array already
 * contains data, the object will be added if append is true. If not, the
 * array will contain only the given object
 * @public
 * @static
 * @param {string} key - The key to store the object under
 * @param {object} object - The object that will be stored in the database
 * @param {boolean} append - If false, the existing data is overwritten
 */
export const storeObjectInArray = async (key, object, append) => {
  if (append === null || append === undefined) {
    append = true;
  }
  try {
    var array = [];
    if (append) {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        array = JSON.parse(value);
      }
    }
    array.push(object);
    await AsyncStorage.setItem(key, JSON.stringify(array));
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }
};

/**
 * Store the given value in an array in the database. If the array already
 * contains data, the value will be added if append is true. If not, the
 * array will contain only the given value.
 * In contrast to storeObjectInArray the element will only be added if it
 * isn't already in the array, preventing duplicates.
 * @public
 * @static
 * @param {string} key - The key to store the object under
 * @param {object} newValue - The value that will be stored in the database
 */
export const storeObjectInSet = async (key, newValue) => {
  try {
    var array = [];
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      array = JSON.parse(value);
    }
    if (!array.includes(newValue)) {
      array.push(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(array));
    }
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }
};

/**
 * @private
 * @static
 * @param {object} aParams
 * @param {object} aParams.exercise
 * @param {object} aParams.date
 * @param {object} aParams.score
 */
const storeStrengthScore = async aParams => {
  const key = 'strengthScoreCollection';
  let week = getWeekNumber(aParams.date);
  let weekId = week[0] + '/' + week[1];
  let id = aParams.exercise;
  try {
    var collection = {};
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      collection = JSON.parse(value);
    }
    if (!collection[weekId]) {
      collection[weekId] = {};
      collection[weekId][id] = aParams.score;
    } else if (!collection[weekId][id] || collection[weekId][id] < aParams.score) {
      collection[weekId][id] = aParams.score;
    }

    await AsyncStorage.setItem(key, JSON.stringify(collection));
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }
};

/**
 * @public
 * Save a new lift data entry to the database
 * @param {object} aParams - The weight lifted
 * @param {string} aParams.id - The identification string of the exercise
 * @param {double} aParams.weight - The weight lifted
 * @param {integer} aParams.reps - The repitition the weight was lifted for
 * @param {date} aParams.date - The date of the lift
 */
export const storeWeightLog = aParams => {
  const weight = aParams.weight;
  const reps = aParams.reps;
  const date = aParams.date;
  const id = aParams.id;
  retrieveData(['bodyweight', 'birthday', 'isMale'], values => {
    //if the settings are incomplete, we will use a default setting:
    // female, 20 years old, 55kg bodyweight
    let defaultBirthday = moment().subtract(20, 'years');
    if (!values) {
      values = {bodyweight: 55, birthday: defaultBirthday, isMale: false};
    }
    values.bodyweight = values.bodyweight ? parseInt(values.bodyweight, 10) : 55;
    values.birthday = new Date(values.birthday ? values.birthday : defaultBirthday);
    values.isMale = values.isMale ? values.isMale : false;
    let age = moment().diff(moment(values.birthday), 'years');

    let oneRm;
    if (isBodyweightExercise(id)) {
      oneRm = getOneRepMaximumForBodyWeightExercise(values.bodyweight, weight, reps, 2.5);
    } else {
      oneRm = getOneRepMaximum(weight, reps, 2.5);
    }
    let strengthScore = getSingleExerciseStrengthScore(
      values.isMale,
      age,
      values.bodyweight,
      id,
      oneRm,
    );
    storeObjectInArray(
      id,
      {weight: weight, reps: reps, date: date, oneRM: oneRm, score: strengthScore},
      true,
    );
    let days = date
      .getDate()
      .toString()
      .padStart(2, '0');
    let months = (date.getMonth() + 1).toString().padStart(2, '0');
    storeObjectInSet('calendar', date.getFullYear() + '-' + months + '-' + days);
    storeStrengthScore({
      exercise: id,
      date: date,
      score: strengthScore,
    });
  });
};
