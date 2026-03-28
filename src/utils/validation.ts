/**
 * =============================================================================
 * VALIDATION UTILS — Form Validation Schemas
 * =============================================================================
 *
 * PURPOSE:
 * Centralized validation rules for all auth forms using the Zod library.
 * Zod provides type-safe validation that works great with react-hook-form.
 *
 * WHY ZOD?
 * 1. Type inference — your TypeScript types auto-match your validation
 * 2. Composable — schemas can be combined and extended
 * 3. Clear error messages — easy to customize per field
 *
 * HOW IT CONNECTS:
 * Forms use react-hook-form with @hookform/resolvers/zod to auto-validate
 * on submit and show errors under each field.
 * =============================================================================
 */

import { z } from "zod";

/* --------------------------------------------------------------------------
 * SIGN UP SCHEMA
 * Validates all fields on the registration form.
 * The .refine() at the end checks that both passwords match.
 * -------------------------------------------------------------------------- */
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This attaches the error to confirmPassword field
  });

/** TypeScript type inferred from the schema — auto-matches validation rules */
export type SignUpFormData = z.infer<typeof signUpSchema>;

/* --------------------------------------------------------------------------
 * SIGN IN SCHEMA
 * Simpler validation — just email format and required password.
 * -------------------------------------------------------------------------- */
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/* --------------------------------------------------------------------------
 * FORGOT PASSWORD SCHEMA
 * Only needs a valid email address.
 * -------------------------------------------------------------------------- */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
