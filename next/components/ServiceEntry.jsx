export default function ServiceEntry({ title, description, className = '' }) {
  return (
    <article className={`bg-white border border-neutral-200 rounded-2xl p-4 ${className}`}>
      <h3 className="text-gray-900 font-medium text-xl sm:text-2xl tracking-tight mb-2">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
