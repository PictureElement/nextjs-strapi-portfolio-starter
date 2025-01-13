'use client';

import TestimonialEntry from "./TestimonialEntry";
import { DotButton, useDotButton } from './CarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react';

export default function TestimonialList({ testimonialList }) {
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
        <svg className="fill-primary-700" width="48px" height="48px" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="m3 1.3c-1 0.4-1.8 1.4-1.8 2.3 0 0.2 0 0.4 0.1 0.5 0.2-0.2 0.5-0.3 0.9-0.3 0.8 0 1.5 0.6 1.5 1.5s-0.7 1.5-1.5 1.5c-0.8 0.1-1.2-0.2-1.5-0.7s-0.4-1.2-0.4-1.6c0-1.6 0.8-2.9 2.5-3.7l0.2 0.5zm4.1 0c-1 0.4-1.8 1.4-1.8 2.3 0 0.2 0 0.4 0.1 0.5 0.2-0.2 0.5-0.3 0.9-0.3 0.8 0 1.5 0.6 1.5 1.5s-0.7 1.5-1.5 1.5c-0.7 0-1.1-0.3-1.4-0.8-0.5-0.4-0.5-1.1-0.5-1.5 0-1.6 0.8-2.9 2.5-3.7l0.2 0.5z"></path>
        </svg>
      </figure>
      <div className="overflow-hidden mb-6 md:mb-12 " ref={emblaRef}>
        <div className="flex gap-4">
          {testimonialList.map((entry) => (
            <div key={entry.id} className="min-w-0 grow-0 shrink-0 basis-full">
              <TestimonialEntry
                statement={entry.statement}
                author={entry.author}
                role={entry.role}
                company={entry.company}
                companyWebsite={entry.companyWebsite}
                className="text-center"
              />
            </div>
          ))}
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
