export default function SectionHeader({ headline, supportiveText }) {
  return (
    <div className="mb-12">
      <h2 className="text-primary-700 font-light text-lg sm:text-xl tracking-widest text-center mb-4">{headline}</h2>
      <p className="text-gray-900 font-medium text-3xl sm:text-4xl tracking-tight text-center">{supportiveText}</p>
    </div>
  );
}
