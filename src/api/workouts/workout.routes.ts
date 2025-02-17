import express from "express";
import { db } from "src/db";
import requireAuth from "src/middleware/require-auth";
import { validate } from "src/middleware/validate";
import { validateResource } from "src/middleware/validateResource";
import { userSchema } from "src/schema/user.schema";
import { workoutSchema } from "src/schema/workout.schema";
import { z } from "zod";

const router = express.Router();

router.use(requireAuth); // all routes require authentication

router.get("/", async (req, res) => {
  const workouts = await db.workout.findMany({
    where: {
      userId: req.user!.userId,
    },
  });
  res.json(workouts);
});

router.post(
  "/",
  validate(workoutSchema.omit({ id: true, userId: true })),
  async (req, res) => {
    const workout = await db.workout.create({
      data: {
        userId: req.user!.userId, // user id is managed by the auth middleware
        name: req.body.name,
        notes: req.body.notes,
      },
    });
    res.json(workout);
  }
);

router.put(
  "/:id",
  validate(workoutSchema.omit({ id: true, userId: true })),
  async (req, res) => {
    const workout = await db.workout.update({
      where: {
        id: req.params.id as unknown as number,
        userId: req.user!.userId,
      },
      data: req.body,
    });
  }
);

router.delete(
  "/:id",
  validateResource(z.object({ params: workoutSchema.pick({ id: true }) })),
  async (req, res) => {
    await db.workout.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({ message: "Workout deleted" });
  }
);

export { router as workoutRouter };
