'use client';

import Image from 'next/image';
import { Collapse } from 'react-collapse';
import { useState } from 'react';
import BtnToggle from './BtnToggle';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function ExperienceEntry({ companyLogoUrl, companyLogoAlternativeText, duration, role, company, companyUrl, location, content, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li className="mb-14 ms-10">
      <span className="absolute flex items-center justify-center w-12 h-12 bg-neutral-50 rounded-full -start-6 ring-8 ring-white">
        {companyUrl ? (
          <a className="underline hover:no-underline hover:scale-105 transition" aria-label={`Visit ${company} website`} target="_blank" rel="noopener noreferrer" href={companyUrl}>
            <Image
              draggable="false"
              className='rounded-full border border-neutral-200'
              src={companyLogoUrl}
              width={92}
              height={92}
              alt={companyLogoAlternativeText ?? ''}
              sizes="46px"
            />
          </a>
        ) : (
          <Image
            draggable="false"
            className='rounded-full border border-neutral-200'
            src={companyLogoUrl}
            width={92}
            height={92}
            alt={companyLogoAlternativeText ?? ''}
            sizes="46px"
          />
        )}
      </span>
      <h3 className="text-gray-900 font-normal text-xl sm:text-2xl">{role}</h3>
      <p className="text-gray-900 mb-1">{company}</p>
      <p className="mb-1"><time className="">{duration}</time></p>
      <p className='mb-6'>{location}</p>
      <BtnToggle isOpen={isOpen} onToggle={toggleContent} />
      <Collapse isOpened={isOpen}>
        <div className="pt-6">
          <div
            className="text-gray-700 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl prose prose-gray prose-modifier"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(content)) }}
          />
        </div>
      </Collapse>
    </li >
  );
}