import { z } from "zod";

export const signupResolvers = z
  .object({
    fullname: z.string().min(3).max(20),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
    username: z.string().min(6).max(30),
    password: z
      .string()
      .min(8)
      .refine(
        (val) => {
          const hasUpperCase = /[A-Z]/.test(val);
          const hasLowerCase = /[a-z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
          return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      ),
    cpassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.cpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["cpassword"],
      });
    }
  });

export type SignupData = z.infer<typeof signupResolvers>;
