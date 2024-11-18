import { z } from "zod";

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, "min length should be 3")
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ^"\s]*$/, {
    message: "Invalid characters in search query",
  });

export const editProfileSchema = z.object({
  name: requiredStringName,
  description: requiredStringName,
  city: requiredStringName,
  country: requiredStringName,
});

export type EditFormData = z.infer<typeof editProfileSchema>;