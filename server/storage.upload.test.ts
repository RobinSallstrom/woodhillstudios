import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// Mock storagePut so no real S3 calls are made
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "woodhill/general/abc123.jpg", url: "https://cdn.example.com/woodhill/general/abc123.jpg" }),
}));

// Mock DB helpers
vi.mock("./db", () => ({
  insertMediaFile: vi.fn().mockResolvedValue({
    id: 1,
    fileKey: "woodhill/general/abc123.jpg",
    url: "https://cdn.example.com/woodhill/general/abc123.jpg",
    originalName: "test.jpg",
    mimeType: "image/jpeg",
    fileSize: 1024,
    category: "general",
    artistId: null,
    uploadedBy: 1,
    createdAt: new Date(),
  }),
  listMediaFiles: vi.fn().mockResolvedValue([]),
  deleteMediaFile: vi.fn().mockResolvedValue(undefined),
  getMediaFileById: vi.fn().mockResolvedValue(null),
}));

// Import after mocks are set up
const { appRouter } = await import("./routers");

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: User = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("storage.upload", () => {
  it("uploads a file and returns the record", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a minimal 1x1 JPEG base64
    const base64 = Buffer.from("fake-image-data").toString("base64");

    const result = await caller.storage.upload({
      data: base64,
      originalName: "test.jpg",
      mimeType: "image/jpeg",
      fileSize: 1024,
      category: "general",
    });

    expect(result).toMatchObject({
      id: 1,
      originalName: "test.jpg",
      mimeType: "image/jpeg",
      category: "general",
    });
    expect(result.url).toContain("https://");
  });
});

describe("storage.list", () => {
  it("returns an empty array when no files exist", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.storage.list({ category: "general", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("storage.delete", () => {
  it("throws when file is not found", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.storage.delete({ id: 999 })).rejects.toThrow("File not found");
  });
});
