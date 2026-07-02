import { describe, it, expect, vi } from "vitest"; // Async functions to test
const fetchUser = async (id) => {
  if (id < 0) throw new Error("Invalid ID");
  return { id, name: "User " + id };
};
const saveUser = async (user) => {
  if (!user.name) throw new Error("Name is required");
  return { ...user, saved: true };
};
describe("Async Tests", () => {
  // Method 1: Using async/await
  it("should fetch user successfully", async () => {
    // Wait for promise to resolve
    const user = await fetchUser(1); // Check result
    expect(user).toEqual({ id: 1, name: "User 1" });
  }); // Method 2: Using .resolves matcher
  it("should resolve with user data", async () => {
    // expect().resolves checks promise resolves successfully
    await expect(fetchUser(2)).resolves.toEqual({
      id: 2,
      name: "User 2",
    });
  }); // Method 3: Test promise reject with .rejects
  it("should reject with error for invalid ID", async () => {
    // expect().rejects checks promise is rejected
    await expect(fetchUser(-1)).rejects.toThrow("Invalid ID");
  }); // Method 4: Test error with try/catch
  it("should throw error when name is missing", async () => {
    try {
      await saveUser({ id: 1 }); // If doesn't throw, test fails
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).toBe("Name is required");
    }
  }); // Test with mocked async function
  it("should work with mocked async function", async () => {
    // Mock async function returning promise
    const mockFetch = vi.fn().mockResolvedValue({ data: "success" }); // Call mock function
    const result = await mockFetch(); // Check result
    expect(result).toEqual({ data: "success" });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  }); // Test with mocked async function rejection
  it("should handle rejected promise", async () => {
    // Mock async function throwing error
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error")); // Check promise rejection
    await expect(mockFetch()).rejects.toThrow("Network error");
  });
});
