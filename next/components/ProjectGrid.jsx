import ProjectEntry from "./ProjectEntry";

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((entry, index) => {
        const imageUrl = new URL(entry.featuredImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
        return (
          <ProjectEntry
            key={entry.id}
            featuredImageUrl={imageUrl}
            featuredImageAlternativeText={entry.featuredImage.alternativeText}
            title={entry.title}
            excerpt={entry.excerpt}
            slug={entry.slug}
            priority={index < 4} // Prioritize the first 4 project images
          />
        );
      })}
    </div>
  );
}
