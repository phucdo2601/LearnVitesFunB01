import { describe, it, expect, vi } from "vitest";
describe("Mock Function Basic", () => {
  it("should track function calls", () => {
    // Create mock function
    const mockCallback = vi.fn(); // Call function multiple times with different arguments
    mockCallback("first call");
    mockCallback("second call", 123); // Check number of calls
    expect(mockCallback).toHaveBeenCalledTimes(2); // Check if function was called
    expect(mockCallback).toHaveBeenCalled(); // Check arguments of last call
    expect(mockCallback).toHaveBeenCalledWith("second call", 123);
  });
  it("should mock return values", () => {
    // Mock function with fixed return value
    const mockFn = vi.fn().mockReturnValue(42); // Call function and check return value
    expect(mockFn()).toBe(42);
    expect(mockFn()).toBe(42); // Mock different return values for each call
    const mockFn2 = vi
      .fn()
      .mockReturnValueOnce("first")
      .mockReturnValueOnce("second")
      .mockReturnValue("default");
    expect(mockFn2()).toBe("first");
    expect(mockFn2()).toBe("second");
    expect(mockFn2()).toBe("default");
    expect(mockFn2()).toBe("default");
  });
  it("should access call history", () => {
    const mockFn = vi.fn(); // Call with different arguments
    mockFn(1, 2);
    mockFn("a", "b", "c"); // Access arguments of first call: [1, 2]
    expect(mockFn.mock.calls[0]).toEqual([1, 2]); // Access arguments of second call: ['a', 'b', 'c']
    expect(mockFn.mock.calls[1]).toEqual(["a", "b", "c"]); // Get arguments of last call
    expect(mockFn.mock.lastCall).toEqual(["a", "b", "c"]);
  });
});
