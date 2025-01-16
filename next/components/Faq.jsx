import SectionHeader from "./SectionHeader";
import FaqList from "./FaqList";

export default function Faq({ data }) {
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
