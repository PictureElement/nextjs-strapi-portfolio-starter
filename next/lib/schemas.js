import { z } from "zod";

//
// Reusable
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
});

const imageSchema = z.object({
  alternativeText: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
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

const serviceEntrySchema = z.object({
  id: z.number(),
  description: z.string(),
  title: z.string(),
});

const experienceEntrySchema = z.object({
  id: z.number(),
  role: z.string(),
  company: z.string(),
  companyUrl: z.string().nullable(), // Allow null values
  duration: z.string(),
  location: z.string(),
  content: z.string(),
  companyLogo: imageSchema,
})

const faqEntrySchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

const testimonialEntrySchema = z.object({
  id: z.number(),
  statement: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  companyWebsite: z.string(),
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

const childSkillSchema = z.object({
  name: z.string(),
  value: z.number(),
});

const parentSkillSchema = z.object({
  name: z.string(),
  children: z.array(childSkillSchema),
});

const scopeSchema = z.object({
  id: z.number(),
  title: z.string(),
});

const toolSchema = z.object({
  id: z.number(),
  title: z.string(),
});

//
// Pages
//

export const blog1Schema = z.object({
  data: z.array(postEntrySchema), // Can be empty
});

export const blog2Schema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

export const projects1Schema = z.object({
  data: z.array(projectEntrySchema), // Can be empty
});

export const projects2Schema = z.object({
  data: z.object({
    banner: bannerSchema,
  })
});

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

export const project1Schema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

export const project2Schema = z.object({
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

export const projectMetadataSchema = z.object({
  data: z.array(z.object({
    title: z.string(),
    excerpt: z.string(),
  })),
});

export const post1Schema = z.object({
  data: z.array(z.object({
    slug: z.string(),
  })),
});

export const post2Schema = z.object({
  data: z.array(z.object({
    title: z.string(),
    content: z.string(),
    publishedAt: z.string().datetime(),
    featuredImage: imageSchema,
  })),
});

export const postMetadataSchema = z.object({
  data: z.array(z.object({
    title: z.string(),
    excerpt: z.string(),
  })),
});

//
// Components
//

export const metadataSchema = z.object({
  data: z.object({
    metadata: z.object({
      title: z.string(),
      description: z.string(),
      openGraphImage: imageSchema,
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
      serviceList: z.array(serviceEntrySchema).nonempty(), // At least one entry is required
    })
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

export const skillsSchema = z.object({
  data: z.object({
    skills: sectionHeaderSchema.extend({
      chartData: z.array(parentSkillSchema),
      ariaLabelSSR: z.string(),
      ariaLabelCSR: z.string(),
    })
  })
});

export const experienceSchema = z.object({
  data: z.object({
    experience: sectionHeaderSchema.extend({
      experienceList: z.array(experienceEntrySchema).nonempty(), // At least one entry is required
    })
  })
});

export const testimonialsSchema = z.object({
  data: z.object({
    testimonials: sectionHeaderSchema.extend({
      testimonialList: z.array(testimonialEntrySchema).nonempty(), // At least one entry is required
    })
  })
});

export const faqSchema = z.object({
  data: z.object({
    faq: sectionHeaderSchema.extend({
      faqList: z.array(faqEntrySchema).nonempty(), // At least one entry is required
    })
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
