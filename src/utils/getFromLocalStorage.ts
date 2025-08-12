export const loadFromStorage = <T>(key: string, reviver?: (raw: unknown) => T | null): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const parsed = JSON.parse(item);
    return reviver ? reviver(parsed) : (parsed as T);
  } catch (error) {
    console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
    return null;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage for key "${key}":`, error);
  }
};
