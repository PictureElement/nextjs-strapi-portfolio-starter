import Banner from "@/components/Banner";
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/16/solid';

export default async function Page() {
  return (
    <main className="overflow-hidden relative">
      <Banner headline="Contact" supportiveText="If you're interested in exploring the digital possibilities that X Studio has to offer, feel free to contact us today." />
      <section className="mx-auto max-w-4xl px-4 py-24">
        <div className="border border-neutral-100 bg-neutral-50 p-6 sm:p-14 rounded-2xl">
          <h2 className="text-gray-900 text-3xl sm:text-4xl tracking-tight font-extrabold mb-6 sm:mb-10 text-center">Let's Build Something Great Together.</h2>
          <form className="flex flex-col gap-6 sm:gap-6">
            <label className="relative block border border-neutral-300 bg-transparent focus-within:border-primary-700 rounded-lg">
              <input
                type="email"
                placeholder="Business Email"
                className="block peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-xl"
              />
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-0  peer-focus:text-sm peer-focus:text-primary-700">
                Business Email
              </span>
            </label>
            <label className="relative block border border-neutral-300 bg-transparent focus-within:border-primary-700 rounded-lg">
              <textarea
                rows="5"
                placeholder="Tell us about your project"
                className="block peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-xl"
              ></textarea>
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-sm transition-all peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-xl peer-focus:-translate-y-1/2  peer-focus:text-sm peer-focus:text-primary-700">
                Tell us about your project
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 transition">
              <div className="relative flex items-center mt-[1px]">
                <input type="checkbox" className="peer size-5 rounded border border-neutral-400 appearance-none checked:bg-primary-700 checked:border-0" />
                <CheckIcon className="absolute hidden fill-white peer-checked:block" />
              </div>
              <div className="text-pretty font-light text-gray-700">
                I consent to have this website collect my submitted information so they can respond to my inquiry. I have read and accept the <a className="font-semibold border-b border-primary-400 hover:border-b-2" target="_blank" href="">Privacy Policy</a>.
              </div>
            </label>
            <button
              type="submit"
              className="
                group
                inline-flex
                justify-center
                items-center
                transition
                px-4
                h-11
                font-semibold
                leading-none
                rounded-lg
                text-white
                border border-primary-700
                hover:border-primary-600
                active:border-primary-500
                bg-primary-700
                hover:bg-primary-600
                active:bg-primary-500
              "
            >
              Submit message
              <PaperAirplaneIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </button>
          </form>
        </div>
      </section>
    </main >
  );
}