export default function ShapeDivider() {
  console.log("Hello from ShapeDivider");
  return (
    <figure className="absolute -bottom-0.5 left-0 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1680 40" className="w-full">
        <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#fff"></path>
      </svg>
    </figure>
  );
}