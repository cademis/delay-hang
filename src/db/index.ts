import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

db.$queryRaw`PRAGMA journal_mode = WAL;`
  .then(() => console.log("WAL mode enabled"))
  .catch((err) => console.error("db setup error", err));

export { db };
