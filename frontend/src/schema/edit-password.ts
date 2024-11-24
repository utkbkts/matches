import { z } from "zod";

const passwordRequired = z
  .string({
    required_error: "required",
  })
  .min(6, "min length should be 6")
  .regex(/^[^<>/]*$/, "Invalid characters in password");

export const passwordUpdateSchema = z
  .object({
    newPassword: passwordRequired,
    confirmPassword: passwordRequired,
    currentPassword: passwordRequired,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>;
