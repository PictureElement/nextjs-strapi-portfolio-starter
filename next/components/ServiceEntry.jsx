export default function ServiceEntry({ title, description, className = '' }) {
  return (
    <article className={`bg-neutral-50 border border-neutral-200 rounded-2xl p-4 ${className}`}>
      <h3 className="text-gray-900 font-normal text-xl sm:text-2xl tracking-tight mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </article>
  );
}
