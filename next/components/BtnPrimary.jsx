import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function BtnPrimary({
  label = 'Default label',
  url = '#',
  target = undefined,
  rel = undefined,
  className = '',
  ...rest
}) {
  console.log("Hello from BtnPrimary");
  return (
    <Link
      target={target}
      rel={rel}
      href={url}
      className={`
        group
        inline-flex
        justify-center
        items-center
        transition
        px-4
        h-11
        font-medium
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
      {rel === undefined ? (
        <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
      ) : (
        <ArrowUpRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
      )}
    </Link>
  );
}