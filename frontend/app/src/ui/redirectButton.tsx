"use client";

import { redirect } from "next/navigation";

interface CallToActionProps {
  label: string;
  redirectTo: string;
  isPrimary: boolean;
}
export default function RedirectButton({
  label,
  redirectTo,
  isPrimary,
}: CallToActionProps) {
  function handleClick() {
    redirect(redirectTo);
  }

  const primaryColor = "text-background bg-primary rounded-full px-10 py-1";
  const secondColor = "text-text hover:border-b-2 border-text";
  const colorClass = isPrimary ? primaryColor : secondColor;

  return (
    <>
      <button className={colorClass} onClick={handleClick}>
        {label}
      </button>
    </>
  );
}
