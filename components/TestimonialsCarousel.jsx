"use client";

import TestimonialEntry from "./TestimonialEntry";
import { DotButton, useDotButton } from './CarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react';

const testimonial1 = {
  statement: '“Having worked with Marios for almost a year as a fellow WordPress developer, I must say he instills positive energy in the team and is a true professional. What makes him stand out is his willingness to help others. I am impressed by his work ethic, communication skills and the fact that he easily adjusts to any given situation and can perform under pressure. I am glad to have worked with him!”',
  author: 'Pavlina Kyriacou',
  role: 'WordPress developer',
  company: 'IronFX',
  companyWebsite: 'https://www.ironfx.com/en/'
}

const testimonial2 = {
  statement: '“Having worked with Marios for almost a year as a fellow WordPress developer, I must say he instills positive energy in the team and is a true professional. What makes him stand out is his willingness to help others. I am impressed by his work ethic, communication skills and the fact that he easily adjusts to any given situation and can perform under pressure. I am glad to have worked with him!”',
  author: 'Pavlina Kyriacou',
  role: 'WordPress developer',
  company: 'IronFX',
  companyWebsite: 'https://www.ironfx.com/en/'
}

const testimonial3 = {
  statement: '“Having worked with Marios for almost a year as a fellow WordPress developer, I must say he instills positive energy in the team and is a true professional. What makes him stand out is his willingness to help others. I am impressed by his work ethic, communication skills and the fact that he easily adjusts to any given situation and can perform under pressure. I am glad to have worked with him!”',
  author: 'Pavlina Kyriacou',
  role: 'WordPress developer',
  company: 'IronFX',
  companyWebsite: 'https://www.ironfx.com/en/'
}

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <figure className="flex justify-center mb-6">
        <svg width="48px" height="48px" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
          <path d="m3 1.3c-1 0.4-1.8 1.4-1.8 2.3 0 0.2 0 0.4 0.1 0.5 0.2-0.2 0.5-0.3 0.9-0.3 0.8 0 1.5 0.6 1.5 1.5s-0.7 1.5-1.5 1.5c-0.8 0.1-1.2-0.2-1.5-0.7s-0.4-1.2-0.4-1.6c0-1.6 0.8-2.9 2.5-3.7l0.2 0.5zm4.1 0c-1 0.4-1.8 1.4-1.8 2.3 0 0.2 0 0.4 0.1 0.5 0.2-0.2 0.5-0.3 0.9-0.3 0.8 0 1.5 0.6 1.5 1.5s-0.7 1.5-1.5 1.5c-0.7 0-1.1-0.3-1.4-0.8-0.5-0.4-0.5-1.1-0.5-1.5 0-1.6 0.8-2.9 2.5-3.7l0.2 0.5z" fill="#0260A8"></path>
        </svg>
      </figure>
      <div className="overflow-hidden mb-6 md:mb-12 " ref={emblaRef}>
        <div className="flex gap-4">
          <div className="min-w-0 grow-0 shrink-0 basis-full"><TestimonialEntry {...testimonial1} /></div>
          <div className="min-w-0 grow-0 shrink-0 basis-full"><TestimonialEntry {...testimonial2} /></div>
          <div className="min-w-0 grow-0 shrink-0 basis-full"><TestimonialEntry {...testimonial3} /></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="flex gap-3 self-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              aria-label={`Go to slide ${index + 1}`}
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'inline-block rounded-full border p-2 border-primary-700'.concat(
                index === selectedIndex ? ' bg-primary-700' : ''
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
