'use client';

import ProjectEntry from "./ProjectEntry";
import useEmblaCarousel from 'embla-carousel-react';

export default function ProjectCarousel({ projects, baseUrl }) {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });

  return (
    <div ref={emblaRef}>
      <div className="flex gap-6">
        {projects.map((entry) => {
          const imageUrl = new URL(entry.featuredImage.url, baseUrl).href;
          return (
            <div key={entry.id} className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-lg">
              <ProjectEntry
                featuredImageUrl={imageUrl}
                featuredImageAlternativeText={entry.featuredImage.alternativeText}
                title={entry.title}
                excerpt={entry.excerpt}
                slug={entry.slug}
                priority={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
