'use server';

import { formSchema } from "@/lib/schemas";

export async function onSubmitAction(data) {
  try {
    // Validate data using Zod
    const result = formSchema.safeParse(data);

    if (!result.success) {
      console.error(`Validation failed for form data:`, result.error);
      throw new Error(`Invalid data received from form submission`);
    }

    const validatedData = result.data;

    console.log("Validated data: ", validatedData);

    // Send email notification
  } catch (error) {
    console.error("Error processing form data: ", error);
    throw new Error("Error processing form data");
  }
}