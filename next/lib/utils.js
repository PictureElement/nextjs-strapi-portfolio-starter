import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchData(endpoint, options = {}) {
  const baseUrl = process.env.STRAPI;
  const url = new URL(endpoint, baseUrl);

  try {
    const res = await fetch(url.toString(), { cache: 'force-cache', ...options });
    // const res = await fetch(url.toString(), { cache: 'no-store', ...options });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}
