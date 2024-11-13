import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function BtnPrimary({
  label = 'Default label',
  url = '#',
  className = '',
  ...rest
}) {
  return (
    <a
      href={url}
      className={`
        group
        inline-flex
        justify-center
        items-center
        transition
        px-4
        h-11
        font-semibold
        leading-none
        rounded-full
        text-white
        border border-primary-700
        hover:border-primary-600
        active:border-primary-500
        bg-primary-700
        hover:bg-primary-600
        active:bg-primary-500
        ${className}
      `}
      {...rest}
    >
      {label}
      <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
    </a>
  );
}