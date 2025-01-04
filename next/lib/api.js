import { heroDataSchema } from "./schemas";

async function fetchData(endpoint, options = {}) {
  const baseUrl = process.env.STRAPI;
  const url = new URL(endpoint, baseUrl);

  const cacheStrategy = process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store';

  try {
    const res = await fetch(url.toString(), { cache: cacheStrategy, ...options });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

export const fetchHeroData = async () => {
  const endpoint = '/api/homepage?populate[hero][populate]=*';
  const response = await fetchData(endpoint);

  const result = heroDataSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data;
};
