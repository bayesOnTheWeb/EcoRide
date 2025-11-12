import RedirectButton from "../ui/redirectButton";

export default function Footer(){
    return(
        <>
        <div className="flex flex-col sm:flex-row sm:gap-16 sm:pr-20 sm:pt-20 p-8 justify-center">
            <RedirectButton label={"conditions générales d'utilisations"} redirectTo={"/cgu"} isPrimary={false} />
            <RedirectButton label={"me contacter"} redirectTo={"/about"} isPrimary={false} />
        </div>
        </>
    );
}