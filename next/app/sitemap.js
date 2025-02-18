import { fetchPostSitemap, fetchProjectSitemap } from "@/lib/api";

export default async function sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE;

  let posts = [];
  let projects = [];

  try {
    // Fetch posts and projects concurrently
    const [postData, projectData] = await Promise.all([
      fetchPostSitemap(),
      fetchProjectSitemap(),
    ]);
    posts = postData || [];
    projects = projectData || [];
  } catch (error) {
    console.error(error.message);
  }

  const createUrlDefinitions = (items, basePath) =>
    items.map((item) => ({
      url: new URL(`${basePath}/${item.slug}/`, BASE_URL).href,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

  const postUrlDefinitions = createUrlDefinitions(posts, "/blog");
  const projectUrlDefinitions = createUrlDefinitions(projects, "/projects");

  return [
    {
      url: new URL('/', BASE_URL).href,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: new URL('/projects/', BASE_URL).href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/blog/', BASE_URL).href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/contact/', BASE_URL).href,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: new URL('/privacy-policy/', BASE_URL).href,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...projectUrlDefinitions,
    ...postUrlDefinitions,
  ]
}