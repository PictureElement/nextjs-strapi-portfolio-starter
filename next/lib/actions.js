'use server';

import { formSchema } from "./schemas";

const createLead = async (data) => {
  const token = process.env.STRAPI_FORM_TOKEN;
  const endpoint = `/api/leads`;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }), // Wrap data in a 'data' object as required by Strapi
  };

  try {
    const res = await fetch(new URL(endpoint, process.env.NEXT_PUBLIC_STRAPI).href, options);

    if (!res.ok) {
      throw new Error(`Failed to create submission: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // Return the response from Strapi
  } catch (error) {
    console.error(`Error creating submission: ${error.message}`);
    throw new Error(`Unable to create submission.`);
  }
};

const sanitizeInput = (data) => ({
  name: data.name.trim(),
  email: data.email.trim(),
  message: data.message.trim(),
  consent: data.consent,
});

export async function onSubmitAction(data) {
  try {
    // Check honeypot field
    if (data.name) {
      console.warn("Spam detected via honeypot:", data.name);
      throw new Error("Spam submission detected");
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(data);

    // Validate data using Zod
    const result = formSchema.safeParse(sanitizedData);

    if (!result.success) {
      console.error(`Validation failed for form data:`, result.error);
      throw new Error(`Invalid data received from form submission`);
    }

    const validatedData = result.data;

    const { name, ...dataWithoutName } = validatedData;

    // Save lead to database
    await createLead(dataWithoutName);

    // Send email notification
  } catch (error) {
    console.error("Error processing form data: ", error);
    throw new Error("Error processing form data");
  }
}