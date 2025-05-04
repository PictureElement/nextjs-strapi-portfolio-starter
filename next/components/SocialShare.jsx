'use client';

import { usePathname } from 'next/navigation';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';

const socialIcons = {
  Envelope: (<svg className="size-8 fill-primary-700 hover:fill-primary-600 active:fill-primary-500 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM218 271.7L64.2 172.4C66 156.4 79.5 144 96 144l256 0c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4 384 336c0 17.7-14.3 32-32 32L96 368c-17.7 0-32-14.3-32-32l0-125.6 136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z" /></svg>),
  Facebook: (<svg className="size-8 fill-primary-700 hover:fill-primary-600 active:fill-primary-500 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" /></svg>),
  LinkedIn: (<svg className="size-8 fill-primary-700 hover:fill-primary-600 active:fill-primary-500 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>),
  X: (<svg className="size-8 fill-primary-700 hover:fill-primary-600 active:fill-primary-500 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" /></svg>),
};

export default function SocialShare() {
  const pathname = usePathname();
  const fullUrl = new URL(pathname, process.env.NEXT_PUBLIC_WEBSITE).href;

  return (
    <dl className="flex flex-col gap-2 not-prose">
      <dt className="text-gray-900 font-medium">Share this page</dt>
      <dd className="flex flex-wrap gap-3">
        <TwitterShareButton url={fullUrl} aria-label="Share on X">
          {socialIcons["X"] || (
            <span className="text-red-500">Icon not found</span>
          )}
        </TwitterShareButton>
        <LinkedinShareButton url={fullUrl} aria-label="Share on LinkedIn">
          {socialIcons["LinkedIn"] || (
            <span className="text-red-500">Icon not found</span>
          )}
        </LinkedinShareButton>
        <FacebookShareButton url={fullUrl} aria-label="Share on Facebook">
          {socialIcons["Facebook"] || (
            <span className="text-red-500">Icon not found</span>
          )}
        </FacebookShareButton>
        <EmailShareButton url={fullUrl} aria-label="Share via Email">
          {socialIcons["Envelope"] || (
            <span className="text-red-500">Icon not found</span>
          )}
        </EmailShareButton>
      </dd>
    </dl>
  )
}
