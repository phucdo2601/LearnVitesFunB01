import { describe, it, expect } from "vitest";

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

describe("All matchers comprehensive example", () => {
  it("should test all matchers in one example", () => {
    const service = new UserService();

    const count = 5;
    expect(count).toBe(5);

    const user = {
      id: 1,
      name: "John",
      role: "admin",
    };

    service.addUser(user);
    expect(service.users[0]).toEqual({
      id: 1,
      name: "John",
      role: "admin",
    });

    // 3. toMatchObject() - Partial object match (can have other properties)
    expect(service.users[0]).toMatchObject({ name: "John" });
    expect(service.users[0]).toMatchObject({ id: 1, role: "admin" });

    // 4. toContain() - Check if array/string contains element
    const tags = ["javascript", "testing", "vitest"];
    expect(tags).toContain("testing");
    expect("vitest is awesome").toContain("awesome");

    // 5. toMatch() - Check if string matches regex
    const dataStr = service.formatDate({ month: 12, day: 25, year: 2024 });
    expect(dataStr).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    expect("test@example.com").toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    // 6. toThrow() - Check if function throws error (must wrap in arrow function)
    expect(() => service.addUser({})).toThrow("User name is required");
    expect(() => service.addUser({ id: 2 })).toThrow();

    // 7. toBeDefined() - Check if value is defined (not undefined)
    expect(service.users).toBeDefined();
    expect(service.addUser).toBeDefined();

    // 8. toBeUndefined() - Check if value is undefined
    expect(service.settings).toBeUndefined();

    // 9. toBeNull() - Check if value is null
    const notFoundUser = service.getUserById(999);
    expect(notFoundUser).toBeNull();
    expect(service.config).toBeNull();

    // 10. toBeTruthy() - Check truthy value (true, non-zero number, non-empty string, object, array)
    expect(service.users.length).toBeTruthy();
    expect("non-empty string").toBeTruthy();
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();

    // 11. toBeFalsy() - Check falsy value (false, 0, "", null, undefined, NaN)
    const emptyService = new UserService();
    expect(emptyService.users.length).toBeFalsy(); // 0 is falsy
    expect(false).toBeFalsy();
    expect("").toBeFalsy();
    expect(0).toBeFalsy();

    // 12. toBeGreaterThan() / toBeLessThan() - Compare numbers
    expect(service.users.length).toBeGreaterThan(0);
    expect(10).toBeGreaterThan(5);
    expect(5).toBeLessThan(10);

    // 13. toHaveLength() - Check array/string length
    expect(service.users).toHaveLength(1);
    expect("hello").toHaveLength(5);
    expect([1, 2, 3]).toHaveLength(3);

    // 14. toHaveProperty() - Check if object has property
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("name", "John");
    expect(user).toHaveProperty("role", "admin");
  });
});
