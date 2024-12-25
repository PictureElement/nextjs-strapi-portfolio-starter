export default function TestimonialEntry({ statement, author, role, company, companyWebsite, className }) {
  console.log("Hello from TestimonialEntry");
  return (
    <figure className={className}>
      <blockquote className="mb-4">
        <p className="text-gray-700 font-light text-base sm:text-xl">{statement}</p>
      </blockquote>
      <figcaption className="text-sm leading-6 text-gray-900">— <span className="font-semibold">{author}</span>, {role}, <a className="font-semibold border-b border-primary-700 hover:border-b-2" target="_blank" rel="noopener noreferrer" href={companyWebsite}>{company}</a></figcaption>
    </figure >
  );
}
