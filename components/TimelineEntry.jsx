'use client';

import Image from 'next/image';
import { Collapse } from 'react-collapse';
import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid';

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
            Hide Description
            <ArrowUpIcon className="size-4 ms-2" />
          </span>
        ) : (
          <span className="flex items-center">
            Show Description
            <ArrowDownIcon className="size-4 ms-2" />
          </span>
        )}
      </button>
      <Collapse isOpened={isOpen}>
        <div
          className="text-slate-700 timeline-entry-description p-6 bg-slate-50 rounded-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Collapse>
    </li>
  );
}