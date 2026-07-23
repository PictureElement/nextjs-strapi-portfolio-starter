import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function ServiceEntry({ title, description, className = "" }) {
  return (
    <article className={`bg-white border border-neutral-200 rounded-2xl p-4 ${className}`}>
      <h3 className="text-gray-900 font-normal text-xl sm:text-2xl tracking-tight mb-2">{title}</h3>
      <p
        className="prose prose-gray prose-modifier !max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parseInline(description)),
        }}
      />
    </article>
  );
}
