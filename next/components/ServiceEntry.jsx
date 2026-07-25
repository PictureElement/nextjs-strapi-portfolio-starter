import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function ServiceEntry({ title, description, tags = [], className = "" }) {
  return (
    <article className={`bg-white border border-neutral-200 rounded-2xl p-4 ${className}`}>
      <h3 className="text-gray-900 font-normal text-xl sm:text-2xl tracking-tight mb-2">{title}</h3>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs whitespace-nowrap text-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="prose prose-gray prose-modifier !max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(description)),
        }}
      />
    </article>
  );
}
