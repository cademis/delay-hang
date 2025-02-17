import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

export { db };
