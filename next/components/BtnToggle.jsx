import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid';

export default function BtnToggle({
  isOpen,
  onToggle,
  openLabel = 'Hide description',
  closedLabel = 'Show description',
  className = '',
  ...rest
}) {
  return (
    <button
      onClick={onToggle}
      className={`
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
      aria-expanded={isOpen}
      {...rest}
    >
      <span className="flex items-center">
        {isOpen ? openLabel : closedLabel}
        {isOpen ? (
          <ArrowUpIcon className="h-[1em] w-[1em] ms-1" />
        ) : (
          <ArrowDownIcon className="h-[1em] w-[1em] ms-1" />
        )}
      </span>
    </button >
  );
}