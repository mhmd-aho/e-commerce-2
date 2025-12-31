import { z } from "zod";
export const signupSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email("Invalid email address"),
    password: z.string().min(6).max(20),
})
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6).max(20),
})