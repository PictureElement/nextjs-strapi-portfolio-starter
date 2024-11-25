import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchData(endpoint) {
  const baseUrl = process.env.STRAPI_API_URL;
  const url = new URL(endpoint, baseUrl);

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    const data = await res.json();

    return data?.data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}
