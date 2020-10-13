/**
 * Test cases for the storage
 */

import 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {dataExists, retrieveData, storeData} from 'components/storage';

const KEY = 'testkey';
const KEY_EXISTS_A = 'calendar';
const KEY_EXISTS_B = 'benchpress';
const KEY_NEXISTS = '_not_existing_';

//clean the storage before each test and fill with test data again
beforeEach(() => {
  AsyncStorage.__INTERNAL_MOCK_STORAGE__ = {};
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY] = JSON.stringify({
    valueTrue: true,
    valueFalse: false,
  });
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY_EXISTS_A] = JSON.stringify([
    '2020-07-19',
    '2020-07-20',
    '2020-08-01',
    '2020-08-02',
    '2020-08-01',
    '2020-08-11',
    '2020-08-20',
    '2020-08-21',
    '2020-08-22',
  ]);
  AsyncStorage.__INTERNAL_MOCK_STORAGE__[KEY_EXISTS_B] = JSON.stringify([
    {weight: 100, reps: 10, date: '2020-07-19T07:08:34.101Z', oneRM: 135, score: 174.2},
    {weight: 110, reps: 5, date: '2020-07-20T07:18:41.823Z', oneRM: 127.5, score: 74.4},
    {weight: 110, reps: 5, date: '2020-08-01T07:18:41.823Z', oneRM: 127.5, score: 74.4},
  ]);
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
    await retrieveData(KEY);
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
});

//---------------- Testcases for storeData ----------------

it('checks if storeData accesses database', async () => {
  let data = [];
  await storeData(KEY, data);
  expect(AsyncStorage.setItem).toBeCalledWith(KEY, JSON.stringify(data));
});
