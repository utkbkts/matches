import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required",
  })
  .min(1, "Message cannot be empty")
  .max(500, "Message is too long")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const createMessageSchema = z.object({
  message: messageIsRequired,
});

export type createMessagedata = z.infer<typeof createMessageSchema>;
