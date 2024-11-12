import BtnLight from "./BtnLight";

export default function CallToAction({ heading, text }) {
  return (
    <section className="bg-primary-700">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="text-balance text-5xl font-bold tracking-wide text-white sm:text-6xl">{heading}</h2>
        <p className="mt-6 text-neutral-200 font-light text-base sm:text-xl">{text}</p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <BtnLight label="Contact me today" url="#" />
        </div>
      </div>
    </section>
  );
}