import { JSONStorage } from './storage.util';

describe('JSONStorage', () => {
  const MOCK_KEY = 'testKey';
  const MOCK_VALUE = { data: 'testData' };

  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
  });

  it('should set an item in localStorage', () => {
    JSONStorage.setItem(MOCK_KEY, MOCK_VALUE);
    expect(localStorage.getItem(MOCK_KEY)).toEqual(JSON.stringify(MOCK_VALUE));
  });

  it('should get an item from localStorage', () => {
    localStorage.setItem(MOCK_KEY, JSON.stringify(MOCK_VALUE));
    const retrievedValue = JSONStorage.getItem(MOCK_KEY);
    expect(retrievedValue).toEqual(MOCK_VALUE);
  });

  it('should return null if item does not exist', () => {
    const retrievedValue = JSONStorage.getItem('nonExistentKey');
    expect(retrievedValue).toBeNull();
  });

  it('should remove an item if value is null or undefined', () => {
    localStorage.setItem(MOCK_KEY, JSON.stringify(MOCK_VALUE));
    JSONStorage.setItem(MOCK_KEY, null);
    expect(localStorage.getItem(MOCK_KEY)).toBeNull();

    localStorage.setItem(MOCK_KEY, JSON.stringify(MOCK_VALUE));
    JSONStorage.setItem(MOCK_KEY, undefined);
    expect(localStorage.getItem(MOCK_KEY)).toBeNull();
  });
});
