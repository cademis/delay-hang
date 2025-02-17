import { z } from "zod";
import { Workout } from "@prisma/client";

// database schem
export const workoutSchema = z.object({
  id: z.number(),
  name: z.string(),
  notes: z.string().nullable().default(null),
  userId: z.number(),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;
export type WorkoutCreateSchema = z.infer<typeof workoutCreateSchema>;

// schema for the create route so that only the client-controlled input is validated
export const workoutCreateSchema = workoutSchema.omit({
  id: true,
  userId: true, // managed by req.user
});

// type checking to ensure that the schema is correct
const _typeCheck: Workout = {} as WorkoutSchema;
const _reverseTypeCheck: WorkoutSchema = {} as Workout;
