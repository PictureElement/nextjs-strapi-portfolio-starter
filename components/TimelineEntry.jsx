'use client';

import Image from 'next/image';
import { Collapse } from 'react-collapse';
import { useState } from 'react';
import BtnToggle from './BtnToggle';

export default function TimelineEntry({ companyLogo, duration, role, company, companyUrl, location, description, defaultOpen = false }) {

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li className="mb-14 ms-10">
      <span className="absolute flex items-center justify-center w-12 h-12 bg-neutral-50 rounded-full -start-6 ring-8 ring-white">
        <a className="underline hover:no-underline hover:scale-105 transition" aria-label={`Visit ${company} website`} target="_blank" rel="noopener noreferrer" href={companyUrl}>
          <Image
            className='rounded-full'
            src={companyLogo}
            width={48}
            height={48}
            alt="..."
          />
        </a>
      </span>
      <h3 className="text-neutral-900 font-semibold text-xl">{role}</h3>
      <p className="text-neutral-900 mb-1">{company}</p>
      <p className="mb-1"><time className="">{duration}</time></p>
      <p className='mb-6'>{location}</p>
      <BtnToggle isOpen={isOpen} onToggle={toggleDescription} />
      <Collapse isOpened={isOpen}>
        <div className="pt-6">
          <div
            className="text-neutral-700 timeline-entry-description p-6 bg-neutral-50 border border-neutral-100 rounded-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Collapse>
    </li >
  );
}