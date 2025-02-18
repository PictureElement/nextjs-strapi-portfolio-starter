'use client';

import { useState } from 'react';
import BtnToggle from "./BtnToggle";
import ServiceEntry from './ServiceEntry';

export default function ServiceList({ serviceList, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleServices = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div id="serviceList" className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transiton-[max-height] ${isOpen ? 'relative z-10 max-h-full' : 'max-h-[32rem] sm:max-h-[20rem] overflow-hidden'}`}>
        {serviceList.map((entry) => (
          <ServiceEntry
            key={entry.id}
            title={entry.title}
            description={entry.description}
          />
        ))}
      </div>
      <div className={`inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white ${isOpen ? 'static pt-12' : 'absolute pt-64'}`}>
        <BtnToggle isOpen={isOpen} onToggle={toggleServices} openLabel="Show fewer services" closedLabel="Show all services" aria-controls="serviceList" />
      </div>
    </div>
  );
}
