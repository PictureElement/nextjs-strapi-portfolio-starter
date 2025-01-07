import SectionHeader from "./SectionHeader";
import FaqList from "./FaqList";
import { fetchFaq } from "@/lib/api";

export default async function Faq() {
  let data;

  try {
    data = await fetchFaq();
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

  // Destructure the necessary properties
  const { headline, supportiveText, faqList } = data;

  return (
    <section className="bg-white py-24 relative">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <FaqList faqList={faqList} />
      </div>
    </section>
  )
}
