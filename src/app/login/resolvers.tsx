import { z } from "zod";

export const loginResolvers = z.object({
  username: z.string().min(6).max(30),
  password: z.string().min(8),
});

export type loginData = z.infer<typeof loginResolvers>;
