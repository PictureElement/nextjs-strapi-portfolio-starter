"use client";

import ProjectEntry from "./ProjectEntry";
import useEmblaCarousel from 'embla-carousel-react';

const project1 = {
  title: 'JobLister',
  excerpt: 'Free and open-source WordPress plugin that allows you to set up a job listing page on your website.',
  thumbnailUrl: 'https://msof.me/storage/app/resources/resize/img_92d971b1cb6f84154817e39d045986e5_346_231_0_0_auto.jpg'
}

export default function ProjectsCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });

  return (
    <div ref={emblaRef}>
      <div className="flex gap-6">
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
        <div className="min-w-0 grow-0 shrink-0 basis-10/12 max-w-[28rem]"><ProjectEntry {...project1} /></div>
      </div>
    </div>
  );
}
