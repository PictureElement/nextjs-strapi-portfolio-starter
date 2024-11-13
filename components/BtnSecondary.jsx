import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function BtnSecondary({
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
        transition
        px-4 py-3
        font-semibold
        leading-none
        rounded-full
        border border-primary-100
        text-primary-700
        bg-primary-50
        hover:bg-primary-100
        active:bg-primary-200
        ${className}
      `}
      {...rest}
    >
      {label}
      <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
    </a>
  );
}