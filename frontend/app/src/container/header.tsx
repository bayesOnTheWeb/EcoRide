"use client";

import Image from "next/image";
import RedirectButton from "../ui/redirectButton";
import { redirect } from "next/navigation";

export default function Header() {
  function handleClick() {
    redirect("/");
  }

  return (
    <>
      <div className="flex sm:flex-row sm:justify-between sm:px-20 flex-col py-15 justify-center items-center">
        <div>
          <Image
            onClick={handleClick}
            src={"ecoride.svg"}
            alt={"logo du site web"}
            height={200}
            width={200}
          />
        </div>
        <div className="flex p-4 justify-center gap-5">
          <RedirectButton
            label={"à propos"}
            redirectTo={"/about"}
            isPrimary={false}
          />
          <RedirectButton
            label={"nous contacter"}
            redirectTo={"/contact"}
            isPrimary={false}
          />
        </div>
      </div>
    </>
  );
}
