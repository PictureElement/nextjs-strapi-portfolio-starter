import React, { useCallback, useEffect, useState } from 'react';

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
      className="inline-block rounded-full border p-2 border-primary-100 text-primary-100 
       hover:bg-primary-100 hover:text-white 
       focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
       active:bg-primary-200 active:text-white 
       disabled:bg-transparent disabled:text-primary-100 disabled:opacity-25 
       disabled:hover:bg-transparent disabled:hover:text-primary-100 
       disabled:cursor-not-allowed disabled:pointer-events-none"
      type="button"
      {...restProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="inline-block rounded-full border p-2 border-primary-100 text-primary-100 transition ease-out duration-200
             hover:bg-primary-100 hover:text-white 
             focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
             active:bg-primary-200 active:text-white 
             disabled:bg-transparent disabled:text-primary-100 disabled:opacity-25
             disabled:hover:bg-transparent disabled:hover:text-primary-100 
             disabled:cursor-not-allowed disabled:pointer-events-none"
      type="button"
      {...restProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
      {children}
    </button>
  );
}
