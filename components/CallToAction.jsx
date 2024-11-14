import BtnLight from "./BtnLight";

export default function CallToAction({ heading, text }) {
  return (
    <section className="bg-primary-700 bg-dot-white/20 relative">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{heading}</h1>
        <p className="text-white/75 text-lg mt-6">{text}</p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <BtnLight className="w-full sm:w-auto" label="Contact me today" url="#" />
        </div>
      </div>
    </section>
  );
}