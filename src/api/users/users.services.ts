import { UserInsertSchema } from "src/lib/schema";
import { db } from "../../db";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({ email, password }: UserInsertSchema) => {
  const hashedPassword = bcrypt.hashSync(password, 12);
  return await db.user.create({
    data: { email, password: hashedPassword },
  });
};

export const findUserById = async (id: number) => {
  return await db.user.findUnique({
    where: { id },
  });
};
