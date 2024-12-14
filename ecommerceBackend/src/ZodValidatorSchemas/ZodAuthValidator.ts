import { z } from "zod";


// Zod registration
export const ZodSignupValidator = z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email format").trim(),
    password: z.string({ required_error: "Password is required." }).trim().min(8, "Password must be at least 8 characters."),
})

export type ZodSignupSchemaType = z.infer<typeof ZodSignupValidator>

// Zod login
export const ZodLoginValidator = z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email format").trim(),
    password: z.string({ required_error: "Password is required." }).trim().min(8, "Password must be at least 8 characters."),
})

export type ZodLoginSchemaType = z.infer<typeof ZodLoginValidator>

//// Zod Email validation
export const ZodEmailValidation = z.object({
    otp: z.string({ required_error: "OTP is required for the validation." }).trim()
})

export type ZodEmailValidationSchemaType = z.infer<typeof ZodEmailValidation>;