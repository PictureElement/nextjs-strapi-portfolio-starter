import Banner from "@/components/Banner";
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchData } from "@/lib/utils";
import { contactData1Schema, contactData2Schema } from "@/lib/schemas";

export default async function Page() {
  // Get the banner, metadata, and headings
  const endpoint1 = "/api/contact-page?populate=*";
  const endpoint2 = "/api/global?populate[contactInformation]=*";

  let data1, data2;

  try {
    const [response1, response2] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
    ])

    const result1 = contactData1Schema.safeParse(response1);
    const result2 = contactData2Schema.safeParse(response2);

    if (!result1.success) {
      console.error("Validation failed for /api/contact-page:", result1.error);
      throw new Error("Invalid data received from /api/contact-page");
    }

    if (!result2.success) {
      console.error("Validation failed for /api/global:", result2.error);
      throw new Error("Invalid data received from /api/global");
    }

    data1 = result1.data;
    data2 = result2.data;
  } catch (error) {
    console.error("Error fetching or validating API responses:", error);

    // Return fallback UI in case of validation or fetch errors
    return (
      <div>
        <h1 className="text-red-600">Something went wrong</h1>
        <p>We were unable to load the data. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="overflow-hidden relative">
      <Banner headline={data1.banner.headline} supportiveText={data1.banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <article className="border border-neutral-100 bg-neutral-50 p-8 sm:p-12 rounded-2xl mb-8 sm:mb-12">
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{data1.contactFormHeading}</h2>
          <form className="flex flex-col gap-6 sm:gap-6">
            <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
              <input
                type="email"
                placeholder="Business Email"
                className="block rounded-lg outline-none peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent sm:text-xl"
              />
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-base peer-focus:text-primary-700">
                Business Email
              </span>
            </label>
            <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
              <textarea
                rows="5"
                placeholder="Tell us about your project"
                className="block rounded-lg peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent focus:border-transparent focus:outline-none text-xl"
              ></textarea>
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-base transition-all peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:text-primary-700">
                Tell us about your project
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 transition">
              <div className="relative flex items-center mt-[1px]">
                <input type="checkbox" className="peer size-5 rounded border border-neutral-400 appearance-none checked:bg-primary-700 checked:border-0" />
                <CheckIcon className="absolute hidden fill-white peer-checked:block" />
              </div>
              <div className="text-pretty font-light text-gray-700">
                I consent to have this website collect my submitted information so they can respond to my inquiry. I have read and accept the <Link href="/privacy-policy" target="_blank" className="font-medium border-b border-primary-700 hover:border-b-2">Privacy Policy</Link>.
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
              "
              aria-label="Submit your message"
            >
              Submit message
              <PaperAirplaneIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </button>
          </form>
        </article>
        <aside>
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{data1.otherContactOptionsHeading}</h2>
          <div className="grid grid-cols-1 gap-6">
            <ContactOption title="Email us" label={data2.contactInformation.email} href={`mailto:${data2.contactInformation.email.trim()}`} />
            {data2.contactInformation.phone &&
              <ContactOption title="Call us" label={data2.contactInformation.phone} href={`tel:${data2.contactInformation.phone.replace(/\s+/g, '')}`} />
            }
            {data2.contactInformation.schedulingLink &&
              <ContactOption title="Schedule a call" label={data2.contactInformation.schedulingLink} href={data2.contactInformation.schedulingLink} rel="noopener noreferer" target="_blank" />
            }
            <div className="text-center py-8 sm:py-12">
              <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Working Hours</h3>
              <p className="text-gray-700 font-light text-xl md:text-2xl tracking-tight">{data2.contactInformation.workingHours}</p>
            </div>
          </div>
        </aside>
      </section>
    </main >
  );
}

const ContactOption = ({ title, label, href, rel = undefined, target = undefined }) => (
  <div className="border border-neutral-200 rounded-xl text-center py-8 sm:py-12">
    <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">{title}</h3>
    <a rel={rel} target={target} className="text-gray-700 font-light text-xl md:text-2xl tracking-tight border-b border-primary-700 hover:border-b-2" href={href}>{label}</a>
  </div>
);
