import { describe, it, expect, vi, beforeEach } from "vitest"; // MUST mock BEFORE importing the module to test
vi.mock("@/services/apiService", () => ({
  // Mock entire module with fake functions
  default: {
    fetchUser: vi.fn().mockResolvedValue({ id: 1, name: "John" }),
    updateUser: vi.fn().mockResolvedValue({ success: true }),
  },
})); // Import after mocking
import apiService from "@/services/apiService";
import UserComponent from "@/components/UserComponent.vue";
describe("Module Mocking", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });
  it("should call mocked API service", async () => {
    // Call mocked function
    const user = await apiService.fetchUser(1); // Check mock result
    expect(user).toEqual({ id: 1, name: "John" }); // Check mock function was called
    expect(apiService.fetchUser).toHaveBeenCalledWith(1);
    expect(apiService.fetchUser).toHaveBeenCalledTimes(1);
  });
  it("should mock only specific functions", async () => {
    // Partial mock
    const actualModule = await vi.importActual("@/utils/helpers");
    vi.mock("@/utils/helpers", () => ({
      ...actualModule, // Only mock formatDate, keep other functions intact
      formatDate: vi.fn().mockReturnValue("2024-01-01"),
    }));
  });
});
