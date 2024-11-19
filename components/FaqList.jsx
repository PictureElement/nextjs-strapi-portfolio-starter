import FaqEntry from "./FaqEntry";

const faq1 = {
  question: 'Headless UI v2.1: Simplified transition API and improved multi-dialog support',
  answer: 'We just released Headless UI v2.1 for React, which dramatically simplifies our transition APIs and adds support for rendering multiple dialogs as siblings.'
}

export default function FaqList() {
  console.log("Hello from FaqList");
  return (
    <div className="space-y-4">
      <FaqEntry {...faq1} />
      <FaqEntry {...faq1} />
      <FaqEntry {...faq1} />
      <FaqEntry {...faq1} />
    </div>
  );
}