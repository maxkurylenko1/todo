export const loadFromStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
      return null;
    }
  }
  return null;
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage for key "${key}":`, error);
  }
};
