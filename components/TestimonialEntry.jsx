"use client";

export default function TestimonialEntry({ statement, author, role, company, companyWebsite }) {
  return (
    <figure className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center">
      <blockquote className="mb-4">
        <p className="text-slate-700 font-light text-base sm:text-xl">{statement}</p>
      </blockquote>
      <figcaption className="text-sm">— <span className="font-semibold text-slate-900">{author}</span>, {role}, <a className="underline hover:no-underline" target="_blank" rel="noopener noreferrer" href={companyWebsite}>{company}</a></figcaption>
    </figure>
  );
}
