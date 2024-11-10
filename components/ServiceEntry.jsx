'use client';

export default function ServiceEntry({ title, description }) {
  return (
    <article className="bg-white border border-slate-200 rounded-lg p-4">
      <h3 class="text-slate-900 font-semibold text-xl mb-2">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
