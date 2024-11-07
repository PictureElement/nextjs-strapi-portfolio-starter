import TimelineEntry from "./TimelineEntry";

export default function Timeline() {
  const timelineData = [
    {
      companyLogo: 'https://msof.me/storage/app/media/msof-logo.svg',
      duration: 'May 2021 - Dec 2021',
      role: 'Web developer',
      company: 'IronFX',
      companyUrl: 'https://www.msof.me/',
      location: 'Remote',
      description: '<ul><li>Developed demo business websites using October CMS as the core platform.</li><li>Developed a personal portfolio website to showcase my skills and achievements.</li><li>Published themes and plugins on the October CMS Marketplace.</li><li>Invested in my professional growth by improving my knowledge of vanilla JavaScript, React, and Firebase.</li></ul>'
    },
    {
      companyLogo: 'https://msof.me/storage/app/media/msof-logo.svg',
      duration: 'May 2021 - Dec 2021',
      role: 'Web developer',
      company: 'Freelance',
      companyUrl: 'https://www.msof.me/',
      location: 'Paphos',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
    },
    {
      companyLogo: 'https://msof.me/storage/app/media/msof-logo.svg',
      duration: 'May 2021 - Dec 2021',
      role: 'Web developer',
      company: 'Freelance',
      companyUrl: 'https://www.msof.me/',
      location: 'Paphos',
      description: '<ul><li><strong>Developed Custom WordPress Plugins and Widgets:</strong> Created and optimized multiple WordPress plugins and Elementor widgets using PHP and React, enhancing functionality and user experience.</li><li><strong>Innovation in Development Workflows:</strong> Introduced streamlined development workflows leveraging @wordpress/env and @wordpress/scripts, significantly boosting productivity and aligning with best practices.</li><li><strong>Modular Architecture Implementation:</strong> Innovated plugin architecture by introducing modular and scalable components, enhancing maintainability and usability.</li><li><strong>Rapid Adaptation Across Projects:</strong> Demonstrated adaptability by efficiently customizing plugins for different websites, showcasing versatility and foresight in design.</li><li><strong>Efficiency Optimization:</strong> Developed plugins that reduced setup time from days to hours, optimizing workflow and increasing project efficiency.</li><li><strong>Comprehensive Documentation:</strong> Prioritized extensive documentation for all plugins, ensuring ease of use, smooth onboarding, and effective knowledge transfer.</li><li><strong>Technical Leadership:</strong> Facilitated effective communication between developers and designers, initiated discussions for design consistency, and promoted collaborative problem-solving.</li><li><strong>Proactive Problem-Solving:</strong> Demonstrated autonomous problem-solving skills by navigating complex APIs and integrating new payment methods, ensuring project success despite limited documentation.</li><li><strong>User Experience Enhancement:</strong> Addressed RTL mode challenges, improved bi-directional support, and ensured thorough QA processes for diverse user needs.</li><li><strong>Cross-Department Collaboration:</strong> Provided technical guidance and support across departments, fostering a collaborative and productive work environment.</li><li><strong>Commitment to Best Practices:</strong> Advocated for sustainable development practices and set a high standard for code quality and maintainability.</li></ul>'
    },
  ];

  return (
    <ol className="relative border-s border-primary-200 ml-6">
      {timelineData.map((entry, index) => (
        <TimelineEntry
          key={index}
          companyLogo={entry.companyLogo}
          duration={entry.duration}
          role={entry.role}
          company={entry.company}
          companyUrl={entry.companyUrl}
          location={entry.location}
          description={entry.description}
          defaultOpen={index === 0 ? true : false}
        />
      ))}
    </ol>
  );
}