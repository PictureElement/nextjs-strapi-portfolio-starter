"use client";

import ProjectEntry from "./ProjectEntry";
import useEmblaCarousel from 'embla-carousel-react';

const testimonial1 = {
  statement: '“1Having worked with Marios for almost a year as a fellow WordPress developer, I must say he instills positive energy in the team and is a true professional. What makes him stand out is his willingness to help others. I am impressed by his work ethic, communication skills and the fact that he easily adjusts to any given situation and can perform under pressure. I am glad to have worked with him!”',
  author: 'Pavlina Kyriacou',
  role: 'WordPress Developer',
  company: 'IronFX',
  companyWebsite: 'https://www.ironfx.com/en/'
}

const project1 = {
  title: 'JobLister',
  excerpt: 'Free and open-source WordPress plugin that allows you to set up a job listing page on your website.',
  thumbnailUrl: 'https://msof.me/storage/app/resources/resize/img_92d971b1cb6f84154817e39d045986e5_346_231_0_0_auto.jpg'
}

export default function ProjectsCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });

  return (
    <div className="mb-10" ref={emblaRef}>
      <div className="flex gap-4">
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
