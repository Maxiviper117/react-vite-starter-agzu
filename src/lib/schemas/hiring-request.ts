import { z } from 'zod'

const optionalText = z.string().trim().optional()

const optionalEmail = z.union([
  z.string().trim().email('Please enter a valid email address'),
  z.literal(''),
]).optional()

const optionalUrl = z.union([
  z.string().trim().url('Please enter a valid website URL'),
  z.literal(''),
]).optional()

export const roleEntrySchema = z.object({
  jobTitle: z.string().trim().min(1, 'Job title is required'),
  requiredSoftwareTools: optionalText,
  otherRequiredSoftwareTools: optionalText,
  hoursOfOperation: optionalText,
  jobExperienceRequirements: optionalText,
  numberOfEmployeesNeeded: z.coerce
    .number()
    .int('Number of employees must be a whole number')
    .optional(),
})

export const hiringRequestSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, 'Business name is required'),
  businessWebsite: optionalUrl,
  firstName: optionalText,
  lastName: optionalText,
  phone: optionalText,
  email: z
    .email('Please enter a valid email address')
    .trim()
    .min(1, 'Email is required'),
  secondaryEmail: optionalEmail,
  roles: z.array(roleEntrySchema),
  traits: optionalText,
  outsourced: optionalText,
  additionalDetails: optionalText,
})

export type RoleEntry = z.infer<typeof roleEntrySchema>

export type HiringRequestFormInput = z.input<typeof hiringRequestSchema>
export type HiringRequestFormValues = z.output<typeof hiringRequestSchema>
