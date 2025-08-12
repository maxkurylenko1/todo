import { loadFromStorage, setToStorage } from "../localStorage";

describe("localStorage utils", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should save an item to localStorage", () => {
    const value = { foo: "bar" };
    setToStorage("testKey", value);

    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", JSON.stringify(value));
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify(value));
  });

  it("should load an item from localStorage and parse JSON", () => {
    const value = { foo: "bar" };
    localStorage.setItem("testKey", JSON.stringify(value));

    const loaded = loadFromStorage<typeof value>("testKey");
    expect(localStorage.getItem).toHaveBeenCalledWith("testKey");
    expect(loaded).toEqual(value);
  });

  it("should return null if key does not exist", () => {
    const loaded = loadFromStorage("missingKey");
    expect(localStorage.getItem).toHaveBeenCalledWith("missingKey");
    expect(loaded).toBeNull();
  });

  it("should return null if parsing fails", () => {
    localStorage.setItem("badKey", "not valid json");

    const loaded = loadFromStorage("badKey");
    expect(loaded).toBeNull();
  });
});
