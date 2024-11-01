'use client';

import Image from 'next/image';
import { Collapse } from 'react-collapse';
import { useState } from 'react';

export default function TimelineEntry({ companyLogo, duration, role, company, companyUrl, location, description, defaultOpen = false }) {

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li className="mb-10 ms-10">
      <span className="absolute flex items-center justify-center w-12 h-12 bg-slate-50 rounded-full -start-6 ring-8 ring-white">
        <a className="underline hover:no-underline hover:scale-105 transition ease-out duration-200" target="_blank" rel="noopener noreferrer" href="{companyUrl}">
          <Image
            className='rounded-full shadow-lg'
            src={companyLogo}
            width={48}
            height={48}
            alt="..."
          />
        </a>
      </span>
      <h3 className="text-slate-900 font-semibold text-xl">{role}</h3>
      <p className="text-slate-900 mb-1">{company}</p>
      <p className="mb-1"><time className="">{duration}</time></p>
      <p className="mb-4">{location}</p>
      <button
        onClick={toggleDescription}
        className="text-primary-100 mb-2 hover:text-primary-300 transition ease-out duration-200"
      >
        {isOpen ? (
          <span className="flex items-center">
            <span className="mr-1">Hide Description</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5"><path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" /></svg>
          </span>
        ) : (
          <span className="flex items-center">
            <span className="mr-1">Show Description</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
          </span>
        )}
      </button>
      <Collapse isOpened={isOpen}>
        <div
          className="text-slate-700 timeline-entry-description border p-6 bg-slate-50 rounded-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Collapse>
    </li>
  );
}