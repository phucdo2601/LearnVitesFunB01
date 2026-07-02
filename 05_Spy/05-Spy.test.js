// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
describe("Spy Function", () => {
  it("should spy on object method", () => {
    const calculator = {
      add: (a, b) => a + b,
      multiply: (a, b) => a * b,
    }; // Create spy for 'add' method while keeping original implementation
    const addSpy = vi.spyOn(calculator, "add"); // Call method normally
    const result = calculator.add(2, 3); // Method still works normally
    expect(result).toBe(5); // But we can track it
    expect(addSpy).toHaveBeenCalledWith(2, 3);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });
  it("should spy and mock implementation", () => {
    const logger = {
      log: (msg) => console.log(msg),
      error: (msg) => console.error(msg),
    }; // Spy and replace implementation to avoid real logging
    const logSpy = vi.spyOn(logger, "log").mockImplementation(() => {}); // Call function
    logger.log("test message"); // Check it was called but no console output
    expect(logSpy).toHaveBeenCalledWith("test message"); // Restore original function after test
    logSpy.mockRestore();
  });
  it("should spy on window methods", () => {
    // Spy on global object (window, localStorage, etc.)
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {}); // Call alert (doesn't show real popup)
    window.alert("Warning!"); // Check alert was called
    expect(alertSpy).toHaveBeenCalledWith("Warning!"); // Cleanup
    alertSpy.mockRestore();
  });
});
