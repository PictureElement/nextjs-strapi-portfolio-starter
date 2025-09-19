import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function BtnSecondary({
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
      {renderIcon()}
    </Link>
  );
}
