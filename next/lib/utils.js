import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utility function for formatting dates
export const formatDate = (date, localeString = 'en-US') => {
  return new Intl.DateTimeFormat(localeString, {
    dateStyle: 'short',
  }).format(new Date(date));
};

// Custom encoding function
export const customEncode = (str) => btoa([...str].reverse().join(''));

// Custom decoding function
export const customDecode = (encoded) => [...atob(encoded)].reverse().join('');