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
        <a className="underline hover:no-underline hover:scale-105 transition" target="_blank" rel="noopener noreferrer" href="{companyUrl}">
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
      <p>{location}</p>
      <button
        onClick={toggleDescription}
        className="
          inline-flex
          transition
          px-4 py-3 my-4
          font-semibold
          leading-none
          rounded-full
          border border-slate-200
          text-primary-100
          bg-slate-50
          hover:bg-slate-100
          active:bg-slate-200
          focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
        "
      >
        {isOpen ? (
          <span className="flex items-center">
            Hide description
            <ArrowUpIcon className="size-4 ms-1" />
          </span>
        ) : (
          <span className="flex items-center">
            Show description
            <ArrowDownIcon className="size-4 ms-1" />
          </span>
        )
        }
      </button >
      <Collapse isOpened={isOpen}>
        <div
          className="text-slate-700 timeline-entry-description p-6 bg-slate-50 border border-slate-200 rounded-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Collapse>
    </li >
  );
}