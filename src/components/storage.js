import AsyncStorage from '@react-native-community/async-storage';

/**
 * Fetch the given object with the given key from the database.
 * @public
 * @static
 * @param {string} key - The key to fetch the data for
 * @param {function} callback - The function that will be executed when the data has been loaded. Has the input parameter "value".
 * @return {object}
 */
export const retrieveData = async (key, callback) => {
    try {
        const value = await AsyncStorage.getItem(key);
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
    if(append === null || append === undefined) {
      append = true;
    }
    try {
      var array = [];
      if(append) {
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
