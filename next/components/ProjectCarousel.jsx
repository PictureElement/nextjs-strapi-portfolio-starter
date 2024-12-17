"use client";

import ProjectEntry from "./ProjectEntry";
import useEmblaCarousel from 'embla-carousel-react';

export default function ProjectCarousel({ projects }) {
  console.log("Hello from ProjectCarousel");
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI;

  return (
    <div ref={emblaRef}>
      <div className="flex gap-6">
        {projects.map((entry) => {
          const imageUrl = `${baseUrl}${entry.featuredImage.url}`;
          return (
            <div key={entry.id} className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]">
              <ProjectEntry
                featuredImageUrl={imageUrl}
                featuredImageAlternativeText={entry.featuredImage.alternativeText}
                title={entry.title}
                excerpt={entry.excerpt}
                slug={entry.slug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
