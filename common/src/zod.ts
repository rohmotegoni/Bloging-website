import { z } from "zod";

export const signupinput = z.object({
  username: z.string().email().min(2),
  password: z.string().min(8),
  name: z.string().optional(),
});
export type Signupinput = z.infer<typeof signupinput>;
export const signininput = z.object({
  username: z.string().email().min(2),
  password: z.string().min(8),
});
export type Signininput = z.infer<typeof signininput>;
export const createbloginput = z.object({
  title: z.string(),
  content: z.string(),
});
export type Createbloginput = z.infer<typeof createbloginput>;
export const updatebloginput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});
export type Updatebloginput = z.infer<typeof updatebloginput>;
