import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function CallToAction({ heading, text }) {
  return (
    <section className="bg-primary-700">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="text-balance text-5xl font-bold tracking-wide text-white sm:text-6xl">{heading}</h2>
        <p className="mt-6 text-neutral-100 font-light text-base sm:text-xl">{text}</p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <a
            href="#"
            className="
              group
              inline-flex
              items-center
              transition
              px-4
              h-11
              font-semibold
              leading-none
              rounded-full
              text-primary-700
              border border-white
              hover:border-neutral-100
              active:border-neutral-200
              bg-white
              hover:bg-neutral-100
              active:bg-neutral-200
              focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
            "
          >
            Start your project
            <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
          </a>
        </div>
      </div>
    </section>
  );
}