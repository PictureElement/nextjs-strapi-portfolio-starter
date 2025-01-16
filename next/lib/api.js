import {
  miscellaneousSchema,
  announcementSchema,
  headerSchema,
  heroSchema,
  aboutSchema,
  servicesSchema,
  featuredProjects1Schema,
  featuredProjects2Schema,
  skillsSchema,
  experienceSchema,
  testimonialsSchema,
  faqSchema,
  latestPosts1Schema,
  latestPosts2Schema,
  ctaSchema,
  footerSchema,
  projects1Schema,
  projects2Schema,
  posts1Schema,
  posts2Schema,
  contact1Schema,
  contact2Schema,
  privacySchema,
  notFoundSchema,
  projectSlugsSchema,
  projectSchema,
  postSlugsSchema,
  postSchema,
  dynamicPageMetadataSchema,
  staticPageMetadataSchema,
  postSitemapSchema,
  projectSitemapSchema,
} from "./schemas";

const qs = require('qs');

//
// Main Fetch Function
//

async function fetchData(endpoint, options = {}) {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_STRAPI).href;

  const cacheStrategy = process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store';

  try {
    const res = await fetch(url, { cache: cacheStrategy, ...options });

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
// Component Related
//

export const fetchMiscellaneous = async () => {
  const endpoint = '/api/global?populate[miscellaneous][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, miscellaneousSchema, endpoint);
  return validatedData.data.miscellaneous;
};

export const fetchAnnouncement = async () => {
  const endpoint = '/api/global?populate[announcement][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, announcementSchema, endpoint);
  return validatedData.data.announcement;
};

export const fetchHeader = async () => {
  const endpoint = '/api/global?populate[header][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, headerSchema, endpoint);
  return {
    logo: validatedData.data.header.logo,
    additionalNavigationItems: validatedData.data.header.additionalNavigationItems,
    cta: validatedData.data.header.cta,
    logomark: validatedData.data.header.logomark,
  };
};

export const fetchHero = async () => {
  const endpoint = '/api/homepage?populate[hero][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, heroSchema, endpoint);
  return validatedData.data.hero;
};

export const fetchAbout = async () => {
  const endpoint = '/api/homepage?populate[about][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, aboutSchema, endpoint);
  return validatedData.data.about;
};

export const fetchServices = async () => {
  const endpoint = '/api/homepage?populate[services][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, servicesSchema, endpoint);
  return validatedData.data.services;
};

export const fetchSkills = async () => {
  const endpoint = '/api/homepage?populate[skills][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, skillsSchema, endpoint);
  return validatedData.data.skills;
};

export const fetchExperience = async () => {
  const endpoint = '/api/homepage?populate[experience][populate][0]=experienceList.companyLogo';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, experienceSchema, endpoint);
  return validatedData.data.experience;
};

export const fetchTestimonials = async () => {
  const endpoint = '/api/homepage?populate[testimonials][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, testimonialsSchema, endpoint);
  return validatedData.data.testimonials;
};

export const fetchFaq = async () => {
  const endpoint = '/api/homepage?populate[faq][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, faqSchema, endpoint);
  return validatedData.data.faq;
};

export const fetchCta = async () => {
  const endpoint = '/api/global?populate[cta][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, ctaSchema, endpoint);
  return validatedData.data.cta;
};

export const fetchFooter = async () => {
  const endpoint = '/api/global?populate[footer][populate]=*&populate[contactInformation][populate]=*';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, footerSchema, endpoint);
  return {
    statement: validatedData.data.footer.statement,
    headingColumn1: validatedData.data.footer.headingColumn1,
    headingColumn2: validatedData.data.footer.headingColumn2,
    headingColumn3: validatedData.data.footer.headingColumn3,
    copyright: validatedData.data.footer.copyright,
    linksColumn2: validatedData.data.footer.linksColumn2,
    linksColumn3: validatedData.data.footer.linksColumn3,
    email: validatedData.data.contactInformation.email,
    schedulingLink: validatedData.data.contactInformation.schedulingLink,
    workingHours: validatedData.data.contactInformation.workingHours,
    phone: validatedData.data.contactInformation.phone,
    socialChannels: validatedData.data.contactInformation.socialChannels,
  }
};

//
// Single Type Related
//

export const fetchContact = async () => {
  // Fetch banner and headings
  const endpoint1 = "/api/contact-page?populate=banner&populate=author";
  // Fetch contact information
  const query2 = qs.stringify(
    {
      populate: {
        contactInformation: {
          populate: ['socialChannels'],
        }
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  console.log(query2);
  const endpoint2 = `/api/global?${query2}`;
  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);
  const validatedData1 = await validateResponse(response1, contact1Schema, endpoint1);
  const validatedData2 = await validateResponse(response2, contact2Schema, endpoint2);
  return {
    headline: validatedData1.data.banner.headline,
    supportiveText: validatedData1.data.banner.supportiveText,
    contactFormHeading: validatedData1.data.contactFormHeading,
    otherContactOptionsHeading: validatedData1.data.otherContactOptionsHeading,
    author: validatedData1.data.author,
    email: validatedData2.data.contactInformation.email,
    schedulingLink: validatedData2.data.contactInformation.schedulingLink,
    workingHours: validatedData2.data.contactInformation.workingHours,
    phone: validatedData2.data.contactInformation.phone,
    socialChannels: validatedData2.data.contactInformation.socialChannels,
  }
};

export const fetchPrivacy = async () => {
  const endpoint = '/api/privacy-policy?populate=banner';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, privacySchema, endpoint);
  return {
    headline: validatedData.data.banner.headline,
    supportiveText: validatedData.data.banner.supportiveText,
    content: validatedData.data.content,
  }
};

export const fetchNotFound = async () => {
  const endpoint = '/api/not-found?populate=banner';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, notFoundSchema, endpoint);
  return {
    headline: validatedData.data.banner.headline,
    supportiveText: validatedData.data.banner.supportiveText,
  }
};

