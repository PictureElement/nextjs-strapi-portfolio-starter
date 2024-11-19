import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function Header() {
  console.log("Hello from Header");
  return (
    <header id="header" className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15">
      <div className="flex h-[72px] items-center gap-8 px-4">
        <a className="block text-primary-700" href="#">
          <span className="sr-only">Home</span>
          <Image src={`/msof-logo.svg`} alt="..." width="44" height="44" />
        </a>

        <div className="flex flex-1 items-center justify-end sm:justify-between">

          <nav aria-label="Global" className="hidden sm:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href="/" className="text-gray-900 transition hover:text-gray-900/75">
                  Work
                </Link>
              </li>

              <li>
                <Link href="/" className="text-gray-900 transition hover:text-gray-900/75">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/" className="text-gray-900 transition hover:text-gray-900/75">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <BtnPrimary label="Book a call" />
            <button
              className="
                block
                justify-items-center
                w-11 h-11
                rounded-full
                transition
                border border-primary-100
              text-primary-700
              bg-primary-50
              hover:bg-primary-100
              active:bg-primary-200
                sm:hidden
              "
            >
              <span className="sr-only">Toggle menu</span>
              <Bars3Icon className="size-5" />
            </button>
          </div>

        </div>

      </div>
    </header>
  )
}
