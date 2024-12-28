import { z } from "zod";

// /api/contact-page?populate=*
export const contactData1Schema = z.object({
  contactFormHeading: z.string(),
  otherContactOptionsHeading: z.string(),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  banner: z.object({
    headline: z.string(),
    supportiveText: z.string(),
  }),
});

// /api/global?populate[contactInformation]=*
export const contactData2Schema = z.object({
  contactInformation: z.object({
    email: z.string(),
    phone: z.string().nullable(),
    schedulingLink: z.string().nullable(), // Allow null values
    workingHours: z.string(),
  }),
});