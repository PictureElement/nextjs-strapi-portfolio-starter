import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="
        flex justify-center items-center
        w-12 h-12
        rounded-full border border-primary-100 text-primary-100
        transition ease-out duration-200
       hover:bg-primary-100 hover:text-white 
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
       active:bg-primary-200 active:text-white 
        disabled:bg-transparent disabled:text-primary-100 disabled:opacity-25 
        disabled:hover:bg-transparent disabled:hover:text-primary-100 
        disabled:cursor-not-allowed disabled:pointer-events-none"
      type="button"
      {...restProps}
    >
      <ArrowLeftIcon className="size-6" />
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="
        flex justify-center items-center
        w-12 h-12
        rounded-full border border-primary-100 text-primary-100
        transition ease-out duration-200
       hover:bg-primary-100 hover:text-white 
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
       active:bg-primary-200 active:text-white 
        disabled:bg-transparent disabled:text-primary-100 disabled:opacity-25 
        disabled:hover:bg-transparent disabled:hover:text-primary-100 
        disabled:cursor-not-allowed disabled:pointer-events-none"
      type="button"
      {...restProps}
    >
      <ArrowRightIcon className="size-6" />
      {children}
    </button>
  );
}
