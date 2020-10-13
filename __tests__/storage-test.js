/**
 * Test cases for the storage
 */

import 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {dataExists, retrieveData, storeData} from 'components/storage';

const KEY = 'testkey';

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
});

//---------------- Testcases for retrieveData ----------------

it('checks if retrieveData accesses database', async () => {
  await retrieveData(KEY);
  expect(AsyncStorage.getItem).toBeCalledWith(KEY);
});

//---------------- Testcases for storeData ----------------

it('checks if storeData accesses database', async () => {
  let data = [];
  await storeData(KEY, data);
  expect(AsyncStorage.setItem).toBeCalledWith(KEY, JSON.stringify(data));
});
