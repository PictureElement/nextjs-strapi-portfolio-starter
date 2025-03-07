import { z } from "zod";

//
// Patterns
//

const imageSchema = z.object({
  alternativeText: z.string().nullable(), // Allow null values
  width: z.number().nullable(), // Allow null values
  height: z.number().nullable(), // Allow null values
  url: z.string(),
});

const bannerSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

const metadataSchema = z.object({
  title: z.string().nullable(), // Allow null values
  description: z.string().nullable(), // Allow null values
  image: imageSchema.nullable(), // Allow null values
});

const socialChannelSchema = z.object({
  id: z.number(),
  channel: z.string().refine(
    (val) => val === 'GitHub' || val == 'LinkedIn' || val === 'X',
    { message: "Value must be 'GitHub', 'LinkedIn' or 'X'" }
  ),
  url: z.string(),
  label: z.string(),
});

const linkSchema = z.object({
  id: z.number(),
  label: z.string(),
  url: z.string(),
  openLinkInNewTab: z.boolean(),
  sameHostLink: z.boolean(),
  showIcon: z.boolean(),
  iconType: z.enum(["arrowRight", "arrowUpRight"]),
});

const sectionHeaderSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

//
// Entries
//

const authorEntrySchema = z.object({
  id: z.number(),
  authorName: z.string(),
  isOrganization: z.boolean(),
  url: z.string()
}).nullable();

const postEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  featuredImage: imageSchema,
  author: authorEntrySchema,
});

const projectEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  demoUrl: z.string().nullable(), // Allow null values
  repoUrl: z.string().nullable(), // Allow null values
  content: z.string(),
  duration: z.string(),
  featuredImage: imageSchema,
  scopes: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ), // Can be empty
  tools: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ), // Can be empty
  designFile: z.object({
    url: z.string(),
  }).nullable(), // Allow null values
  author: authorEntrySchema,
});

//
// Collections
//

export const postCollectionSchema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

export const projectCollectionSchema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

//
// Layout & Pages
//

export const layoutSchema = z.object({
  data: z.object({
    announcement: z.object({
      content: z.string().nullable(), // Allow null values
    }),
    header: z.object({
      additionalNavigationItems: z.array(linkSchema),
      cta: linkSchema,
    }),
    cta: sectionHeaderSchema.extend({
      button: linkSchema,
    }),
    footer: z.object({
      statement: z.string(),
      copyright: z.string(),
    }),
    siteRepresentation: z.object({
      isOrganization: z.boolean(),
      siteName: z.string(),
      siteDescription: z.string(),
      siteImage: imageSchema,
      jobTitle: z.string().nullable(), // Allow null values
      schedulingLink: z.string().nullable(), // Allow null values
      logo: imageSchema,
      logomark: imageSchema,
      socialChannels: z.array(socialChannelSchema), // Can be empty
      addressLocality: z.string(),
      areaServed: z.string().nullable(), // Allow null values
      businessHours: z.string().nullable(), // Allow null values
      knowsAbout: z.array(
        z.object({
          name: z.string(),
          children: z.array(
            z.object({
              name: z.string(),
              value: z.number(),
            })
          ),
        })
      ),
    }),
    miscellaneous: z.object({
      localeString: z.string(),
      htmlLanguageTag: z.string(),
      themeColor: z.string(),
    }),
    icons: z.object({
      iconICO: imageSchema,
      iconSVG: imageSchema,
      iconPNG: imageSchema,
    }),
  })
});

export const homePageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    hero: sectionHeaderSchema.extend({
      greeting: z.string().nullable(), // Allow null values
      primaryButton: linkSchema.nullable(), // Allow null values
      secondaryButton: linkSchema.nullable(), // Allow null values
    }),
    about: sectionHeaderSchema.extend({
      content: z.string(),
      image: imageSchema,
    }),
    featuredProjects: sectionHeaderSchema,
    skills: sectionHeaderSchema,
    testimonials: sectionHeaderSchema.extend({
      testimonialList: z.array(
        z.object({
          id: z.number(),
          statement: z.string(),
          author: z.string(),
          role: z.string(),
          company: z.string(),
          companyWebsite: z.string(),
        })
      ).nonempty(), // At least one entry is required
    }),
    faq: sectionHeaderSchema.extend({
      faqList: z.array(
        z.object({
          id: z.number(),
          question: z.string(),
          answer: z.string(),
        })
      ).nonempty(), // At least one entry is required
    }),
    latestPosts: sectionHeaderSchema,
    useCaseSpecificContent: z.array(
      z.discriminatedUnion('__component', [
        sectionHeaderSchema.extend({
          __component: z.literal('sections.services'),
          serviceList: z.array(
            z.object({
              id: z.number(),
              description: z.string(),
              title: z.string(),
            })
          ).nonempty(), // At least one service entry is required
        }),
        sectionHeaderSchema.extend({
          __component: z.literal('sections.experience'),
          experienceList: z.array(
            z.object({
              id: z.number(),
              role: z.string(),
              company: z.string(),
              companyUrl: z.string().nullable(), // Allow null values
              duration: z.string(),
              location: z.string(),
              description: z.string(),
              content: z.string(),
              companyLogo: imageSchema,
            })
          ).nonempty(), // At least one experience entry is required
        }),
      ]),
    ),
  })
});

export const projectsPageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

export const blogPageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

export const contactPageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
    contactFormHeading: z.string(),
    otherContactOptionsHeading: z.string(),
  })
});

export const privacyPageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
    content: z.string(),
  })
});

export const notFoundPageSchema = z.object({
  data: z.object({
    metadata: metadataSchema,
    banner: bannerSchema,
  })
});

//
// Form
//
export const formSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().nonempty({
    message: 'Email is required.',
  }).email({
    message: 'Invalid email address.',
  }),
  message: z.string().trim().nonempty({
    message: 'Message is required.',
  }).min(10, {
    message: 'Message must be at least 10 characters long.',
  }),
  consent: z.boolean().refine(
    (val) => val === true,
    { message: 'Consent is required.' }
  ),
});

//
// Utilities
//

export const allSlugsSchema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

export const dynamicPageMetadataSchema = z.object({
  data: z.array(z.object({
    title: z.string(),
    excerpt: z.string(),
    featuredImage: imageSchema,
  })),
});
