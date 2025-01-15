import type { Schema, Struct } from '@strapi/strapi';

export interface BasicButton extends Struct.ComponentSchema {
  collectionName: 'components_basic_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openLinkInNewTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    sameHostLink: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_blocks_announcements';
  info: {
    description: '';
    displayName: 'Announcement';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BlocksContactInformation extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_informations';
  info: {
    description: '';
    displayName: 'Contact Information';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    schedulingLink: Schema.Attribute.String;
    socialChannels: Schema.Attribute.Component<'blocks.social-channel', true>;
    workingHours: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksExperience extends Struct.ComponentSchema {
  collectionName: 'components_blocks_experiences';
  info: {
    description: '';
    displayName: 'Experience Entry';
  };
  attributes: {
    company: Schema.Attribute.String & Schema.Attribute.Required;
    companyLogo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    companyUrl: Schema.Attribute.String;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    duration: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    description: '';
    displayName: 'FAQ Entry';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksMiscellaneous extends Struct.ComponentSchema {
  collectionName: 'components_blocks_miscellaneous';
  info: {
    description: '';
    displayName: 'Miscellaneous';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    htmlLanguageTag: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'en'>;
    iconICO: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    iconPNG: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    iconSVG: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    localeString: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'en-US'>;
    openGraphImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    themeColor: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksService extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    description: '';
    displayName: 'Service Entry';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSocialChannel extends Struct.ComponentSchema {
  collectionName: 'components_blocks_social_channels';
  info: {
    description: '';
    displayName: 'Social Channel';
  };
  attributes: {
    channel: Schema.Attribute.Enumeration<['GitHub', 'LinkedIn', 'X']> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: '';
    displayName: 'Testimonial Entry';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String & Schema.Attribute.Required;
    companyWebsite: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    statement: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    profileImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_sections_call_to_actions';
  info: {
    displayName: 'Call-To-Action';
  };
  attributes: {
    button: Schema.Attribute.Component<'basic.button', false> &
      Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsExperience extends Struct.ComponentSchema {
  collectionName: 'components_sections_experiences';
  info: {
    description: '';
    displayName: 'Experience';
  };
  attributes: {
    experienceList: Schema.Attribute.Component<'blocks.experience', true> &
      Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs';
  info: {
    description: '';
    displayName: 'FAQ';
  };
  attributes: {
    faqList: Schema.Attribute.Component<'blocks.faq', true> &
      Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00A9 [Year] [Your Company Name]. All rights reserved.'>;
    headingColumn1: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Statement'>;
    headingColumn2: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Navigation'>;
    headingColumn3: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Links'>;
    linksColumn2: Schema.Attribute.Component<'basic.button', true> &
      Schema.Attribute.Required;
    linksColumn3: Schema.Attribute.Component<'basic.button', true> &
      Schema.Attribute.Required;
    statement: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsGlobal extends Struct.ComponentSchema {
  collectionName: 'components_sections_globals';
  info: {
    description: '';
    displayName: 'Global';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    facebookMessenger: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    resume: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    socialChannels: Schema.Attribute.Component<'blocks.social-channel', true>;
  };
}

export interface SectionsHeader extends Struct.ComponentSchema {
  collectionName: 'components_sections_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    additionalNavigationItems: Schema.Attribute.Component<'basic.button', true>;
    cta: Schema.Attribute.Component<'basic.button', false> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    logomark: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    greeting: Schema.Attribute.String;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    primaryButton: Schema.Attribute.Component<'basic.button', false>;
    secondaryButton: Schema.Attribute.Component<'basic.button', false>;
    supportiveText: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsPortfolio extends Struct.ComponentSchema {
  collectionName: 'components_sections_portfolios';
  info: {
    description: '';
    displayName: 'Featured Projects';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPosts extends Struct.ComponentSchema {
  collectionName: 'components_sections_posts';
  info: {
    description: '';
    displayName: 'Latest Posts';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_services';
  info: {
    description: '';
    displayName: 'Services';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    serviceList: Schema.Attribute.Component<'blocks.service', true> &
      Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSkills extends Struct.ComponentSchema {
  collectionName: 'components_sections_skills';
  info: {
    description: '';
    displayName: 'Skills';
  };
  attributes: {
    ariaLabelCSR: Schema.Attribute.Text & Schema.Attribute.Required;
    ariaLabelSSR: Schema.Attribute.Text & Schema.Attribute.Required;
    chartData: Schema.Attribute.JSON & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    description: '';
    displayName: 'Testimonials';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    testimonialList: Schema.Attribute.Component<'blocks.testimonial', true> &
      Schema.Attribute.Required;
  };
}

export interface SeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_seo_metadata';
  info: {
    description: '';
    displayName: 'Metadata';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    openGraphImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.button': BasicButton;
      'blocks.announcement': BlocksAnnouncement;
      'blocks.contact-information': BlocksContactInformation;
      'blocks.experience': BlocksExperience;
      'blocks.faq': BlocksFaq;
      'blocks.miscellaneous': BlocksMiscellaneous;
      'blocks.service': BlocksService;
      'blocks.social-channel': BlocksSocialChannel;
      'blocks.testimonial': BlocksTestimonial;
      'sections.about': SectionsAbout;
      'sections.banner': SectionsBanner;
      'sections.call-to-action': SectionsCallToAction;
      'sections.experience': SectionsExperience;
      'sections.faq': SectionsFaq;
      'sections.footer': SectionsFooter;
      'sections.global': SectionsGlobal;
      'sections.header': SectionsHeader;
      'sections.hero': SectionsHero;
      'sections.portfolio': SectionsPortfolio;
      'sections.posts': SectionsPosts;
      'sections.services': SectionsServices;
      'sections.skills': SectionsSkills;
      'sections.testimonials': SectionsTestimonials;
      'seo.metadata': SeoMetadata;
    }
  }
}
