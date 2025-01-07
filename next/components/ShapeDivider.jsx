export default function ShapeDivider({ className = "" }) {
  return (
    <figure className="absolute bottom-0 w-full">
      <svg
        className={`w-full h-4 sm:h-12 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 144.54 17.34"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
      </svg>
    </figure>
  );
}