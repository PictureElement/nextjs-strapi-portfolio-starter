'use client';

export default function ServiceEntry({ title, description }) {
  return (
    <article className="bg-white border border-neutral-200 rounded-lg p-4">
      <h3 className="text-neutral-900 font-medium text-xl sm:text-2xl mb-2">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
