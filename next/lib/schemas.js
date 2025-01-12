import { z } from "zod";

//
// Patterns
//

const bannerSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

const contactInformationSchema = z.object({
  email: z.string(),
  phone: z.string().nullable(),
  schedulingLink: z.string().nullable(), // Allow null values
  workingHours: z.string(),
});

const postEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  createdAt: z.string().datetime(),
});

const imageSchema = z.object({
  alternativeText: z.string().nullable(), // Allow null values
  width: z.number().nullable(), // Allow null values
  height: z.number().nullable(), // Allow null values
  url: z.string(),
});

const authorSchema = z.object({
  displayName: z.string(),
});

const linkSchema = z.object({
  id: z.number(),
  label: z.string(),
  url: z.string(),
  openLinkInNewTab: z.boolean(),
  sameHostLink: z.boolean(),
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

const projectEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  featuredImage: imageSchema,
});

const sectionHeaderSchema = z.object({
  headline: z.string(),
  supportiveText: z.string(),
});

//
// Component Related
//

export const miscellaneousSchema = z.object({
  data: z.object({
    miscellaneous: z.object({
      openGraphLocale: z.string(),
      siteName: z.string(),
      description: z.string(),
      htmlLanguage: z.string(),
      themeColor: z.string(),
      openGraphImage: imageSchema,
      iconICO: imageSchema,
      iconSVG: imageSchema,
      iconPNG: imageSchema,
    })
  })
});

export const announcementSchema = z.object({
  data: z.object({
    announcement: z.object({
      content: z.string(),
    })
  })
});

export const headerSchema = z.object({
  data: z.object({
    header: z.object({
      logo: imageSchema,
      navItems: z.array(linkSchema).nonempty(), // At least one entry is required
      cta: linkSchema,
      logomark: imageSchema,
    })
  })
});

export const heroSchema = z.object({
  data: z.object({
    hero: sectionHeaderSchema.extend({
      greeting: z.string().nullable(), // Allow null values
      primaryButton: linkSchema.nullable(), // Allow null values
      secondaryButton: linkSchema.nullable(), // Allow null values
    })
  })
});

export const aboutSchema = z.object({
  data: z.object({
    about: sectionHeaderSchema.extend({
      content: z.string(),
      profileImage: imageSchema,
    })
  })
});

export const servicesSchema = z.object({
  data: z.object({
    services: sectionHeaderSchema.extend({
      serviceList: z.array(
        z.object({
          id: z.number(),
          description: z.string(),
          title: z.string(),
        })
      ).nonempty(), // At least one entry is required
    })
  })
});

export const skillsSchema = z.object({
  data: z.object({
    skills: sectionHeaderSchema.extend({
      chartData: z.array(
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
      ariaLabelSSR: z.string(),
      ariaLabelCSR: z.string(),
    })
  })
});

export const experienceSchema = z.object({
  data: z.object({
    experience: sectionHeaderSchema.extend({
      experienceList: z.array(
        z.object({
          id: z.number(),
          role: z.string(),
          company: z.string(),
          companyUrl: z.string().nullable(), // Allow null values
          duration: z.string(),
          location: z.string(),
          content: z.string(),
          companyLogo: imageSchema,
        })
      ).nonempty(), // At least one entry is required
    })
  })
});

export const testimonialsSchema = z.object({
  data: z.object({
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
    })
  })
});

export const faqSchema = z.object({
  data: z.object({
    faq: sectionHeaderSchema.extend({
      faqList: z.array(
        z.object({
          id: z.number(),
          question: z.string(),
          answer: z.string(),
        })
      ).nonempty(), // At least one entry is required
    })
  })
});

export const ctaSchema = z.object({
  data: z.object({
    cta: sectionHeaderSchema.extend({
      button: linkSchema,
    })
  })
});

export const footerSchema = z.object({
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

//
// Single Type Related
//

export const contact1Schema = z.object({
  data: z.object({
    contactFormHeading: z.string(),
    otherContactOptionsHeading: z.string(),
    banner: bannerSchema,
  })
});

export const contact2Schema = z.object({
  data: z.object({
    contactInformation: contactInformationSchema,
  })
});

export const privacySchema = z.object({
  data: z.object({
    content: z.string(),
    banner: bannerSchema,
  })
});

export const notFoundSchema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

//
// Collection Type Related
//

export const posts1Schema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

export const posts2Schema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

export const latestPosts1Schema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

export const latestPosts2Schema = z.object({
  data: z.object({
    latestPosts: sectionHeaderSchema,
  }),
});

export const postSchema = z.object({
  data: z.array(z.object({
    author: authorSchema.nullable(), // Allow null values
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    featuredImage: imageSchema,
  })),
});

export const postSlugsSchema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

export const postSitemapSchema = z.object({
  data: z.array(z.object({
    slug: z.string(),
    updatedAt: z.string().datetime(),
  })),
});

export const projects1Schema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

export const projects2Schema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

export const featuredProjects1Schema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

export const featuredProjects2Schema = z.object({
  data: z.object({
    featuredProjects: sectionHeaderSchema,
  })
});

export const projectSchema = z.object({
  data: z.array(z.object({
    author: authorSchema.nullable(), // Allow null values
    title: z.string(),
    excerpt: z.string(),
    duration: z.string(),
    demoUrl: z.string().nullable(), // Allow null values
    repoUrl: z.string().nullable(), // Allow null values
    content: z.string(),
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
  })),
});

export const projectSlugsSchema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

export const projectSitemapSchema = z.object({
  data: z.array(z.object({
    slug: z.string(),
    updatedAt: z.string().datetime(),
  })),
});

//
// Utilities
//

export const staticPageMetadataSchema = z.object({
  data: z.object({
    metadata: z.object({
      title: z.string().nullable(), // Allow null values
      description: z.string().nullable(), // Allow null values
      openGraphImage: imageSchema.nullable(), // Allow null values
    })
  })
});

export const dynamicPageMetadataSchema = z.object({
  data: z.array(z.object({
    title: z.string(),
    excerpt: z.string(),
    featuredImage: imageSchema,
  })),
});


















