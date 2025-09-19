import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function BtnPrimary({
  label = 'Default label',
  url = '#',
  target = undefined,
  rel = undefined,
  className = '',
  showIcon = false,
  iconType = 'arrowRight',
  ...rest
}) {
  // Helper function to render the appropriate icon
  const renderIcon = () => {
    if (!showIcon) return null; // If showIcon is false, return nothing

    switch (iconType) {
      case 'arrowUpRight':
        return (
          <ArrowUpRightIcon className="h-[1em] w-[1em] ms-1 group-hover:translate-x-0.5 transition" />
        );
      case 'arrowRight':
      default:
        return (
          <ArrowRightIcon className="h-[1em] w-[1em] ms-1 group-hover:translate-x-0.5 transition" />
        );
    }
  };

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
      {renderIcon()}
    </Link>
  );
}
