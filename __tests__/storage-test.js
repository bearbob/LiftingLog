/**
 * Test cases for the storage
 */

import 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {dataExists} from 'components/storage';

it('checks if dataExists accesses database', async () => {
  await dataExists('testkey');
  expect(AsyncStorage.getItem).toBeCalledWith('testkey');
});
