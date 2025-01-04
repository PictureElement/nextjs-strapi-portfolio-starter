import { z } from "zod";

const bannerSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const contactInformationSchema = z.object({
  email: z.string(),
  phone: z.string().nullable(),
  schedulingLink: z.string().nullable(), // Allow null values
  workingHours: z.string(),
});

const postEntrySchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
});

const imageSchema = z.object({
  alternativeText: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
});

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
  openLinkInNewTab: z.boolean(),
  sameHostLink: z.boolean(),
});

const socialChannelSchema = z.object({
  channel: z.string().refine(
    (val) => val === 'GitHub' || val == 'LinkedIn' || val === 'X',
    { message: "Value must be 'GitHub', 'LinkedIn' or 'X'" }
  ),
  url: z.string(),
  label: z.string(),
});

const serviceEntrySchema = z.object({
  description: z.string(),
  title: z.string(),
});

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const testimonialEntrySchema = z.object({
  statement: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  companyWebsite: z.string(),
});

const projectEntrySchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  featuredImage: imageSchema,
});

const sectionHeaderSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

const childSkillSchema = z.object({
  name: z.string(),
  value: z.number(),
});

const parentSkillSchema = z.object({
  name: z.string(),
  children: z.array(childSkillSchema),
});

const scopeSchema = z.object({
  title: z.string(),
});

const toolSchema = z.object({
  title: z.string(),
});

// /api/contact-page?populate=*
export const contactData1Schema = z.object({
  data: z.object({
    contactFormHeading: z.string(),
    otherContactOptionsHeading: z.string(),
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

// /api/global?populate[contactInformation]=*
export const contactData2Schema = z.object({
  data: z.object({
    contactInformation: contactInformationSchema,
  })
});

// /api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100
export const blogData1Schema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

// /api/blog-page?populate=*
export const blogData2Schema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

// /api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100
export const projectsData1Schema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

// /api/projects-page?populate=*
export const projectsData2Schema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

// /api/privacy-policy?populate=*
export const privacyDataSchema = z.object({
  data: z.object({
    content: z.string(),
    banner: bannerSchema,
  })
});

// /api/not-found?populate=*
export const notFoundDataSchema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

// /api/global?populate[header][populate]=*
export const headerDataSchema = z.object({
  data: z.object({
    header: z.object({
      logo: imageSchema,
      navItems: z.array(linkSchema).nonempty(), // At least one entry is required
      cta: linkSchema,
      logomark: imageSchema,
    })
  })
});

// /api/homepage?populate[hero][populate]=*
export const heroDataSchema = z.object({
  data: z.object({
    hero: sectionHeaderSchema.extend({
      greeting: z.string().nullable(), // Allow null values
      primaryButton: linkSchema.nullable(), // Allow null values
      secondaryButton: linkSchema.nullable(), // Allow null values
    })
  })
});

// /api/homepage?populate[about][populate]=*
export const aboutDataSchema = z.object({
  data: z.object({
    about: sectionHeaderSchema.extend({
      content: z.string(),
      profileImage: imageSchema,
    })
  })
});

// /api/global?populate[cta][populate]=*
export const ctaDataSchema = z.object({
  data: z.object({
    cta: sectionHeaderSchema.extend({
      button: linkSchema,
    })
  })
});

// /api/global?populate[footer][populate]=*&populate[contactInformation][populate]=*
export const footerDataSchema = z.object({
  data: z.object({
    footer: z.object({
      statement: z.string(),
      headingColumn1: z.string(),
      headingColumn2: z.string(),
      headingColumn3: z.string(),
      copyright: z.string(),
      socialChannels: z.array(socialChannelSchema), // Can be empty
      linksColumn2: z.array(linkSchema), // Can be empty
      linksColumn3: z.array(linkSchema), // Can be empty
    }),
    contactInformation: contactInformationSchema,
  })
});

// /api/homepage?populate[services][populate]=*
export const servicesDataSchema = z.object({
  data: z.object({
    services: sectionHeaderSchema.extend({
      serviceList: z.array(serviceEntrySchema).nonempty(), // At least one entry is required
    })
  })
});

// /api/homepage?populate[faq][populate]=*
export const faqDataSchema = z.object({
  data: z.object({
    faq: sectionHeaderSchema.extend({
      faqList: z.array(faqEntrySchema).nonempty(), // At least one entry is required
    })
  })
});

// /api/homepage?populate[testimonials][populate]=*
export const testimonialsDataSchema = z.object({
  data: z.object({
    testimonials: sectionHeaderSchema.extend({
      testimonialList: z.array(testimonialEntrySchema).nonempty(), // At least one entry is required
    })
  })
});

// /api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[start]=0&pagination[limit]=3
export const latestPostsData1Schema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

// /api/homepage?populate[latestPosts][populate]=*
export const latestPostsData2Schema = z.object({
  data: z.object({
    latestPosts: sectionHeaderSchema,
  }),
});

// /api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&filters[isFeatured][$eq]=true
export const featuredProjectsData1Schema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

// /api/homepage?populate[featuredProjects][populate]=*
export const featuredProjectsData2Schema = z.object({
  data: z.object({
    featuredProjects: sectionHeaderSchema,
  })
});

// /api/homepage?populate[skills][populate]=*
export const skillsDataSchema = z.object({
  data: z.object({
    skills: sectionHeaderSchema.extend({
      chartData: z.array(parentSkillSchema),
      ariaLabelSSR: z.string(),
      ariaLabelCSR: z.string(),
    })
  })
});

// /api/projects?filters[slug]=${params.slug}&populate=*
export const projectDataSchema = z.object({
  data: z.array(z.object({
    title: z.string(),
    demoUrl: z.string().nullable(), // Allow null values
    repoUrl: z.string().nullable(), // Allow null values
    content: z.string(),
    featuredImage: imageSchema,
    scopes: z.array(scopeSchema), // Can be empty
    tools: z.array(toolSchema), // Can be empty
    designFile: z.object({
      url: z.string(),
    }).nullable(), // Allow null values
  })),
});

// /api/posts?fields=slug
export const postData1Schema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

// /api/posts?filters[slug]=${params.slug}&populate=*
export const postData2Schema = z.object({
  data: z.array(z.object({
    title: z.string(),
    content: z.string(),
    publishedAt: z.string().datetime(),
    featuredImage: imageSchema,
  })),
});