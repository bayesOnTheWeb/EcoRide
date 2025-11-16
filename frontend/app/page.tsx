import Header from "./src/container/header";
import Image from "next/image";
import RedirectButton from "./src/ui/redirectButton";
import Footer from "./src/container/footer";

export default function Page() {
  return (
    <>
      <Header />
      <section className="flex flex-col gap-8 pb-40">
        <div className="flex justify-center">
          <h2 className="font-header text-primary text-3xl">PRENEZ SOINS</h2>
        </div>
        <div className="flex justify-center">
          <h2 className="font-header text-primary text-2xl">
            de notre planète
          </h2>
        </div>
        <div className="flex justify-center">
          <h2 className="font-header text-primary text-3xl">avec</h2>
        </div>
        <div className="flex justify-center">
          <Image
            src={"ecoride.svg"}
            alt={"logo d'Ecoride"}
            width={150}
            height={150}
          />
        </div>
      </section>
      <section className="flex flex-col sm:px-100 sm:py-0 justify-center gap-6 py-15 px-20">
        <RedirectButton
          label={"s\'inscrie"}
          redirectTo={"/register"}
          isPrimary={true}
        />
        <RedirectButton
          label={"se connecter"}
          redirectTo={"/connect"}
          isPrimary={false}
        />
      </section>
      <Footer />
    </>
  );
}
