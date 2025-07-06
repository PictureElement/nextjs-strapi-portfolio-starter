'use client';

import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { pageAnimation } from '@/lib/utils';

export default function FooterCopyright({ copyright }) {
  const router = useTransitionRouter();

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <Link
        className="text-white/75 text-base transition hover:underline md:order-2 text-center mb-4 md:mb-0"
        href="/privacy-policy/"
        onClick={(e) => {
          e.preventDefault();
          router.push('/privacy-policy/', {
            onTransitionReady: pageAnimation,
          });
        }}
      >
        Privacy policy
      </Link>
      <p className="text-white/75 text-base md:order-1 text-center">{copyright}</p>
    </div>
  )
}
