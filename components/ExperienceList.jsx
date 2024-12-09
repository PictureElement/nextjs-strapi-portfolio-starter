import ExperienceEntry from "./ExperienceEntry";

export default function ExperienceList({ experienceList }) {
  console.log("Hello from ExperienceList");

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return (
    <ol className="relative border-s border-neutral-300 ml-6">
      {experienceList.map((entry, index) => {
        const imageUrl = entry.companyLogo.url.startsWith('https')
          ? entry.companyLogo.url
          : `${baseUrl}${entry.companyLogo.url}`;

        return (
          <ExperienceEntry
            key={index}
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