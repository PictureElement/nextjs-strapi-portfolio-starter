"use client";

export default function TestimonialEntry({ statement, author, role, company, companyWebsite }) {
  return (
    <figure className="text-center">
      <blockquote className="mb-4">
        <p className="text-gray-700 font-light text-base sm:text-xl">{statement}</p>
      </blockquote>
      <figcaption className="text-sm text-gray-900">— <span className="font-semibold">{author}</span>, {role}, <a className="underline hover:no-underline" target="_blank" rel="noopener noreferrer" href={companyWebsite}>{company}</a></figcaption>
    </figure>
  );
}
