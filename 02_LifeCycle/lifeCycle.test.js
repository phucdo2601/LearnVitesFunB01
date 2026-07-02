import { describe, it, expect, beforeEach, afterEach } from "vitest";

class UserService {
  constructor() {
    this.users = [];
    this.config = null;
    this.settings = undefined;
  }

  addUser(user) {
    if (!user || !user.name) {
      throw new Error("User name is required");
    }
    this.users.push(user);
    return user;
  }
  getUserById(id) {
    return this.users.find((u) => u.id === id) || null;
  }
  getConfig() {
    return this.config;
  }
  formatDate(date) {
    return `${date.month}/${date.day}/${date.year}`;
  }
}

describe("User Service", () => {
  let userService;
  let mockDatabase; // Setup: Run before EACH test
  beforeEach(() => {
    // Create new mock database for each test
    mockDatabase = { users: [] }; // Initialize service with mock database
    userService = new UserService(mockDatabase);
    console.log("Test started");
  }); // Cleanup: Run after EACH test
  afterEach(() => {
    // Clean up resources
    mockDatabase = null;
    userService = null;
    console.log("Test finished");
  });
  it("should add user to database", () => {
    // Test logic here
    userService.addUser({ name: "John" });
    expect(mockDatabase.users).toHaveLength(1);
  });
  it("should get user by id", () => {
    // Each test has new mockDatabase (isolation)
    userService.addUser({ id: 1, name: "Jane" });
    expect(userService.getUserById(1).name).toBe("Jane");
  });
});
