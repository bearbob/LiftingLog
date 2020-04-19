import AsyncStorage from '@react-native-community/async-storage';

/**
 * Check if the objects with the given key exist in the database.
 * @public
 * @static
 * @param {string/array} key - The key to fetch the data for or an array of strings
 * @param {function} [callback] - The function that will be executed after the data has been queried. Recieves true as input, if all requested parameters exist in the storage
 */
export const dataExists = async (key, callback) => {
    if(!Array.isArray(key)) {
      key = [key];
    }
    try {
        let exists = true;
        for(let i=0; i<key.length; i++){
          let tmp = await AsyncStorage.getItem(key[i]);
          if(!tmp) exists = false;
          break;
        }
        if(callback) {
          callback(exists);
        }
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

/**
 * Fetch the given object with the given key from the database.
 * @public
 * @static
 * @param {string/array} key - The key to fetch the data for or an array of strings
 * @param {function} callback - The function that will be executed when the data has been loaded. Has the input parameter "value".
 */
export const retrieveData = async (key, callback) => {
    try {
        var value;
        if(Array.isArray(key)) {
          value = {};
          for(let i=0; i<key.length; i++){
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
