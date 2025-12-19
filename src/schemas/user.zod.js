import { z } from "zod";

export const userModel = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.number().refine((n) => {
    return n.toString().length === 10;
  }),
});
