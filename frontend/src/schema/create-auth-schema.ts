import { z } from "zod";
import { countries } from "countries-list";

//GLOBAL STRING

const requiredStringName = z
  .string({ required_error: "required" })
  .min(3, "min length should be 3")
  .regex(/^[A-Za-z0-9@?!#%çÇğĞıİöÖşŞüÜ,^"\s]*$/, {
    message: "Invalid characters in search query",
  });

//PASSWORD

const passwordRequired = z
  .string({
    required_error: "required",
  })
  .min(6, "min length should be 6")
  .regex(/^[^<>/]*$/, "Invalid characters in password");

const passwordSchema = z
  .object({
    password: passwordRequired,
    confirmPassword: passwordRequired,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//GENDER

const genderString = z.enum(["male", "female"], {
  required_error: "Gender is required",
  invalid_type_error: "Invalid gender selection",
  message: "required",
});

//COUNTRY
const countryCodes = Object.values(countries).map((item) => item.name);
console.log("🚀 ~ countryCodes:", countryCodes);

const countryString = z.enum(countryCodes as any, {
  required_error: "Country is required",
  message: "required",
});

//IMAGE

const avatarSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const createFormSchema = z
  .object({
    name: requiredStringName,
    email: z.string().email(),
    gender: genderString,
    birthday: z.date(),
    country: countryString,
    city: requiredStringName,
    picture: avatarSchema,
    status: z
      .string()
      .regex(/^[^<>/]*$/, "Invalid characters")
      .optional(),
  })
  .and(passwordSchema);

export type createFormData = z.infer<typeof createFormSchema>;
