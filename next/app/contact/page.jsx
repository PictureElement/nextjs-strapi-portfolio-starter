import Banner from "@/components/Banner";
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchStaticPageMetadata, fetchContact } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('contact-page');
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Contact | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page() {
  let data;

  try {
    data = await fetchContact();
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Contact page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { headline, supportiveText, contactFormHeading, otherContactOptionsHeading, email, schedulingLink, workingHours, phone } = data;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={headline} supportiveText={supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <article className="border border-neutral-200 bg-neutral-50 p-8 sm:p-12 rounded-2xl mb-8 sm:mb-12">
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{contactFormHeading}</h2>
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
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{otherContactOptionsHeading}</h2>
          <div className="grid grid-cols-1 gap-6">
            <ContactOption title="Email us" label={email} href={`mailto:${email.trim()}`} />
            {phone &&
              <ContactOption title="Call us" label={phone} href={`tel:${phone.replace(/\s+/g, '')}`} />
            }
            {schedulingLink &&
              <ContactOption title="Schedule a call" label={schedulingLink} href={schedulingLink} rel="noopener noreferer" target="_blank" />
            }
            <div className="text-center py-8 sm:py-12">
              <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Working Hours</h3>
              <p className="text-gray-700 font-light text-xl md:text-2xl tracking-tight">{workingHours}</p>
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
