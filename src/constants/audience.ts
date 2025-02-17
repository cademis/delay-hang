export const Audience = {
  Admin: "admin",
  User: "user",
} as const;

export type Audience = (typeof Audience)[keyof typeof Audience];
