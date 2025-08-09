import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, 'Phone must be 11 digits and start with 09'),
});

/**
 * Validates values against the login schema.
 * Returns a uniform shape with success, data, and errors.
 */
export function validateLogin(values) {
  const parsed = loginSchema.safeParse(values);
  if (parsed.success) {
    return { success: true, data: parsed.data, errors: {} };
  }
  const errors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join('.') || '_';
    errors[key] = issue.message;
  }
  return { success: false, errors };
}