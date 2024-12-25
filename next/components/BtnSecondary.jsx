import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function BtnSecondary({
  label = 'Default label',
  url = '#',
  target = undefined,
  rel = undefined,
  className = '',
  ...rest
}) {
  console.log("Hello from BtnSecondary");
  return (
    <Link
      target={target}
      rel={rel}
      href={url}
      className={`
        group
        inline-flex
        justify-center
        transition
        px-4 py-3
        font-medium
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
      {rel === undefined ? (
        <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
      ) : (
        <ArrowUpRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
      )}
    </Link>
  );
}