'use client';

import ServiceEntry from "./ServiceEntry";
import { useState } from 'react';
import BtnToggle from "./BtnToggle";

export default function ServiceGrid({ services, defaultOpen = false }) {

  console.log("Hello from ServiceGrid");

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleServices = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div id="serviceGrid" className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transiton-[max-height] ${isOpen ? 'relative z-10 max-h-full' : 'max-h-[32rem] sm:max-h-[20rem] overflow-hidden'}`}>
        {services.map((service) => (
          <ServiceEntry
            key={service.id}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
      <div className={`inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-neutral-50 ${isOpen ? 'static pt-12' : 'absolute pt-64'}`}>
        <BtnToggle isOpen={isOpen} onToggle={toggleServices} openLabel="Show fewer services" closedLabel="Show all services" aria-controls="serviceGrid" />
      </div>
    </div>
  );
}
