import SectionHeader from "./SectionHeader";
import FaqList from "./FaqList";
import { fetchData } from "@/lib/utils";

export default async function Faq() {
  console.log("Hello from Faq");

  const endpoint = "/api/homepage?populate[faq][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackFaq = {
    headline: 'FAQ',
    supportiveText: 'Supportive Text',
    faqList: [
      {
        id: 1,
        question: 'Question',
        answer: 'Answer'
      }
    ]
  };

  const faq = data?.faq || fallbackFaq;

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader headline={faq.headline} supportiveText={faq.supportiveText} />
        <FaqList faqList={faq.faqList} />
      </div>
    </section>
  )
}
