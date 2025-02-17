import { z } from "zod";
import { User } from "@prisma/client";

export const userSchema = z.object({
  id: z.coerce.number(),
  email: z.string(),
  password: z.string(),
});

export const userInsertSchema = userSchema.omit({ id: true });

export type UserSchema = z.infer<typeof userSchema>;
export type UserInsertSchema = z.infer<typeof userInsertSchema>;

const _typeCheck: User = {} as UserSchema;
const _reverseTypeCheck: UserSchema = {} as User;
