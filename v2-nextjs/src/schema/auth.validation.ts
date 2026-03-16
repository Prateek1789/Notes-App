import { z } from "zod";

export const loginSchema = z.object({
    user_name: z.string().min(1, "Username is required"),
    user_password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
    user_name: z.string().min(4, "Username must be at least"),
    user_email: z.email().min(1, "Email is required"),
    user_password: z.string()
                    .min(8, "Password must be at least 8 characters")
                    .max(40, "Password cannot exceed 40 charachters")
                    .regex(/[A-Z]/, "Password must have at least 1 uppercase letter")
                    .regex(/[a-z]/, "Password must have at least 1 lowercase letter")
                    .regex(/[0-9]/, "Password must have at least 1 number")
                    .regex(/[!@#$%^&*?]/, "Password must have at least one special character"),
    user_confirm_password: z.string().min(1, "Please confirm password"),
}).refine(schema => schema.user_password === schema.user_confirm_password, {
    error: "Passwords do not match",
    path: ["user_confirm_password"]
});

export type LoginSchemaTypes = z.infer<typeof loginSchema>;
export type SignUpSchemaTypes = z.infer<typeof signUpSchema>;