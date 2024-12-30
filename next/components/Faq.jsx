import SectionHeader from "./SectionHeader";
import FaqList from "./FaqList";
import { fetchData } from "@/lib/utils";
import ShapeDivider from "./ShapeDivider";
import { faqDataSchema } from '@/lib/schemas';

export default async function Faq() {
  console.log("Hello from Faq");

  const endpoint = "/api/homepage?populate[faq][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = faqDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-neutral-50 py-24 relative">
        <ShapeDivider className="fill-white" />
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the Faq component</div>
        </div>
      </section>
    )
  }

  const { faq } = data.data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader headline={faq.headline} supportiveText={faq.supportiveText} />
        <FaqList faqList={faq.faqList} />
      </div>
    </section>
  )
}