//
// Collection Type Related
//

export const fetchPosts = async () => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=createdAt&populate=featuredImage&populate=author&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=100";
  // Fetch the banner
  const endpoint2 = "/api/blog-page?populate=banner";
  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);
  const validatedData1 = await validateResponse(response1, posts1Schema, endpoint1);
  const validatedData2 = await validateResponse(response2, posts2Schema, endpoint2);
  return {
    headline: validatedData2.data.banner.headline,
    supportiveText: validatedData2.data.banner.supportiveText,
    posts: validatedData1.data,
  }
};

export const fetchLatestPosts = async () => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=createdAt&sort=createdAt:desc&pagination[start]=0&pagination[limit]=3";
  // Fetch the headline and supportive text
  const endpoint2 = "/api/homepage?populate[latestPosts][populate]=*";
  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);
  const validatedData1 = await validateResponse(response1, latestPosts1Schema, endpoint1);
  const validatedData2 = await validateResponse(response2, latestPosts2Schema, endpoint2);
  return {
    headline: validatedData2.data.latestPosts.headline,
    supportiveText: validatedData2.data.latestPosts.supportiveText,
    latestPosts: validatedData1.data,
  }
};

export const fetchPost = async (slug) => {
  // Fetch post by slug
  const endpoint = `/api/posts?filters[slug]=${slug}&populate=*`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postSchema, endpoint);

  // Return null if the data is undefined or the array is empty (no post found for the given slug)
  if (!validatedData.data || validatedData.data.length === 0) return null;

  const post = validatedData.data[0];

  return {
    author: post.author,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    featuredImage: post.featuredImage,
  }
};

export const fetchPostSlugs = async () => {
  // Fetch all possible post slugs
  const endpoint = '/api/posts?fields=slug';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postSlugsSchema, endpoint);
  const posts = validatedData.data;
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const fetchPostSitemap = async () => {
  const endpoint = '/api/posts?fields=slug&fields=updatedAt';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postSitemapSchema, endpoint);
  const posts = validatedData.data;
  return posts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt,
  }));
};

export const fetchProjects = async () => {
  // Fetch projects sorted by the order field in ascending order
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&sort=order:asc&pagination[page]=1&pagination[pageSize]=100";
  // Fetch the banner
  const endpoint2 = "/api/projects-page?populate=banner";
  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);
  const validatedData1 = await validateResponse(response1, projects1Schema, endpoint1);
  const validatedData2 = await validateResponse(response2, projects2Schema, endpoint2);
  return {
    headline: validatedData2.data.banner.headline,
    supportiveText: validatedData2.data.banner.supportiveText,
    projects: validatedData1.data,
  }
};

export const fetchFeaturedProjects = async () => {
  // Fetch featured projects sorted by the order field in ascending order
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&filters[isFeatured][$eq]=true&sort=order:asc";
  // Fetch the headline and supportive text
  const endpoint2 = "/api/homepage?populate[featuredProjects][populate]=*";
  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);
  const validatedData1 = await validateResponse(response1, featuredProjects1Schema, endpoint1);
  const validatedData2 = await validateResponse(response2, featuredProjects2Schema, endpoint2);
  return {
    headline: validatedData2.data.featuredProjects.headline,
    supportiveText: validatedData2.data.featuredProjects.supportiveText,
    featuredProjects: validatedData1.data,
  }
};

export const fetchProject = async (slug) => {
  // Fetch project by slug
  const endpoint = `/api/projects?filters[slug]=${slug}&populate=*`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectSchema, endpoint);

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

export const fetchProjectSlugs = async () => {
  // Fetch all possible project slugs
  const endpoint = '/api/projects?fields=slug';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectSlugsSchema, endpoint);
  const projects = validatedData.data;
  return projects.map((project) => ({
    slug: project.slug,
  }));
};

export const fetchProjectSitemap = async () => {
  const endpoint = '/api/projects?fields=slug&fields=updatedAt';
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectSitemapSchema, endpoint);
  const posts = validatedData.data;
  return posts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt,
  }));
};

//
// Utilities
//

export const fetchStaticPageMetadata = async (resource) => {
  const endpoint = `/api/${resource}?populate[metadata][populate]=openGraphImage`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, staticPageMetadataSchema, endpoint);
  return validatedData.data.metadata;
}

export const fetchDynamicPageMetadata = async (resource, slug) => {
  const endpoint = `/api/${resource}?filters[slug]=${slug}&fields=title&fields=excerpt&populate=featuredImage`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, dynamicPageMetadataSchema, endpoint);
  return {
    title: validatedData.data[0].title,
    description: validatedData.data[0].excerpt,
    openGraphImage: validatedData.data[0].featuredImage,
  }
};
