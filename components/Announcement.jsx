import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Announcement() {
  return (
    <aside className="bg-black">
      <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white pl-[56px] pr-4 py-2">
        <p className="text-sm text-center leading-tight">Love Alpine JS? <a href="#" className="inline-block underline">Check out this new course!</a></p>
        <button
          aria-label="Dismiss"
          className="
            p-1
            rounded-full
            bg-white/20
            transition
            hover:bg-white/25 active:bg-white/30
          "
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </aside>
  );
}
