export default function SectionHeader({ headline, supportiveText }) {
  console.log("Hello from SectionHeader");
  return (
    <div className="mb-12">
      <h2 className="text-primary-700 text-lg sm:text-xl tracking-widest text-center font-light mb-4">{headline}</h2>
      <p className="text-gray-900 text-3xl sm:text-4xl tracking-tight text-center font-extrabold">{supportiveText}</p>
    </div>
  );
}
