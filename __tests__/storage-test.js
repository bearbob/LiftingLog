/**
 * Test cases for the storage
 */

import 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {
  dataExists,
  retrieveData,
  storeData,
  storeObjectInArray,
  storeWeightLog,
} from 'components/storage';

const KEY = 'testkey';
const KEY_EXISTS_A = 'calendar';
const KEY_EXISTS_B = 'benchpress';
const KEY_NEXISTS = '_not_existing_';

const DATA_A = [
  '2020-07-19',
  '2020-07-20',
  '2020-08-01',
  '2020-08-02',
  '2020-08-01',
  '2020-08-11',
  '2020-08-20',
  '2020-08-21',
  '2020-08-22',
  '2020-08-25',
];
const DATA_B = [
  {weight: 100, reps: 10, date: '2020-07-19T07:08:34.101Z', oneRM: 135, score: 174.2},
  {weight: 110, reps: 5, date: '2020-07-20T07:18:41.823Z', oneRM: 127.5, score: 74.4},
  {weight: 110, reps: 5, date: '2020-08-01T07:18:41.823Z', oneRM: 127.5, score: 74.4},
];

//clean the storage before each test and fill with test data again
beforeEach(() => {
  AsyncStorage.__INTERNAL_MOCK_STORAGE__ = {};
  AsyncStorage.__INTERNAL_MOCK_STORAGE__.bodyweight = JSON.stringify(55);
  AsyncStorage.__INTERNAL_MOCK_STORAGE__.birthday = JSON.stringify(moment().subtract(20, 'years'));
  AsyncStorage.__INTERNAL_MOCK_STORAGE__.isMale = JSON.stringify(false);
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY] = JSON.stringify({
    valueTrue: true,
    valueFalse: false,
  });
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY_EXISTS_A] = JSON.stringify(DATA_A);
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY_EXISTS_B] = JSON.stringify(DATA_B);
});

//clean all mock functions after each test, to limit interplay
afterEach(() => {
  jest.clearAllMocks();
});

//---------------- Testcases for dataExists ----------------

describe('Checking dataExists()', () => {
  it('checks if database is accessed', async () => {
    await dataExists(KEY);
    expect(AsyncStorage.getItem).toBeCalledWith(KEY);
  });

  it('checks if all keys are checked', async () => {
    await dataExists(['a', 'b']);
    expect(AsyncStorage.getItem).toBeCalledWith('a');
    expect(AsyncStorage.getItem).toBeCalledWith('b');
  });

  it('checks if callback is run', done => {
    dataExists(KEY, data => {
      try {
        expect(data).toEqual(expect.anything());
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if key is found', done => {
    dataExists(KEY_EXISTS_A, data => {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if all keys are found', done => {
    dataExists([KEY_EXISTS_A, KEY_EXISTS_B], data => {
      try {
        expect(data).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if key is not found', done => {
    dataExists(KEY_NEXISTS, data => {
      try {
        expect(data).toBeFalsy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if one key is not found (first)', done => {
    dataExists([KEY_NEXISTS, KEY_EXISTS_A, KEY_EXISTS_B], data => {
      try {
        expect(data).toBeFalsy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if one key is not found (second)', done => {
    dataExists([KEY_EXISTS_A, KEY_NEXISTS, KEY_EXISTS_B], data => {
      try {
        expect(data).toBeFalsy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if one key is not found (last)', done => {
    dataExists([KEY_EXISTS_A, KEY_EXISTS_B, KEY_NEXISTS], data => {
      try {
        expect(data).toBeFalsy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

//---------------- Testcases for retrieveData ----------------

describe('Checking retrieveData()', () => {
  it('checks if accesses database', async () => {
    await retrieveData(KEY, () => {});
    expect(AsyncStorage.getItem).toBeCalledWith(KEY);
  });

  it('checks if callback is fired at all', done => {
    retrieveData(KEY, data => {
      try {
        expect(data).toEqual(expect.anything());
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if callback is fired for multiple keys', done => {
    retrieveData([KEY_EXISTS_A, KEY_EXISTS_B], data => {
      try {
        done();
      } catch (error) {
        done(error);
      }
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
  });

  it('checks if callback handles existing data', done => {
    retrieveData(KEY, data => {
      try {
        expect(data).toBeDefined();
        expect(data.valueTrue).toBeTruthy();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if callback handles multiple keys', done => {
    retrieveData([KEY_EXISTS_A, KEY_EXISTS_B], data => {
      try {
        expect(data[KEY_EXISTS_A]).toEqual(DATA_A);
        expect(data[KEY_EXISTS_B]).toEqual(DATA_B);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if callback handles not-existing data', done => {
    retrieveData(KEY_NEXISTS, data => {
      try {
        expect(data).toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('checks if callback handles multiple keys with not-existing included', done => {
    retrieveData([KEY_EXISTS_A, KEY_NEXISTS], data => {
      try {
        expect(data[KEY_EXISTS_A]).toEqual(DATA_A);
        expect(data[KEY_NEXISTS]).toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

//---------------- Testcases for storeData ----------------

describe('Checking storeData()', () => {
  it('checks if database is accessed', async () => {
    let data = [];
    await storeData(KEY, data);
    expect(AsyncStorage.setItem).toBeCalledWith(KEY, JSON.stringify(data));
  });

  it('checks if new key is saved', async () => {
    let data = [];
    let key = 'NEW_KEY_13389';
    await storeData(key, data);
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__).toHaveProperty(key);
  });
});

//---------------- Testcases for storeObjectInArray ----------------

describe('Checking storeObjectInArray()', () => {
  it('checks if database is accessed', async () => {
    let data = {id: 'A'};
    await storeObjectInArray(KEY_EXISTS_B, data);
    expect(AsyncStorage.setItem).toBeCalled();
  });

  it('checks if new key is saved', async () => {
    let data = {id: 'A'};
    let key = 'NEW_KEY_13389';
    await storeObjectInArray(key, data);
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__).toHaveProperty(key);
  });
});

//---------------- Testcases for storeWeightLog ----------------
const testBirthday = new Date(moment().subtract(20, 'days'));

describe('Checking storeWeightLog()', () => {
  it('checks if data is stored', async () => {
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[exerciseID]).toBeUndefined();
    let exerciseID = 'bentoverrow';
    storeWeightLog({
      id: exerciseID,
      weight: 50,
      reps: 3,
      date: testBirthday,
    });
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[exerciseID]).toBeDefined();
  });

  it('checks if all data is stored (check race condition)', async () => {
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[exerciseID]).toBeUndefined();
    let exerciseID = 'bentoverrow';
    storeWeightLog({
      id: exerciseID,
      weight: 50,
      reps: 3,
      date: testBirthday,
    });
    storeWeightLog({
      id: exerciseID,
      weight: 50,
      reps: 4,
      date: testBirthday,
    });
    storeWeightLog({
      id: exerciseID,
      weight: 55,
      reps: 3,
      date: testBirthday,
    });
    storeWeightLog({
      id: exerciseID,
      weight: 55,
      reps: 4,
      date: testBirthday,
    });
    storeWeightLog({
      id: exerciseID,
      weight: 55,
      reps: 5,
      date: testBirthday,
    });
    expect(AsyncStorage.__INTERNAL_MOCK_STORAGE__[exerciseID].length).toBe(5);
  });
});
