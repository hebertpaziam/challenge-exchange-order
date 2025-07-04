export const JSONStorage = {
  getItem<T>(key: string): T | null {
    return JSON.parse(sessionStorage.getItem(key) || 'null') as T;
  },

  setItem(key: string, value: unknown): void {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);
    }
  },
};
