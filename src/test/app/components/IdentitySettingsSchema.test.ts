import { identitySchema } from "@/app/components/IdentitySettingsSchema";

describe("IdentitySettingsSchema", () => {
  const validData = {
    displayName: "Juan Pérez",
    email: "juan@example.com",
  };

  it("validates correct data", () => {
    const result = identitySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty displayName", () => {
    const result = identitySchema.safeParse({ ...validData, displayName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("displayName");
    }
  });

  it("rejects empty email", () => {
    const result = identitySchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejects invalid email", () => {
    const result = identitySchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts valid email with subdomain", () => {
    const result = identitySchema.safeParse({
      ...validData,
      email: "test@sub.example.com",
    });
    expect(result.success).toBe(true);
  });

  it("returns correct type inference", () => {
    const parsed = identitySchema.parse(validData);
    expect(typeof parsed.displayName).toBe("string");
    expect(typeof parsed.email).toBe("string");
  });
});
