import ProjectEntry from "./ProjectEntry";

export default function ProjectGrid({ projects }) {

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return (
    <div className="grid grid-cols-2 gap-6">
      {projects.map((entry) => {
        const imageUrl = `${baseUrl}${entry.featuredImage.url}`;

        return (
          <ProjectEntry
            key={entry.id}
            featuredImageUrl={imageUrl}
            featuredImageAlternativeText={entry.featuredImage.alternativeText}
            title={entry.title}
            excerpt={entry.excerpt}
            slug={entry.slug}
          />
        );
      })}
    </div>
  );
}
