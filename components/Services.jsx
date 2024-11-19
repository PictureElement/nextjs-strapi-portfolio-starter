'use client';

import { useState } from 'react';
import BtnToggle from "./BtnToggle";

export default function Services({ children, defaultOpen = false }) {
  console.log("Hello from Services");

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleServices = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div id="serviceGrid" className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transiton-[max-height] ${isOpen ? 'relative z-10 max-h-full' : 'max-h-[32rem] sm:max-h-[20rem] overflow-hidden'}`}>
        {children}
      </div>
      <div className={`inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-neutral-50 ${isOpen ? 'static pt-12' : 'absolute pt-64'}`}>
        <BtnToggle isOpen={isOpen} onToggle={toggleServices} openLabel="Show fewer services" closedLabel="Show all services" aria-controls="serviceGrid" />
      </div>
    </div>
  );
}
