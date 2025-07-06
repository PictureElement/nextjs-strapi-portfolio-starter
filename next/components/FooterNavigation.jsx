'use client';

import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { pageAnimation } from '@/lib/utils';

export default function FooterNavigation() {
  const router = useTransitionRouter();

  return (
    <div className="mt-[6px] md:mt-0 col-span-1">
      <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">Navigation</h3>
      <ul className="mt-4 space-y-4">
        <li className="text-center md:text-start">
          <Link
            className="block md:inline text-base text-white/75 hover:underline" href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/', {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Home
          </Link>
        </li>
        <li className="text-center md:text-start">
          <Link
            className="block md:inline text-base text-white/75 hover:underline" href="/projects/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/projects/', {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Projects
          </Link>
        </li>
        <li className="text-center md:text-start">
          <Link
            className="block md:inline text-base text-white/75 hover:underline" href="/blog/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/blog/', {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Blog
          </Link>
        </li>
        <li className="text-center md:text-start">
          <Link
            className="block md:inline text-base text-white/75 hover:underline" href="/contact/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/contact/', {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
