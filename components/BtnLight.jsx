import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function BtnLight({
  label = 'Default label',
  url = '#',
  className = '',
  ...rest
}) {
  return (
    <a
      href="{url}"
      className={`
        group
        inline-flex
        items-center
        transition
        px-4
        h-11
        font-semibold
        leading-none
        rounded-full
        text-primary-700
        border border-white
        hover:border-neutral-100
        active:border-neutral-200
        bg-white
        hover:bg-neutral-100
        active:bg-neutral-200
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
        ${className}
      `}
      {...rest}
    >
      {label}
      <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
    </a>
  );
}