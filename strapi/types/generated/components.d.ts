import type { Struct, Schema } from '@strapi/strapi';

export interface SeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_seo_metadata';
  info: {
    displayName: 'Metadata';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    openGraphImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonial Entry';
    description: '';
  };
  attributes: {
    statement: Schema.Attribute.Text & Schema.Attribute.Required;
    author: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String & Schema.Attribute.Required;
    companyWebsite: Schema.Attribute.String;
  };
}

export interface BlocksSocialChannel extends Struct.ComponentSchema {
  collectionName: 'components_blocks_social_channels';
  info: {
    displayName: 'Social Channel';
    description: '';
  };
  attributes: {
    channel: Schema.Attribute.Enumeration<['GitHub', 'LinkedIn', 'X']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksService extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Service Entry';
    description: '';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'FAQ Entry';
    description: '';
  };
  attributes: {
    question: Schema.Attribute.String & Schema.Attribute.Required;
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BlocksExperience extends Struct.ComponentSchema {
  collectionName: 'components_blocks_experiences';
  info: {
    displayName: 'Experience Entry';
    description: '';
  };
  attributes: {
    companyLogo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String & Schema.Attribute.Required;
    companyUrl: Schema.Attribute.String;
    duration: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BlocksAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_blocks_announcements';
  info: {
    displayName: 'Announcement';
    description: '';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonials';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    testimonialList: Schema.Attribute.Component<'blocks.testimonial', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsSkills extends Struct.ComponentSchema {
  collectionName: 'components_sections_skills';
  info: {
    displayName: 'Skills';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    chartData: Schema.Attribute.JSON & Schema.Attribute.Required;
    ariaLabelSSR: Schema.Attribute.Text & Schema.Attribute.Required;
    ariaLabelCSR: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_services';
  info: {
    displayName: 'Services';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    serviceList: Schema.Attribute.Component<'blocks.service', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsPosts extends Struct.ComponentSchema {
  collectionName: 'components_sections_posts';
  info: {
    displayName: 'Latest Posts';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPortfolio extends Struct.ComponentSchema {
  collectionName: 'components_sections_portfolios';
  info: {
    displayName: 'Featured Projects';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    greeting: Schema.Attribute.String;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.Text & Schema.Attribute.Required;
    primaryButton: Schema.Attribute.Component<'basic.button', false>;
    secondaryButton: Schema.Attribute.Component<'basic.button', false>;
  };
}

export interface SectionsHeader extends Struct.ComponentSchema {
  collectionName: 'components_sections_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    navItems: Schema.Attribute.Component<'basic.button', true> &
      Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'basic.button', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsGlobal extends Struct.ComponentSchema {
  collectionName: 'components_sections_globals';
  info: {
    displayName: 'Global';
    description: '';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    facebookMessenger: Schema.Attribute.String & Schema.Attribute.Required;
    resume: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    socialChannels: Schema.Attribute.Component<'blocks.social-channel', true>;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    statement: Schema.Attribute.Text & Schema.Attribute.Required;
    socialChannels: Schema.Attribute.Component<'blocks.social-channel', true>;
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
    headingColumn4: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Contact'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'+35799111844'>;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'marios.sofokleous@yandex.com'>;
    copyright: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00A9 2024 Marios Sofokleous. All rights reserved.'>;
    privacyPolicy: Schema.Attribute.Component<'basic.button', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'FAQ';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    faqList: Schema.Attribute.Component<'blocks.faq', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsExperience extends Struct.ComponentSchema {
  collectionName: 'components_sections_experiences';
  info: {
    displayName: 'Experience';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    experienceList: Schema.Attribute.Component<'blocks.experience', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_sections_call_to_actions';
  info: {
    displayName: 'Call-To-Action';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.Text & Schema.Attribute.Required;
    button: Schema.Attribute.Component<'basic.button', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'About';
    description: '';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    supportiveText: Schema.Attribute.String & Schema.Attribute.Required;
    profileImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BasicButton extends Struct.ComponentSchema {
  collectionName: 'components_basic_buttons';
  info: {
    displayName: 'Button';
    description: '';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    openLinkInNewTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    sameHostLink: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.metadata': SeoMetadata;
      'blocks.testimonial': BlocksTestimonial;
      'blocks.social-channel': BlocksSocialChannel;
      'blocks.service': BlocksService;
      'blocks.faq': BlocksFaq;
      'blocks.experience': BlocksExperience;
      'blocks.announcement': BlocksAnnouncement;
      'sections.testimonials': SectionsTestimonials;
      'sections.skills': SectionsSkills;
      'sections.services': SectionsServices;
      'sections.posts': SectionsPosts;
      'sections.portfolio': SectionsPortfolio;
      'sections.hero': SectionsHero;
      'sections.header': SectionsHeader;
      'sections.global': SectionsGlobal;
      'sections.footer': SectionsFooter;
      'sections.faq': SectionsFaq;
      'sections.experience': SectionsExperience;
      'sections.call-to-action': SectionsCallToAction;
      'sections.about': SectionsAbout;
      'basic.button': BasicButton;
    }
  }
}
