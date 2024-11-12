'use client'

export default function SectionHeader({ heading, lead }) {
  return (
    <div className="mb-12">
      <h2 className="text-primary-700 text-lg sm:text-xl tracking-widest text-center font-light mb-4">{heading}</h2>
      <p className="text-neutral-900 text-3xl sm:text-4xl tracking-tight text-center font-extrabold">{lead}</p>
    </div>
  );
}
