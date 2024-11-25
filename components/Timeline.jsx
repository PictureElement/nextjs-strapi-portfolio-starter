import TimelineEntry from "./TimelineEntry";

export default function Timeline({ timeline }) {
  console.log("Hello from Timeline");

  const baseUrl = process.env.STRAPI_API_URL;

  return (
    <ol className="relative border-s border-neutral-300 ml-6">
      {timeline.map((entry, index) => {
        const imageUrl = entry.companyLogo.url.startsWith('https')
          ? entry.companyLogo.url
          : `${baseUrl}${entry.companyLogo.url}`;

        return (
          <TimelineEntry
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