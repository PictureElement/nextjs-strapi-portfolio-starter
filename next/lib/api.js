import {
  layoutSchema,
  homePageSchema,
  projectsPageSchema,
  blogPageSchema,
  contactPageSchema,
  privacyPageSchema,
  notFoundPageSchema,
  postCollectionSchema,
  projectCollectionSchema,
  allSlugsSchema,
  dynamicPageMetadataSchema,
} from "./schemas";

const qs = require('qs');

//
// Main Fetch Function
//

async function fetchData(endpoint) {
  const token = process.env.STRAPI_READ_ONLY_TOKEN;
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_STRAPI).href;
  const cacheStrategy = process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store';

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: cacheStrategy,
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}: ${error.message}`);
    throw new Error(`Unable to fetch data from ${endpoint}.`);
  }
}

//
// Validation Utility
//

async function validateResponse(response, schema, endpoint) {
  const result = schema.safeParse(response);
  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }
  return result.data; // Return the parsed data if validation succeeds
}

//
// Layout & Pages
//

export const fetchLayout = async () => {
  const query = qs.stringify(
    {
      populate: {
        siteRepresentation: { populate: "*" },
        icons: { populate: "*" },
        announcement: true,
        header: { populate: "*" },
        cta: { populate: "*" },
        footer: { populate: "*" },
        miscellaneous: { populate: "*" },
      }
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/global?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, layoutSchema, endpoint);
  return {
    announcement: validatedData.data.announcement,
    header: validatedData.data.header,
    cta: validatedData.data.cta,
    footer: validatedData.data.footer,
    siteRepresentation: validatedData.data.siteRepresentation,
    miscellaneous: validatedData.data.miscellaneous,
    icons: validatedData.data.icons,
  }
}

export const fetchHomePage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        hero: { populate: "*" },
        about: { populate: "*" },
        featuredProjects: true,
        skills: true,
        testimonials: { populate: "*" },
        faq: { populate: "*" },
        latestPosts: true,
        useCaseSpecificContent: {
          on: {
            'sections.experience': {
              populate: {
                experienceList: { populate: "*" },
              }
            },
            'sections.services': {
              populate: "*",
            }
          },
        },
      }
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/homepage?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, homePageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    hero: validatedData.data.hero,
    about: validatedData.data.about,
    featuredProjects: validatedData.data.featuredProjects,
    skills: validatedData.data.skills,
    testimonials: validatedData.data.testimonials,
    faq: validatedData.data.faq,
    latestPosts: validatedData.data.latestPosts,
    useCaseSpecificContent: validatedData.data.useCaseSpecificContent,
  }
};

export const fetchProjectsPage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/projects-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectsPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  }
};

export const fetchBlogPage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/blog-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, blogPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  }
};

export const fetchContactPage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
      fields: ['contactFormHeading', 'otherContactOptionsHeading'],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/contact-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, contactPageSchema, endpoint);
  return {
    contactFormHeading: validatedData.data.contactFormHeading,
    otherContactOptionsHeading: validatedData.data.otherContactOptionsHeading,
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  }
};

export const fetchPrivacyPage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
      fields: ['content'],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/privacy-policy?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, privacyPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
    content: validatedData.data.content,
  }
};

export const fetchNotFoundPage = async () => {
  const query = qs.stringify(
    {
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/not-found?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, notFoundPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  }
};

//
// Post-related
//

export const fetchAllPosts = async () => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const query = qs.stringify(
    {
      populate: "*",
      sort: ['createdAt:desc'],
      pagination: {
        pageSize: 100,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchLatestPosts = async () => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const query = qs.stringify(
    {
      populate: "*",
      sort: ['createdAt:desc'],
      pagination: {
        start: 0,
        limit: 3,
      }
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchPostBySlug = async (slug) => {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);

  // Return null if the data is undefined or the array is empty (no post found for the given slug)
  if (!validatedData.data || validatedData.data.length === 0) return null;

  const post = validatedData.data[0];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    featuredImage: post.featuredImage,
    author: post.author,
  }
};

export const fetchPostSitemap = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);
  const posts = validatedData.data;
  return posts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt,
  }));
};

//
// Project-related
//

export const fetchAllProjects = async () => {
  // Fetch projects sorted by the order field in ascending order
  const query = qs.stringify(
    {
      populate: "*",
      sort: ['order:asc'],
      pagination: {
        pageSize: 100,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  return validatedData.data;
}

export const fetchFeaturedProjects = async () => {
  // Fetch featured projects sorted by the order field in ascending order
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        isFeatured: {
          $eq: true,
        },
      },
      sort: ['order:asc'],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchProjectBySlug = async (slug) => {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);

  // Return null if the data is undefined or the array is empty (no project found for the given slug)
  if (!validatedData.data || validatedData.data.length === 0) return null;

  return {
    author: validatedData.data[0].author,
    title: validatedData.data[0].title,
    excerpt: validatedData.data[0].excerpt,
    duration: validatedData.data[0].duration,
    demoUrl: validatedData.data[0].demoUrl,
    repoUrl: validatedData.data[0].repoUrl,
    content: validatedData.data[0].content,
    featuredImage: validatedData.data[0].featuredImage,
    scopes: validatedData.data[0].scopes,
    tools: validatedData.data[0].tools,
    designFile: validatedData.data[0].designFile,
  }
};

export const fetchProjectSitemap = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  const projects = validatedData.data;
  return projects.map((project) => ({
    slug: project.slug,
    updatedAt: project.updatedAt,
  }));
};

//
// Utilities
//

export const fetchAllSlugs = async (resource) => {
  const query = qs.stringify(
    {
      fields: ['slug'],
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/${resource}?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, allSlugsSchema, endpoint);
  const entries = validatedData.data;
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
};

export const fetchDynamicPageMetadata = async (resource, slug) => {
  const query = qs.stringify(
    {
      fields: ['title', 'excerpt'],
      populate: {
        featuredImage: true,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const endpoint = `/api/${resource}?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, dynamicPageMetadataSchema, endpoint);
  return {
    title: validatedData.data[0].title,
    description: validatedData.data[0].excerpt,
    image: validatedData.data[0].featuredImage,
  }
};
