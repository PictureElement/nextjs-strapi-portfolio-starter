'use client';

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";

const ContactLink = ({
  type, // "email" or "telephone"
  className,
  showIcon = true,
  ...props // Additional props (e.g., rel, target)
}) => {
  // Decode environment variables
  const email = process.env.NEXT_PUBLIC_EMAIL_ENCODED
    ? atob(process.env.NEXT_PUBLIC_EMAIL_ENCODED).trim() // Clean email for mailto:
    : null;

  const formattedTelephone = process.env.NEXT_PUBLIC_TELEPHONE_ENCODED
    ? atob(process.env.NEXT_PUBLIC_TELEPHONE_ENCODED).trim() // Human-readable phone number
    : null;

  const telephone = formattedTelephone
    ? formattedTelephone.replace(/[^\d+]/g, "") // Clean phone number for tel:
    : null;

  // Determine href and label based on type
  let href, label;

  if (type === "email") {
    href = email ? `mailto:${email}` : "#";
    label = email || "Email not available";
  } else if (type === "telephone") {
    href = telephone ? `tel:${telephone}` : "#";
    label = formattedTelephone || "Phone not available";
  } else {
    console.error(`Invalid type "${type}" passed to ContactLink.`);
    return null; // Render nothing if type is invalid
  }

  // Determine which icon to render
  const Icon =
    showIcon && type === "email"
      ? EnvelopeIcon
      : showIcon && type === "telephone"
        ? PhoneIcon
        : null;

  return (
    <a className={className} href={href} {...props}>
      {Icon && <Icon className="h-[1.2em] w-[1.2em] shrink-0" />} {/* Render Icon if showIcon is true */}
      <span>{label}</span>
    </a>
  );
};

export default ContactLink;
