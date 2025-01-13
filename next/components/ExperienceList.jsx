import ExperienceEntry from "./ExperienceEntry";

export default function ExperienceList({ experienceList }) {
  return (
    <ol className="relative border-s border-neutral-200 ml-6">
      {experienceList.map((entry, index) => {
        const imageUrl = new URL(entry.companyLogo.url, process.env.NEXT_PUBLIC_STRAPI).href;
        return (
          <ExperienceEntry
            key={entry.id}
            companyLogoUrl={imageUrl}
            companyLogoAlternativeText={entry.companyLogo.alternativeText}
            duration={entry.duration}
            role={entry.role}
            company={entry.company}
            companyUrl={entry.companyUrl}
            location={entry.location}
            content={entry.content}
            defaultOpen={index === 0 ? true : false}
          />
        );
      })}
    </ol>
  );
}