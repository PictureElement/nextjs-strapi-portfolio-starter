import { fetchPostSitemap, fetchProjectSitemap } from "@/lib/api";

export default async function sitemap() {
  let posts;
  let projects;

  try {
    posts = await fetchPostSitemap();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return [];
  }

  try {
    projects = await fetchProjectSitemap();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return [];
  }

  const postUrlDefinitions = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const projectUrlDefinitions = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    {
      url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: new URL('/projects/', process.env.NEXT_PUBLIC_WEBSITE).href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: new URL('/privacy-policy/', process.env.NEXT_PUBLIC_WEBSITE).href,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...postUrlDefinitions,
    ...projectUrlDefinitions,
  ]
}