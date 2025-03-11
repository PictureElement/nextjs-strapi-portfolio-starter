'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { formSchema } from '@/lib/schemas';
import { onSubmitAction } from '@/lib/actions';

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);

  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      consent: false,
    }
  });

  const sanitizeInput = (data) => ({
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    consent: data.consent,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Disable button
    setHasServerError(false); // Reset server error

    // Stop submission if honeypot is filled. Don't provide feedback to the user.
    if (data.name) {
      reset(); // Reset form
      setIsSubmitting(false); // Enable button
      return;
    }

    try {
      const sanitizedData = sanitizeInput(data);
      await onSubmitAction(sanitizedData); // Call server action

      reset(); // Reset form after successful submission
      setIsSubmitted(true); // Show success message
      setTimeout(() => setIsSubmitted(false), 10000); // Hide success message after a few seconds
    } catch (error) {
      console.error("Error submitting form: ", error);
      setHasServerError(true);

      // Focus on the first field with an error
      if (errors.email) {
        setFocus("email");
      } else if (errors.message) {
        setFocus("message");
      } else if (errors.consent) {
        setFocus("consent");
      }
    } finally {
      setIsSubmitting(false); // Enable button
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 sm:gap-6">
        <div style={{ display: 'none' }}>
          <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
            <input
              {...register("name")}
              type="hidden"
              placeholder="Your name"
              className="rounded-lg outline-none peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent sm:text-xl"
              tabIndex={-1}
              autoComplete="off"
            />
            <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text- transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-base peer-focus:text-primary-700">
              Your name
            </span>
          </label>
        </div>
        <div>
          <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
            <input
              aria-describedby="email-error"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register("email")}
              type="email"
              placeholder="Your email"
              className="block rounded-lg outline-none peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent sm:text-xl"
            />
            <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text- transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-base peer-focus:text-primary-700">
              Your email
            </span>
          </label>
          <div id="email-error" className={`text-red-500 text-sm mt-1 ${errors.email ? "" : "sr-only"}`}>{errors.email?.message}</div>
        </div>
        <div>
          <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
            <textarea
              aria-describedby="message-error"
              aria-invalid={errors.message ? 'true' : 'false'}
              {...register("message")}
              rows="5"
              placeholder="Your message"
              className="block rounded-lg peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent focus:border-transparent focus:outline-none text-xl"
            ></textarea>
            <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-base transition-all peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:text-primary-700">
              Your message
            </span>
          </label>
          <div id="message-error" className={`text-red-500 text-sm mt-1 ${errors.message ? "" : "sr-only"}`}>{errors.message?.message}</div>
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3 transition">
            <div className="relative flex items-center mt-[1px]">
              <input
                name="consent"
                aria-describedby="consent-error"
                aria-invalid={errors.consent ? 'true' : 'false'}
                {...register("consent")}
                type="checkbox"
                className="peer size-5 rounded border border-neutral-400 appearance-none checked:bg-primary-700 checked:border-0"
              />
              <CheckIcon className="absolute hidden fill-white peer-checked:block" />
            </div>
            <div className="text-pretty font-light text-gray-700">
              I have read the <Link href="/privacy-policy" target="_blank" className="font-medium border-b border-primary-700 hover:border-b-2">privacy policy</Link> and consent to having my submitted information collected and processed to respond to my inquiry.
            </div>
          </label>
          <div id="consent-error" className={`text-red-500 text-sm mt-1 ${errors.consent ? "" : "sr-only"}`}>{errors.consent?.message}</div>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`
            group
            inline-flex
            justify-center
            items-center
            transition
            px-4
            h-11
            font-medium
            leading-none
            rounded-lg
            text-white
            border border-primary-700
            hover:border-primary-600
            active:border-primary-500
            bg-primary-700
            hover:bg-primary-600
            active:bg-primary-500
            ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}
          `}
          aria-label="Submit your message"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Submit message
              <PaperAirplaneIcon className="h-[1em] w-[1em] ms-1 group-hover:translate-x-0.5 transition" />
            </>
          )}
        </button>
      </form >
      {hasServerError && <div className="text-red-500 text-sm mt-1">An error occurred while submitting the form. Please try again later.</div>}
      {isSubmitted && <div className="text-green-500 text-sm mt-1">Your message has been submitted successfully!</div>}
    </>
  )
}
