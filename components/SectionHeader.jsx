'use client'

export default function SectionHeader({ heading, lead }) {
  return (
    <div className="mb-6 md:mb-12">
      <h2 className="text-primary-100 text-xl tracking-widest text-center font-light">{heading}</h2>
      <p className="text-slate-900 text-4xl text-center font-semibold">{lead}</p>
    </div>
  );
}
